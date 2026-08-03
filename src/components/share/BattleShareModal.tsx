import { useEffect, useState } from 'react';
import { X, Trophy, Check, FileText } from 'lucide-react';
import { SiWhatsapp, SiSnapchat, SiX, SiInstagram } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import BattleShareCard from './BattleShareCard';
import type { BattleRoomWithScores } from '../../services/battleService';
import { formatBattleScore } from '../../services/battleService';
import { getBattleShareMessage, getBattleShareUrl } from '../../services/shareService';
import { copyToClipboard } from '../../services/clipboardService';
import styles from './BattleShareModal.module.css';

interface BattleShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: BattleRoomWithScores;
}

export default function BattleShareModal({
  isOpen,
  onClose,
  room,
}: BattleShareModalProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

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

  const formattedScores = room.scores.map(s => ({
    id: s.id,
    playerName: s.playerName,
    scoreFormatted: formatBattleScore(room.gameId, s.score),
  }));

  const shareText = getBattleShareMessage({
    roomCode: room.roomCode,
    gameName: room.gameName,
    hostName: room.hostName,
    scores: formattedScores,
  });

  const shareUrl = getBattleShareUrl(room.roomCode);
  const encodedText = encodeURIComponent(shareText);

  const handleCopySummary = async () => {
    const success = await copyToClipboard(shareText);
    if (success) showFeedback('Leaderboard summary copied!');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) showFeedback('Battle link copied!');
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
          aria-labelledby="battle-share-title"
        >
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close share dialog"
          >
            <X size={18} />
          </button>

          <div className={styles.header}>
            <h2 id="battle-share-title" className={styles.title}>
              <Trophy size={22} style={{ color: '#34d399' }} />
              Share Battle Leaderboard
            </h2>
            <p className={styles.subtitle}>
              Challenge your friends or group chat to beat this leaderboard!
            </p>
          </div>

          <div className={styles.cardWrapper}>
            <BattleShareCard
              roomCode={room.roomCode}
              gameName={room.gameName}
              hostName={room.hostName}
              scores={formattedScores}
              maxPlayers={room.maxPlayers}
            />
          </div>

          <div className={styles.actionsGrid}>
            <button className={styles.platformBtn} onClick={handleCopySummary}>
              <div className={`${styles.iconContainer} ${styles['bg-summary']}`}>
                <FileText size={22} />
              </div>
              <span className={styles.label}>Copy Text</span>
            </button>

            <button className={styles.platformBtn} onClick={handleCopyLink}>
              <div className={`${styles.iconContainer} ${styles['bg-copy']}`}>
                <FaLink size={20} />
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
                <SiWhatsapp size={24} />
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
                <SiX size={20} />
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
                <SiInstagram size={22} color="white" />
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
                <SiSnapchat size={24} color="black" />
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
