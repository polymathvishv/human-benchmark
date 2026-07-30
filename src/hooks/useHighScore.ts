import { useState } from 'react';

export function useHighScore(gameId: string, isHigherBetter: boolean = true) {
  const [highScore, setHighScore] = useState<number | null>(() => {
    const saved = localStorage.getItem(`hb-score-${gameId}`);
    return saved ? Number(saved) : null;
  });

  const saveScore = (newScore: number) => {
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
        return newScore;
      }
      return prev;
    });
  };

  return { highScore, saveScore };
}

export function getHighScore(gameId: string): number | null {
  const saved = localStorage.getItem(`hb-score-${gameId}`);
  return saved ? Number(saved) : null;
}
