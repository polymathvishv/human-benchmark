/**
 * useBattleAutoSubmit.ts
 *
 * Manages the "battle mode" lifecycle:
 *   1. BattleRoomPage stores {roomCode, playerName, gameId} in sessionStorage
 *   2. The game runs normally
 *   3. When GameResult mounts, this hook auto-submits the score to the battle room
 *   4. Clears the context after submission so it doesn't fire again on retry
 */

import { useEffect, useRef, useState } from 'react';
import { submitBattleScore, fetchBattleRoom } from '../services/battleService';

export interface BattleContext {
  roomCode: string;
  playerName: string;
  gameId: string;
}

const STORAGE_KEY = 'hb_battle_context';

/** Call this from BattleRoomPage before navigating to the game */
export function setBattleContext(ctx: BattleContext) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // sessionStorage not available
  }
}

/** Read the current battle context without clearing it */
export function getBattleContext(): BattleContext | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BattleContext;
  } catch {
    return null;
  }
}

/** Clear the battle context (called after successful submit or on dismiss) */
export function clearBattleContext() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export type BattleSubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'wrong_game' | 'none';

/**
 * Hook used inside GameResult.
 * Pass the gameId and numeric score from the game's shareConfig.
 * Returns status + battleContext so the result screen can show a battle banner.
 */
export function useBattleAutoSubmit(gameId: string, numericScore: number | null) {
  const [status, setStatus] = useState<BattleSubmitStatus>('idle');
  const [context, setContext] = useState<BattleContext | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (numericScore === null) return;
    if (hasSubmitted.current) return;

    const ctx = getBattleContext();
    if (!ctx) {
      setStatus('none');
      return;
    }

    // Check if the battle room is for this game
    if (ctx.gameId !== gameId) {
      setStatus('wrong_game');
      return;
    }

    setContext(ctx);
    setRoomCode(ctx.roomCode);
    hasSubmitted.current = true;

    // Submit the score
    setStatus('submitting');

    (async () => {
      try {
        const room = await fetchBattleRoom(ctx.roomCode);
        if (!room) {
          setStatus('error');
          return;
        }

        const result = await submitBattleScore(room.id, ctx.playerName, numericScore, room);

        if (result.success) {
          setStatus('success');
          clearBattleContext(); // Only clear on success
        } else {
          const errMap: Record<string, BattleSubmitStatus> = {
            duplicate_name: 'success', // Already submitted — show room link anyway
            expired: 'error',
            full: 'error',
            error: 'error',
          };
          setStatus(errMap[result.reason] || 'error');
          if (result.reason === 'duplicate_name') {
            clearBattleContext();
          }
        }
      } catch {
        setStatus('error');
      }
    })();
  }, [gameId, numericScore]);

  return { status, context, roomCode };
}
