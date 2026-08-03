import { useState, useEffect, useCallback } from 'react';
import { saveCloudScore } from '../services/scoreService';
import { supabase } from '../lib/supabase';

export function useHighScore(gameId: string, isHigherBetter: boolean = true) {
  const [highScore, setHighScore] = useState<number | null>(() => {
    const saved = localStorage.getItem(`hb-score-${gameId}`);
    return saved ? Number(saved) : null;
  });

  // Listen for sync events (when cloud scores are merged or migrated)
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem(`hb-score-${gameId}`);
      setHighScore(saved ? Number(saved) : null);
    };

    window.addEventListener('hb-scores-synced', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('hb-scores-synced', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [gameId]);

  const saveScore = useCallback((newScore: number) => {
    setHighScore((prev) => {
      let isNewHigh = false;
      if (prev === null) {
        isNewHigh = true;
      } else if (isHigherBetter) {
        isNewHigh = newScore > prev;
      } else {
        isNewHigh = newScore < prev;
      }

      if (isNewHigh) {
        localStorage.setItem(`hb-score-${gameId}`, newScore.toString());
        localStorage.setItem(`hb-score-ts-${gameId}`, Date.now().toString());

        // Asynchronously save to cloud if logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user?.id) {
            saveCloudScore(session.user.id, gameId, newScore);
          }
        }).catch((err) => {
          console.warn('Could not check session for cloud score save:', err);
        });

        return newScore;
      }
      return prev;
    });
  }, [gameId, isHigherBetter]);

  return { highScore, saveScore };
}

export function getHighScore(gameId: string): number | null {
  const saved = localStorage.getItem(`hb-score-${gameId}`);
  return saved ? Number(saved) : null;
}

