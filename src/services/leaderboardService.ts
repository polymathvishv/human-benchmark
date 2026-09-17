import { supabase } from '../lib/supabase';
import { GAME_SCORE_CONFIGS } from './scoreService';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarColor: string;
  countryCode: string | null;
  score: number;
  scoreFormatted: string;
  createdAt: string;
  isCurrentUser?: boolean;
}

export interface UserRankStats {
  rank: number;
  totalPlayers: number;
  bestScore: number;
  scoreFormatted: string;
  percentile: number;
}

export type TimeframeFilter = 'all' | 'month' | 'week';

/**
 * Format score with game-specific unit
 */
export function formatGameScore(gameId: string, score: number): string {
  switch (gameId) {
    case 'reaction-time':
    case 'aim-trainer':
      return `${Math.round(score)} ms`;
    case 'typing':
    case 'mobile-typing':
      return `${Math.round(score)} WPM`;
    case 'verbal-memory':
      return `${Math.round(score)} words`;
    case 'sequence-memory':
    case 'number-memory':
    case 'chimp-test':
    case 'visual-memory':
      return `Level ${Math.round(score)}`;
    default:
      return `${score}`;
  }
}

/**
 * Fetch leaderboard entries with user deduplication (one best score per player)
 */
export async function fetchLeaderboard(
  gameId: string,
  timeframe: TimeframeFilter = 'all',
  limit: number = 50,
  currentUserId?: string | null
): Promise<LeaderboardEntry[]> {
  try {
    const config = GAME_SCORE_CONFIGS[gameId] || { id: gameId, isLowerBetter: false };
    const isLowerBetter = config.isLowerBetter;

    const selectWithCountry = `
      id,
      user_id,
      game_id,
      score,
      created_at,
      profiles (
        username,
        avatar_color,
        country_code
      )
    `;

    const selectWithoutCountry = `
      id,
      user_id,
      game_id,
      score,
      created_at,
      profiles (
        username,
        avatar_color
      )
    `;

    // 1. Try to fetch with country_code first
    let query = supabase
      .from('scores')
      .select(selectWithCountry)
      .eq('game_id', gameId);

    // Apply timeframe filter
    if (timeframe === 'week') {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', oneWeekAgo);
    } else if (timeframe === 'month') {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      query = query.gte('created_at', oneMonthAgo);
    }

    // Order by score according to metric
    query = query.order('score', { ascending: isLowerBetter }).limit(limit * 3);

    let { data: scoresData, error } = await query;

    // 2. If country_code column is missing (error 42703), retry without it
    if (error && error.code === '42703') {
      console.warn('Leaderboard fallback: country_code column missing, retrying without it.');
      query = supabase
        .from('scores')
        .select(selectWithoutCountry)
        .eq('game_id', gameId);

      if (timeframe === 'week') {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', oneWeekAgo);
      } else if (timeframe === 'month') {
        const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('created_at', oneMonthAgo);
      }

      query = query.order('score', { ascending: isLowerBetter }).limit(limit * 3);

      const retryResult = await query;
      scoresData = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    const data = scoresData;

    if (!data || data.length === 0) return [];

    // Deduplicate: Keep each user's best score
    const userBestMap = new Map<string, any>();

    for (const row of data) {
      const uId = row.user_id;
      const numScore = Number(row.score);
      if (isNaN(numScore)) continue;

      if (!userBestMap.has(uId)) {
        userBestMap.set(uId, row);
      } else {
        const existing = userBestMap.get(uId);
        const isBetter = isLowerBetter
          ? numScore < Number(existing.score)
          : numScore > Number(existing.score);

        if (isBetter) {
          userBestMap.set(uId, row);
        }
      }
    }

    // Sort deduplicated list
    const sortedDeduplicated = Array.from(userBestMap.values()).sort((a, b) => {
      const scoreA = Number(a.score);
      const scoreB = Number(b.score);
      return isLowerBetter ? scoreA - scoreB : scoreB - scoreA;
    });

    // Format final entries with ranks
    const entries: LeaderboardEntry[] = sortedDeduplicated.slice(0, limit).map((row, index) => {
      const profileData = row.profiles as { username?: string; avatar_color?: string; country_code?: string } | null;
      const username = profileData?.username || `User_${row.user_id.substring(0, 6)}`;
      const avatarColor = profileData?.avatar_color || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
      const countryCode = profileData?.country_code || null;
      const numScore = Number(row.score);

      return {
        rank: index + 1,
        userId: row.user_id,
        username,
        avatarColor,
        countryCode,
        score: numScore,
        scoreFormatted: formatGameScore(gameId, numScore),
        createdAt: row.created_at,
        isCurrentUser: currentUserId ? row.user_id === currentUserId : false,
      };
    });

    return entries;
  } catch (err) {
    console.error('Error in fetchLeaderboard:', err);
    return [];
  }
}

/**
 * Fetch a specific user's global rank & percentile for a given game
 */
export async function fetchUserRankStats(
  gameId: string,
  userId: string
): Promise<UserRankStats | null> {
  if (!userId || !gameId) return null;

  try {
    const allEntries = await fetchLeaderboard(gameId, 'all', 500, userId);
    if (!allEntries || allEntries.length === 0) return null;

    const userEntryIndex = allEntries.findIndex(e => e.userId === userId);
    if (userEntryIndex === -1) return null;

    const userEntry = allEntries[userEntryIndex];
    const totalPlayers = allEntries.length;
    const rank = userEntryIndex + 1;
    const percentile = Math.max(1, Math.min(99, Math.round(((totalPlayers - rank + 1) / totalPlayers) * 100)));

    return {
      rank,
      totalPlayers,
      bestScore: userEntry.score,
      scoreFormatted: userEntry.scoreFormatted,
      percentile,
    };
  } catch (err) {
    console.error('Error in fetchUserRankStats:', err);
    return null;
  }
}

/**
 * Real-time listener for score updates
 */
export function subscribeToLeaderboardUpdates(gameId: string, onUpdate: () => void) {
  const channel = supabase
    .channel(`leaderboard-${gameId}-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'scores',
        filter: `game_id=eq.${gameId}`,
      },
      () => {
        onUpdate();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
