import { useEffect, useRef } from 'react';
import { X, Trophy } from 'lucide-react';
import ScoreCardShareCard, { type ScoreCardGameItem } from './ScoreCardShareCard';
import ImageShareActions from './ImageShareActions';
import { INVITATION_COPY, SITE_URL } from '../../services/imageShareService';
import styles from './ScoreCardShareModal.module.css';

interface ScoreCardShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ScoreCardGameItem[];
  totalGamesCount: number;
  overallPercentile: number;
}

export default function ScoreCardShareModal({
  isOpen,
  onClose,
  items,
  totalGamesCount,
  overallPercentile
}: ScoreCardShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const invitationText = INVITATION_COPY.scorecard(overallPercentile);
  const shareUrl = `${SITE_URL}/dashboard`;

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="scorecard-share-title"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close share dialog"
        >
          <X size={20} />
        </button>

        <div className={styles.header}>
          <h2 id="scorecard-share-title" className={styles.title}>
            <Trophy size={24} style={{ color: '#eab308' }} />
            Share Your Scorecard
          </h2>
          <p className={styles.subtitle}>
            Challenge your friends to beat your cognitive benchmarks.
          </p>
        </div>

        <div className={styles.cardWrapper} style={{ marginBottom: '1.5rem' }}>
          <div ref={cardRef}>
            <ScoreCardShareCard
              items={items}
              totalGamesCount={totalGamesCount}
              overallPercentile={overallPercentile}
            />
          </div>
        </div>

        <ImageShareActions
          cardRef={cardRef}
          fileName="human-benchmark-scorecard.png"
          invitationText={invitationText}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  );
}

