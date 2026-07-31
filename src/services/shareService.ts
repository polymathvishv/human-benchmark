import type { ShareConfig } from '../types/share';

const BASE_URL = 'https://humanbenchmark.in';

export const getShareUrl = (gameId: string) => `${BASE_URL}/${gameId}`;

export const getShareMessage = (config: ShareConfig): string => {
  const { gameId, gameName, score, unit, percentile } = config;
  const url = getShareUrl(gameId);
  const rankText = percentile ? `Top ${100 - percentile}% of players.` : '';

  switch (gameId) {
    case 'reaction-time':
      return `⚡ I scored ${score}${unit} in the ${gameName} Test! ${rankText}\nCan you beat me?\n${url}`;
    
    case 'sequence-memory':
    case 'chimp-test':
    case 'visual-memory':
      return `🧠 I reached Level ${score} in ${gameName}! ${rankText}\nThink you have a better memory?\n${url}`;
    
    case 'number-memory':
      return `🔢 I remembered ${score} digits in ${gameName}! ${rankText}\nHow many can you remember?\n${url}`;
      
    case 'verbal-memory':
      return `🗣️ I scored ${score} ${unit} in ${gameName}! ${rankText}\nTest your vocabulary memory:\n${url}`;
      
    case 'typing':
    case 'mobile-typing':
      return `⌨️ I type at ${score} ${unit} in the ${gameName}! ${rankText}\nAre your fingers faster?\n${url}`;
      
    case 'aim-trainer':
      return `🎯 I averaged ${score}${unit} per target in ${gameName}! ${rankText}\nTest your aim:\n${url}`;

    default:
      return `🏆 I scored ${score}${unit ? ` ${unit}` : ''} in ${gameName}! ${rankText}\nPlay now on Human Benchmark:\n${url}`;
  }
};

// Mock function to generate percentiles based on local storage scores until backend is ready.
// In reality, this would query a database.
export const generateMockPercentile = (score: number, gameId: string, isLowerBetter: boolean = false): number => {
  // Simple heuristic just to show the UI feature
  let baseline = 100;
  let variance = 50;

  switch (gameId) {
    case 'reaction-time': baseline = 270; variance = 100; break;
    case 'aim-trainer': baseline = 400; variance = 150; break;
    case 'typing': baseline = 50; variance = 40; break;
    case 'mobile-typing': baseline = 40; variance = 30; break;
    case 'sequence-memory': baseline = 9; variance = 5; break;
    case 'number-memory': baseline = 9; variance = 5; break;
    case 'verbal-memory': baseline = 40; variance = 30; break;
    case 'chimp-test': baseline = 10; variance = 5; break;
    case 'visual-memory': baseline = 9; variance = 4; break;
  }

  let zScore = 0;
  if (isLowerBetter) {
    zScore = (baseline - score) / variance;
  } else {
    zScore = (score - baseline) / variance;
  }

  // Convert z-score to rough percentile (clamped 1-99)
  let p = Math.round(50 + (zScore * 34));
  return Math.min(Math.max(p, 1), 99);
};
