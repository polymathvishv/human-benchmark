import { useEffect, useRef } from 'react';
import { X, Trophy } from 'lucide-react';
import BattleShareCard from './BattleShareCard';
import type { BattleRoomWithScores } from '../../services/battleService';
import { formatBattleScore } from '../../services/battleService';
import { getBattleShareUrl } from '../../services/shareService';
import { INVITATION_COPY } from '../../services/imageShareService';
import ImageShareActions from './ImageShareActions';
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

  const formattedScores = room.scores.map(s => ({
    id: s.id,
    playerName: s.playerName,
    scoreFormatted: formatBattleScore(room.gameId, s.score),
  }));

  const invitationText = INVITATION_COPY.battle(room.gameName, room.roomCode);
  const shareUrl = getBattleShareUrl(room.roomCode);

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

        <div className={styles.cardWrapper} style={{ marginBottom: '1.5rem' }}>
          <div ref={cardRef}>
            <BattleShareCard
              roomCode={room.roomCode}
              gameName={room.gameName}
              hostName={room.hostName}
              scores={formattedScores}
              maxPlayers={room.maxPlayers}
            />
          </div>
        </div>

        <ImageShareActions
          cardRef={cardRef}
          fileName={`battle-${room.roomCode}-leaderboard.png`}
          invitationText={invitationText}
          shareUrl={shareUrl}
        />
      </div>
    </div>
  );
}

