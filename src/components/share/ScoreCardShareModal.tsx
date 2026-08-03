import { useEffect, useState } from 'react';
import { X, Trophy, Check, FileText } from 'lucide-react';
import { SiWhatsapp, SiSnapchat, SiX, SiInstagram } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import ScoreCardShareCard, { type ScoreCardGameItem } from './ScoreCardShareCard';
import { getScoreCardShareMessage, getScoreCardShareUrl } from '../../services/shareService';
import { copyToClipboard } from '../../services/clipboardService';
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
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

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

  const shareText = getScoreCardShareMessage(
    items.map(i => ({
      gameId: i.gameId,
      gameName: i.gameName,
      scoreFormatted: i.scoreFormatted,
      percentile: i.percentile
    })),
    overallPercentile
  );

  const shareUrl = getScoreCardShareUrl();
  const encodedText = encodeURIComponent(shareText);

  const handleCopySummary = async () => {
    const success = await copyToClipboard(shareText);
    if (success) showFeedback('Scorecard text copied!');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) showFeedback('Link copied to clipboard!');
  };

  return (
    <>
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

          <div className={styles.cardWrapper}>
            <ScoreCardShareCard
              items={items}
              totalGamesCount={totalGamesCount}
              overallPercentile={overallPercentile}
            />
          </div>

          <div className={styles.actionsGrid}>
            <button className={styles.platformBtn} onClick={handleCopySummary}>
              <div className={`${styles.iconContainer} ${styles['bg-summary']}`}>
                <FileText size={30} />
              </div>
              <span className={styles.label}>Copy Summary</span>
            </button>

            <button className={styles.platformBtn} onClick={handleCopyLink}>
              <div className={`${styles.iconContainer} ${styles['bg-copy']}`}>
                <FaLink size={32} />
              </div>
              <span className={styles.label}>Copy Link</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformBtn}
            >
              <div className={`${styles.iconContainer} ${styles['bg-whatsapp']}`}>
                <SiWhatsapp size={36} />
              </div>
              <span className={styles.label}>WhatsApp</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformBtn}
            >
              <div className={`${styles.iconContainer} ${styles['bg-twitter']}`}>
                <SiX size={32} />
              </div>
              <span className={styles.label}>X</span>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformBtn}
            >
              <div className={`${styles.iconContainer} ${styles['bg-instagram']}`}>
                <SiInstagram size={34} color="white" />
              </div>
              <span className={styles.label}>Instagram</span>
            </a>

            <a
              href="https://www.snapchat.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformBtn}
            >
              <div className={`${styles.iconContainer} ${styles['bg-snapchat']}`}>
                <SiSnapchat size={36} color="white" />
              </div>
              <span className={styles.label}>Snapchat</span>
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.feedbackToast} ${feedback ? styles.visible : ''}`}>
        <Check size={18} />
        {feedback}
      </div>
    </>
  );
}
