import { RotateCcw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './GameResult.module.css';
import type { ShareConfig } from '../types/share';
import { useShare } from '../hooks/useShare';
import ShareButton from './share/ShareButton';
import ShareModal from './share/ShareModal';

interface GameResultProps {
  score: string | number;
  label: string;
  onRetry: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  shareConfig: ShareConfig; // New required prop
}

export default function GameResult({ score, label, onRetry, icon, children, shareConfig }: GameResultProps) {
  const { isOpen, openShare, closeShare } = useShare();

  return (
    <div className={`${styles.resultContainer} glass`}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <h2 className={styles.score}>{score}</h2>
      <p className={styles.label}>{label}</p>
      
      {children && (
        <div className={styles.insightContainer}>
          {children}
        </div>
      )}

      <div className={styles.actions}>
        <button onClick={onRetry} className={styles.retryBtn}>
          <RotateCcw size={20} />
          Try Again
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <ShareButton onClick={openShare} />
          <Link to="/" className={styles.homeBtn}>
            <Home size={20} />
            Dashboard
          </Link>
        </div>
      </div>

      <ShareModal 
        isOpen={isOpen} 
        onClose={closeShare} 
        config={{...shareConfig, icon}} 
      />
    </div>
  );
}
