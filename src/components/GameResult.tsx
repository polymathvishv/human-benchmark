import { RotateCcw, Home, Loader2, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './GameResult.module.css';
import type { ShareConfig } from '../types/share';
import { useShare } from '../hooks/useShare';
import ShareButton from './share/ShareButton';
import ShareModal from './share/ShareModal';
import { useBattleAutoSubmit } from '../hooks/useBattleAutoSubmit';

interface GameResultProps {
  score: string | number;
  label: string;
  onRetry: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  shareConfig: ShareConfig;
}

export default function GameResult({ score, label, onRetry, icon, children, shareConfig }: GameResultProps) {
  const { isOpen, openShare, closeShare } = useShare();

  // Auto-submit to battle room if in battle mode
  const numericScore = typeof shareConfig.score === 'number' ? shareConfig.score : null;
  const { status: battleStatus, roomCode: battleRoomCode } = useBattleAutoSubmit(shareConfig.gameId, numericScore);

  const renderBattleBanner = () => {
    if (battleStatus === 'none' || battleStatus === 'idle' || battleStatus === 'wrong_game') return null;

    if (battleStatus === 'submitting') {
      return (
        <div className={`${styles.battleBanner} ${styles.battleBannerSubmitting}`}>
          <span className={styles.battleBannerIcon}>
            <Loader2 size={20} className="spinning" />
          </span>
          <div className={styles.battleBannerText}>
            <div className={styles.battleBannerTitle}>Submitting to Battle Room…</div>
            <div>Your score is being posted to the live leaderboard.</div>
          </div>
        </div>
      );
    }

    if (battleStatus === 'success') {
      return (
        <div className={`${styles.battleBanner} ${styles.battleBannerSuccess}`}>
          <span className={styles.battleBannerIcon}>⚔️</span>
          <div className={styles.battleBannerText}>
            <div className={styles.battleBannerTitle}>Score submitted to Battle!</div>
            <div>Your result has been posted to the live leaderboard.</div>
            <Link
              to={`/battle/${battleRoomCode}`}
              className={styles.battleRoomLink}
            >
              <Swords size={13} />
              View Battle Leaderboard →
            </Link>
          </div>
        </div>
      );
    }

    if (battleStatus === 'error') {
      return (
        <div className={`${styles.battleBanner} ${styles.battleBannerError}`}>
          <span className={styles.battleBannerIcon}>⚠️</span>
          <div className={styles.battleBannerText}>
            <div className={styles.battleBannerTitle}>Battle submission failed</div>
            <div>
              The room may be full or expired.{' '}
              {battleRoomCode && (
                <Link to={`/battle/${battleRoomCode}`} style={{ color: 'inherit', fontWeight: 700 }}>
                  Check the room →
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
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

      {/* Battle Banner — shown above action buttons */}
      {renderBattleBanner()}

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
