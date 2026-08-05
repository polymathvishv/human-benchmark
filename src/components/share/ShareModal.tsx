import { useEffect, useRef } from 'react';
import type { ShareConfig } from '../../types/share';
import ShareCard from './ShareCard';
import ImageShareActions from './ImageShareActions';
import { INVITATION_COPY, SITE_URL } from '../../services/imageShareService';
import styles from './ShareModal.module.css';
import { X, Trophy } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ShareConfig;
}

export default function ShareModal({ isOpen, onClose, config }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
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

  const invitationText = INVITATION_COPY.game(config.gameName, config.score, config.unit);
  const shareUrl = `${SITE_URL}/${config.gameId}`;
  const fileName = `${config.gameId}-score.png`;

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
        aria-labelledby="share-modal-title"
        ref={modalRef}
      >
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close share dialog"
        >
          <X size={20} />
        </button>

        <div className={styles.header}>
          <h2 id="share-modal-title" className={styles.title}>
            <Trophy className="text-yellow-500" size={24} />
            Share Your Result
          </h2>
          <p className={styles.subtitle}>Challenge your friends to beat your score.</p>
        </div>

        <div className={styles.cardWrapper} style={{ marginBottom: '1.5rem' }}>
          <div ref={cardRef}>
            <ShareCard config={config} theme="dark" />
          </div>
        </div>
        
        <ImageShareActions
          cardRef={cardRef}
          fileName={fileName}
          invitationText={invitationText}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  );
}

