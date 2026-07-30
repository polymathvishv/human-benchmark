import { useState } from 'react';
import { RotateCcw, Home, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './GameResult.module.css';

interface GameResultProps {
  score: string | number;
  label: string;
  onRetry: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function GameResult({ score, label, onRetry, icon, children }: GameResultProps) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const text = `I just scored ${score} on the Human Benchmark! Think you can beat me? Try it at https://humanbenchmark.in`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Human Benchmark Score',
          text: text,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
        return;
      } catch (err) {
        // Fallback to clipboard if share gets aborted or fails
      }
    }
    
    try {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

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
          <button onClick={handleShare} className={styles.shareBtn}>
            {shared ? <Check size={20} /> : <Share2 size={20} />}
            {shared ? 'Copied!' : 'Share'}
          </button>
          <Link to="/" className={styles.homeBtn}>
            <Home size={20} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
