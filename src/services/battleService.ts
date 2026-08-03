import { supabase } from '../lib/supabase';

export interface BattleRoom {
  id: string;
  roomCode: string;
  hostName: string;
  gameId: string;
  gameName: string;
  maxPlayers: number;
  createdAt: string;
  expiresAt: string;
}

export interface BattleScore {
  id: number;
  roomId: string;
  playerName: string;
  score: number;
  createdAt: string;
}

export interface BattleRoomWithScores extends BattleRoom {
  scores: BattleScore[];
  isExpired: boolean;
  isFull: boolean;
  playerCount: number;
}

/**
 * Generate a unique 8-character alphanumeric room code
 */
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omit ambiguous chars (0,O,I,1)
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a new battle room
 */
export async function createBattleRoom(
  hostName: string,
  gameId: string,
  gameName: string
): Promise<{ roomCode: string; roomId: string } | null> {
  try {
    // Generate unique room code (retry if collision)
    let roomCode = generateRoomCode();
    let attempts = 0;

    while (attempts < 5) {
      const { data: existing } = await supabase
        .from('battle_rooms')
        .select('id')
        .eq('room_code', roomCode)
        .single();

      if (!existing) break; // No collision, use this code
      roomCode = generateRoomCode();
      attempts++;
    }

    const { data, error } = await supabase
      .from('battle_rooms')
      .insert({
        room_code: roomCode,
        host_name: hostName.trim() || 'Host',
        game_id: gameId,
        game_name: gameName,
        max_players: 10,
      })
      .select('id, room_code')
      .single();

    if (error) {
      console.error('Error creating battle room:', error);
      return null;
    }

    return { roomCode: data.room_code, roomId: data.id };
  } catch (err) {
    console.error('Error in createBattleRoom:', err);
    return null;
  }
}

/**
 * Fetch a battle room and all its scores by room code
 */
export async function fetchBattleRoom(roomCode: string): Promise<BattleRoomWithScores | null> {
  try {
    const { data: room, error: roomError } = await supabase
      .from('battle_rooms')
      .select('*')
      .eq('room_code', roomCode.toUpperCase())
      .single();

    if (roomError || !room) {
      console.error('Room not found:', roomError);
      return null;
    }

    const { data: scores, error: scoresError } = await supabase
      .from('battle_scores')
      .select('*')
      .eq('room_id', room.id)
      .order('score', { ascending: false });

    if (scoresError) {
      console.error('Error fetching battle scores:', scoresError);
    }

    const mappedRoom: BattleRoom = {
      id: room.id,
      roomCode: room.room_code,
      hostName: room.host_name,
      gameId: room.game_id,
      gameName: room.game_name,
      maxPlayers: room.max_players,
      createdAt: room.created_at,
      expiresAt: room.expires_at,
    };

    const mappedScores: BattleScore[] = (scores || []).map(s => ({
      id: s.id,
      roomId: s.room_id,
      playerName: s.player_name,
      score: s.score,
      createdAt: s.created_at,
    }));

    // Sort by score: for time-based tests (lower is better), sort ascending
    const isLowerBetter = ['reaction-time', 'aim-trainer'].includes(room.game_id);
    const sortedScores = [...mappedScores].sort((a, b) =>
      isLowerBetter ? a.score - b.score : b.score - a.score
    );

    const now = new Date();
    const isExpired = new Date(room.expires_at) < now;
    const playerCount = sortedScores.length;
    const isFull = playerCount >= room.max_players;

    return {
      ...mappedRoom,
      scores: sortedScores,
      isExpired,
      isFull,
      playerCount,
    };
  } catch (err) {
    console.error('Error in fetchBattleRoom:', err);
    return null;
  }
}

export type SubmitResult =
  | { success: true }
  | { success: false; reason: 'expired' | 'full' | 'duplicate_name' | 'error' };

/**
 * Submit a score to a battle room
 */
export async function submitBattleScore(
  roomId: string,
  playerName: string,
  score: number,
  currentRoom: BattleRoomWithScores
): Promise<SubmitResult> {
  try {
    // Guard checks using already-loaded room data
    if (currentRoom.isExpired) return { success: false, reason: 'expired' };
    if (currentRoom.isFull) return { success: false, reason: 'full' };

    const nameExists = currentRoom.scores.some(
      s => s.playerName.toLowerCase() === playerName.trim().toLowerCase()
    );
    if (nameExists) return { success: false, reason: 'duplicate_name' };

    const { error } = await supabase
      .from('battle_scores')
      .insert({
        room_id: roomId,
        player_name: playerName.trim(),
        score,
      });

    if (error) {
      // Unique constraint violation = duplicate name
      if (error.code === '23505') return { success: false, reason: 'duplicate_name' };
      console.error('Error submitting battle score:', error);
      return { success: false, reason: 'error' };
    }

    return { success: true };
  } catch (err) {
    console.error('Error in submitBattleScore:', err);
    return { success: false, reason: 'error' };
  }
}

/**
 * Subscribe to real-time score updates for a battle room
 */
export function subscribeToBattleRoom(roomId: string, onUpdate: () => void): () => void {
  const channel = supabase
    .channel(`battle-room-${roomId}-${Date.now()}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'battle_scores',
        filter: `room_id=eq.${roomId}`,
      },
      () => onUpdate()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Format a score based on the game type
 */
export function formatBattleScore(gameId: string, score: number): string {
  switch (gameId) {
    case 'reaction-time':
    case 'aim-trainer':
      return `${Math.round(score)} ms`;
    case 'typing':
    case 'mobile-typing':
      return `${Math.round(score)} WPM`;
    case 'verbal-memory':
      return `${Math.round(score)} words`;
    case 'number-memory':
    case 'sequence-memory':
    case 'visual-memory':
    case 'chimp-test':
      return `Level ${Math.round(score)}`;
    default:
      return `${score}`;
  }
}

/**
 * Is a lower score better for this game?
 */
export function isLowerBetter(gameId: string): boolean {
  return ['reaction-time', 'aim-trainer'].includes(gameId);
}

/**
 * Get time remaining string for a room
 */
export function getRoomTimeRemaining(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
}
