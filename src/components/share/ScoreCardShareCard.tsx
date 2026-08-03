import type { LucideIcon } from 'lucide-react';
import styles from './ScoreCardShareCard.module.css';

export interface ScoreCardGameItem {
  gameId: string;
  gameName: string;
  icon: LucideIcon;
  color: string;
  scoreFormatted: string;
  percentile: number;
}

interface ScoreCardShareCardProps {
  items: ScoreCardGameItem[];
  totalGamesCount: number;
  overallPercentile: number;
  id?: string;
}

export default function ScoreCardShareCard({
  items,
  totalGamesCount,
  overallPercentile,
  id
}: ScoreCardShareCardProps) {
  return (
    <div id={id} className={styles.cardContainer}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.brandGroup}>
          <img src="/logo.png" alt="Human Benchmark" className={styles.brandLogo} />
          <span className={styles.brandTitle}>Human Benchmark</span>
        </div>
        <span className={styles.scorecardBadge}>Official Scorecard</span>
      </div>

      {/* Summary Highlights Banner */}
      <div className={styles.highlightsBanner}>
        <div className={styles.highlightTile}>
          <span className={styles.highlightLabel}>Tests Completed</span>
          <span className={styles.highlightValue}>
            {items.length} <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>/ {totalGamesCount}</span>
          </span>
        </div>
        <div className={styles.highlightTile}>
          <span className={styles.highlightLabel}>Overall Performance</span>
          <span className={`${styles.highlightValue} ${styles.highlightHighlight}`}>
            {overallPercentile > 0 ? `Top ${100 - overallPercentile}%` : 'Unranked'}
          </span>
        </div>
      </div>

      {/* Grid of Completed Tests */}
      <div className={styles.gamesGrid}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className={styles.gameTile} key={item.gameId}>
              <div className={styles.gameLeft}>
                <div
                  className={styles.gameIcon}
                  style={{ background: `${item.color}20`, color: item.color }}
                >
                  <Icon size={14} />
                </div>
                <div className={styles.gameMeta}>
                  <span className={styles.gameName}>{item.gameName}</span>
                  <span className={styles.gameScore}>{item.scoreFormatted}</span>
                </div>
              </div>
              <span className={styles.gamePercentile}>
                Top {100 - item.percentile}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.footerBrand}>humanbenchmark.in/dashboard</span>
        <span className={styles.footerCta}>Can you beat my scores?</span>
      </div>
    </div>
  );
}
