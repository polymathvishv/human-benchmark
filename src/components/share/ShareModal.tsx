import { useEffect, useRef } from 'react';
import type { ShareConfig } from '../../types/share';
import ShareCard from './ShareCard';
import ShareOptions from './ShareOptions';
import styles from './ShareModal.module.css';
import { X, Trophy } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ShareConfig;
}

export default function ShareModal({ isOpen, onClose, config }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const EXPORT_CARD_ID = 'share-card-export-target';

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

          <div className={styles.cardWrapper}>
            <ShareCard config={config} theme="dark" />
          </div>
          
          <ShareOptions config={config} />
        </div>
      </div>

      {/* Hidden export target for high-res PNG generation */}
      {isOpen && (
        <div className={styles.exportContainer}>
          <div style={{ width: '1080px', height: '1080px', fontSize: '2.5rem' }}>
            <ShareCard config={config} theme="dark" id={EXPORT_CARD_ID} />
          </div>
        </div>
      )}
    </>
  );
}
