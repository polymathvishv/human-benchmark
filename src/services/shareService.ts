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

// Approximate error function for standard normal cumulative distribution
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

// Normal Cumulative Distribution Function (CDF)
function normalCDF(x: number, mean: number, stdDev: number): number {
  const z = (x - mean) / (stdDev * Math.SQRT2);
  return 0.5 * (1 + erf(z));
}

// Real Human Benchmark distribution benchmarks (mean & standard deviation)
const GAME_DISTRIBUTIONS: Record<string, { mean: number; stdDev: number; isLowerBetter?: boolean }> = {
  'reaction-time': { mean: 273, stdDev: 42, isLowerBetter: true },
  'aim-trainer': { mean: 410, stdDev: 75, isLowerBetter: true },
  'typing': { mean: 65, stdDev: 20, isLowerBetter: false },
  'mobile-typing': { mean: 38, stdDev: 12, isLowerBetter: false },
  'sequence-memory': { mean: 7.8, stdDev: 2.4, isLowerBetter: false },
  'number-memory': { mean: 9.0, stdDev: 2.1, isLowerBetter: false },
  'verbal-memory': { mean: 38, stdDev: 22, isLowerBetter: false },
  'chimp-test': { mean: 9.8, stdDev: 2.8, isLowerBetter: false },
  'visual-memory': { mean: 9.5, stdDev: 2.3, isLowerBetter: false },
};

/**
 * Generates an accurate percentile rank (1-99) based on standard normal distribution of scores.
 */
export const generateMockPercentile = (score: number, gameId: string, isLowerBetter: boolean = false): number => {
  const dist = GAME_DISTRIBUTIONS[gameId];
  if (!dist) return 50;

  const lowerBetter = dist.isLowerBetter ?? isLowerBetter;
  let cdf = normalCDF(score, dist.mean, dist.stdDev);

  // If lower is better (e.g. reaction time 180ms), lower score means higher performance percentile
  if (lowerBetter) {
    cdf = 1 - cdf;
  }

  const percentile = Math.round(cdf * 100);
  return Math.min(Math.max(percentile, 1), 99);
};

export interface ScoreCardItem {
  gameId: string;
  gameName: string;
  scoreFormatted: string;
  percentile: number;
}

export const getScoreCardShareUrl = () => `${BASE_URL}/dashboard`;

export const getScoreCardShareMessage = (items: ScoreCardItem[], overallPercentile: number): string => {
  const gameEmojis: Record<string, string> = {
    'reaction-time': '⚡',
    'sequence-memory': '🧠',
    'aim-trainer': '🎯',
    'number-memory': '🔢',
    'verbal-memory': '🗣️',
    'chimp-test': '🐵',
    'visual-memory': '👁️',
    'typing': '⌨️',
    'mobile-typing': '📱',
  };

  const lines = items.map(item => {
    const emoji = gameEmojis[item.gameId] || '📊';
    return `${emoji} ${item.gameName}: ${item.scoreFormatted} (Top ${100 - item.percentile}%)`;
  });

  const overallText = overallPercentile > 0 ? `🏆 Overall Rating: Top ${100 - overallPercentile}%\n` : '';

  return `🧠 My Human Benchmark Scorecard:\n\n${lines.join('\n')}\n\n${overallText}\nCan you beat my brain score?\n${getScoreCardShareUrl()}`;
};

export const getBattleShareUrl = (roomCode: string) => `${BASE_URL}/battle/${roomCode}`;

export interface BattleShareData {
  roomCode: string;
  gameName: string;
  hostName: string;
  scores: Array<{
    playerName: string;
    scoreFormatted: string;
  }>;
}

export const getBattleShareMessage = (data: BattleShareData): string => {
  const { roomCode, gameName, hostName, scores } = data;
  const url = getBattleShareUrl(roomCode);

  let leaderboardText = '';
  if (scores.length > 0) {
    const medals = ['🥇', '🥈', '🥉'];
    const rows = scores.map((s, idx) => {
      const prefix = idx < 3 ? medals[idx] : `#${idx + 1}`;
      return `${prefix} ${s.playerName}: ${s.scoreFormatted}`;
    });
    leaderboardText = `\n\n🏆 Live Leaderboard:\n${rows.join('\n')}`;
  } else {
    leaderboardText = `\n\nNo scores on the board yet — be the first to play!`;
  }

  return `⚔️ ${gameName} Battle!\nRoom: ${roomCode} (Hosted by ${hostName})${leaderboardText}\n\n🎮 Can you top the leaderboard? Join the battle:\n${url}`;
};
