import { Link } from 'react-router-dom';
import { Zap, Headphones } from 'lucide-react';
import styles from './ReactionModeToggle.module.css';

interface ReactionModeToggleProps {
  currentMode: 'visual' | 'audio';
}

export default function ReactionModeToggle({ currentMode }: ReactionModeToggleProps) {
  return (
    <div className={styles.toggleContainer} role="tablist" aria-label="Reaction test mode selection">
      <Link
        to="/reaction-time"
        className={`${styles.toggleButton} ${currentMode === 'visual' ? styles.active : ''}`}
        role="tab"
        aria-selected={currentMode === 'visual'}
        id="mode-visual-toggle"
      >
        <Zap size={15} className={styles.icon} />
        <span className={styles.label}>Visual Mode</span>
        <span className={styles.avgBadge}>~284ms avg</span>
      </Link>

      <Link
        to="/audio-reaction-time"
        className={`${styles.toggleButton} ${currentMode === 'audio' ? styles.active : ''}`}
        role="tab"
        aria-selected={currentMode === 'audio'}
        id="mode-audio-toggle"
      >
        <Headphones size={15} className={styles.icon} />
        <span className={styles.label}>Audio Mode</span>
        <span className={styles.avgBadge}>~185ms avg</span>
      </Link>
    </div>
  );
}
