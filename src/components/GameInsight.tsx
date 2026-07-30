import { Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './GameInsight.module.css';

interface GameInsightProps {
  score: number;
  average: number;
  isHigherBetter: boolean;
  fact: string;
  formatScore?: (score: number) => string;
}

export default function GameInsight({ score, average, isHigherBetter, fact, formatScore = (s) => s.toString() }: GameInsightProps) {
  // Calculate percentile/tier roughly based on standard deviation assumptions.
  // For simplicity, we just use arbitrary ranges around the average.
  
  let tier = 'Average';
  let percentileText = '';
  let colorClass = styles.average;
  let Icon = Minus;

  const ratio = isHigherBetter ? score / average : average / score;

  if (ratio >= 1.5) {
    tier = 'Elite';
    percentileText = 'Top 5%';
    colorClass = styles.elite;
    Icon = TrendingUp;
  } else if (ratio >= 1.2) {
    tier = 'Excellent';
    percentileText = 'Top 20%';
    colorClass = styles.good;
    Icon = TrendingUp;
  } else if (ratio >= 0.8) {
    tier = 'Average';
    percentileText = 'Top 50%';
    colorClass = styles.average;
    Icon = Minus;
  } else if (ratio >= 0.5) {
    tier = 'Below Average';
    percentileText = 'Bottom 30%';
    colorClass = styles.poor;
    Icon = TrendingDown;
  } else {
    tier = 'Beginner';
    percentileText = 'Keep practicing!';
    colorClass = styles.poor;
    Icon = TrendingDown;
  }

  // Calculate position on the bar (0% to 100%)
  // Let's say 50% is average. Max we plot is 2x average (100%), min is 0.
  let barPercentage = 50;
  if (isHigherBetter) {
    barPercentage = Math.min(Math.max((score / (average * 2)) * 100, 0), 100);
  } else {
    // If lower is better, a score of average = 50%.
    // score of 0 = 100%. score of average*2 = 0%.
    const diff = (average - score) / average; // e.g. avg 273, score 180 -> diff = (93)/273 = 0.34
    barPercentage = Math.min(Math.max(50 + (diff * 50), 0), 100);
  }

  return (
    <div className={styles.container}>
      <div className={styles.statsCard}>
        <div className={styles.header}>
          <div className={`${styles.tierBadge} ${colorClass}`}>
            <Icon size={16} />
            <span>{tier}</span>
          </div>
          <span className={styles.percentile}>{percentileText}</span>
        </div>

        <div className={styles.gaugeContainer}>
          <div className={styles.gaugeLabels}>
            <span>Beginner</span>
            <span>Average ({formatScore(average)})</span>
            <span>Elite</span>
          </div>
          <div className={styles.gaugeBar}>
            <div 
              className={`${styles.gaugeFill} ${colorClass}`}
              style={{ width: `${barPercentage}%` }}
            />
            <div 
              className={styles.gaugeMarker}
              style={{ left: `${barPercentage}%` }}
            >
              <div className={styles.markerTooltip}>You</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.factCard}>
        <Lightbulb className={styles.factIcon} size={24} />
        <div className={styles.factContent}>
          <h4>Did you know?</h4>
          <p>{fact}</p>
        </div>
      </div>
    </div>
  );
}
