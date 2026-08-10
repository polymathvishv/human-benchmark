import type { ShareConfig, ShareTheme } from '../../types/share';
import { generateMockPercentile } from '../../services/shareService';
import styles from './ShareCard.module.css';

interface ShareCardProps {
  config: ShareConfig;
  theme: ShareTheme;
  id?: string; // used for html-to-image targeting
}

export default function ShareCard({ config, theme, id }: ShareCardProps) {
  const { gameId, gameName, score, unit, icon, isLowerBetter = false } = config;
  
  // Try to use provided percentile, or generate a mock one based on score
  const percentile = config.percentile || generateMockPercentile(Number(score), gameId, isLowerBetter);
  
  const themeClass = styles[`theme-${theme}`];

  return (
    <div id={id} className={`${styles.cardContainer} ${themeClass}`}>
      {/* Abstract Background Elements */}
      <div className={`${styles.bgDecoration} ${styles.dec1}`} />
      <div className={`${styles.bgDecoration} ${styles.dec2}`} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <div className={styles.gameName}>{gameName}</div>
      </div>

      {/* Center Score */}
      <div className={styles.scoreSection}>
        <div className={styles.score}>
          {score}
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
        
        {percentile > 0 && (
          <div className={styles.percentileBadge}>
            Top {100 - percentile}%
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.branding}>
          <div className={styles.brandHeader}>
            <img src="/logo.webp" alt="Logo" className={styles.cardLogo} />
            <span className={styles.brandName}>HumanBenchmark.in</span>
          </div>
          <div className={styles.cta}>Can you beat my score?</div>
        </div>
      </div>
    </div>
  );
}
