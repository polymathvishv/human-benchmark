import { supabase } from '../lib/supabase';

export interface GameScoreConfig {
  id: string;
  isLowerBetter: boolean;
}

export const GAME_SCORE_CONFIGS: Record<string, GameScoreConfig> = {
  'reaction-time': { id: 'reaction-time', isLowerBetter: true },
  'aim-trainer': { id: 'aim-trainer', isLowerBetter: true },
  'sequence-memory': { id: 'sequence-memory', isLowerBetter: false },
  'number-memory': { id: 'number-memory', isLowerBetter: false },
  'verbal-memory': { id: 'verbal-memory', isLowerBetter: false },
  'chimp-test': { id: 'chimp-test', isLowerBetter: false },
  'visual-memory': { id: 'visual-memory', isLowerBetter: false },
  'typing': { id: 'typing', isLowerBetter: false },
  'mobile-typing': { id: 'mobile-typing', isLowerBetter: false },
};

export interface CloudHighScore {
  score: number;
  timestamp: number;
}

/**
 * Save a new score attempt to Supabase cloud
 */
export async function saveCloudScore(userId: string, gameId: string, score: number): Promise<boolean> {
  if (!userId || !gameId || typeof score !== 'number' || isNaN(score)) return false;

  try {
    const { error } = await supabase.from('scores').insert({
      user_id: userId,
      game_id: gameId,
      score: score,
    });

    if (error) {
      console.warn('Could not save score to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saving score to Supabase:', err);
    return false;
  }
}

/**
 * Fetch all high scores for a user from Supabase
 */
export async function fetchCloudHighScores(userId: string): Promise<Record<string, CloudHighScore>> {
  if (!userId) return {};

  try {
    const { data, error } = await supabase
      .from('scores')
      .select('game_id, score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching cloud scores:', error.message);
      return {};
    }

    if (!data || data.length === 0) return {};

    const highScores: Record<string, CloudHighScore> = {};

    data.forEach((row: { game_id: string; score: number | string; created_at: string }) => {
      const gId = row.game_id;
      const numScore = Number(row.score);
      const ts = new Date(row.created_at).getTime();
      const config = GAME_SCORE_CONFIGS[gId];
      const isLowerBetter = config ? config.isLowerBetter : false;

      if (isNaN(numScore)) return;

      if (!highScores[gId]) {
        highScores[gId] = { score: numScore, timestamp: ts };
      } else {
        const currentBest = highScores[gId].score;
        const isBetter = isLowerBetter ? numScore < currentBest : numScore > currentBest;
        if (isBetter) {
          highScores[gId] = { score: numScore, timestamp: ts };
        }
      }
    });

    return highScores;
  } catch (err) {
    console.error('Error in fetchCloudHighScores:', err);
    return {};
  }
}

/**
 * Two-way smart sync & guest score migration between localStorage and Supabase
 */
export async function syncLocalAndCloudScores(userId: string): Promise<{
  success: boolean;
  uploadedCount: number;
  downloadedCount: number;
  lastSyncTime: number;
}> {
  if (!userId) {
    return { success: false, uploadedCount: 0, downloadedCount: 0, lastSyncTime: 0 };
  }

  let uploadedCount = 0;
  let downloadedCount = 0;

  try {
    const cloudHighScores = await fetchCloudHighScores(userId);
    const scoresToUpload: { user_id: string; game_id: string; score: number }[] = [];

    // Loop through all game configs
    for (const [gameId, config] of Object.entries(GAME_SCORE_CONFIGS)) {
      const localScoreStr = localStorage.getItem(`hb-score-${gameId}`);

      const hasLocal = localScoreStr !== null && !isNaN(Number(localScoreStr));
      const localScore = hasLocal ? Number(localScoreStr) : null;
      const cloudEntry = cloudHighScores[gameId];

      if (hasLocal && localScore !== null) {
        if (!cloudEntry) {
          // Cloud has no score for this game -> Upload local guest score
          scoresToUpload.push({
            user_id: userId,
            game_id: gameId,
            score: localScore,
          });
          uploadedCount++;
        } else {
          // Both have scores -> compare
          const isLocalBetter = config.isLowerBetter
            ? localScore < cloudEntry.score
            : localScore > cloudEntry.score;

          if (isLocalBetter) {
            scoresToUpload.push({
              user_id: userId,
              game_id: gameId,
              score: localScore,
            });
            uploadedCount++;
          } else if (localScore !== cloudEntry.score) {
            // Cloud score is better -> update localStorage
            localStorage.setItem(`hb-score-${gameId}`, cloudEntry.score.toString());
            localStorage.setItem(`hb-score-ts-${gameId}`, cloudEntry.timestamp.toString());
            downloadedCount++;
          }
        }
      } else if (cloudEntry) {
        // Local has no score, but cloud has it -> download to local
        localStorage.setItem(`hb-score-${gameId}`, cloudEntry.score.toString());
        localStorage.setItem(`hb-score-ts-${gameId}`, cloudEntry.timestamp.toString());
        downloadedCount++;
      }
    }

    // Batch insert any new/better local scores to cloud
    if (scoresToUpload.length > 0) {
      const { error: insertError } = await supabase.from('scores').insert(scoresToUpload);
      if (insertError) {
        console.warn('Failed to upload some migrated scores:', insertError.message);
      }
    }

    const now = Date.now();
    localStorage.setItem('hb-last-sync-ts', now.toString());

    // Dispatch global event so all components update seamlessly
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hb-scores-synced', {
        detail: { uploadedCount, downloadedCount, timestamp: now }
      }));
    }

    return {
      success: true,
      uploadedCount,
      downloadedCount,
      lastSyncTime: now,
    };
  } catch (err) {
    console.error('Error during score synchronization:', err);
    return {
      success: false,
      uploadedCount,
      downloadedCount,
      lastSyncTime: Date.now(),
    };
  }
}
