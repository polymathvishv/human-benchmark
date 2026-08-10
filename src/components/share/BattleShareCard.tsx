import { Swords } from 'lucide-react';
import styles from './BattleShareCard.module.css';

export interface BattleShareCardScoreItem {
  id?: number | string;
  playerName: string;
  scoreFormatted: string;
}

interface BattleShareCardProps {
  roomCode: string;
  gameName: string;
  hostName: string;
  scores: BattleShareCardScoreItem[];
  maxPlayers: number;
  id?: string;
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
  'linear-gradient(135deg, #f97316 0%, #facc15 100%)',
  'linear-gradient(135deg, #e11d48 0%, #f97316 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
  'linear-gradient(135deg, #14b8a6 0%, #a855f7 100%)',
  'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
];

export default function BattleShareCard({
  roomCode,
  gameName,
  hostName,
  scores,
  maxPlayers,
  id,
}: BattleShareCardProps) {
  const displayScores = scores.slice(0, 5); // Show top 5 in visual card

  return (
    <div id={id} className={styles.cardContainer}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.brandGroup}>
          <img src="/logo.webp" alt="Human Benchmark" className={styles.brandLogo} />
          <span className={styles.brandTitle}>Human Benchmark</span>
        </div>
        <span className={styles.battleBadge}>
          <Swords size={12} />
          Battle Room
        </span>
      </div>

      {/* Room Information */}
      <div className={styles.roomBanner}>
        <div className={styles.gameName}>{gameName} Battle</div>
        <div className={styles.metaRow}>
          <span className={`${styles.metaPill} ${styles.metaPillGreen}`}>
            Room: {roomCode}
          </span>
          <span className={styles.metaPill}>
            Host: {hostName}
          </span>
          <span className={styles.metaPill}>
            {scores.length} / {maxPlayers} Players
          </span>
        </div>
      </div>

      {/* Ranked Leaderboard */}
      <div className={styles.leaderboardList}>
        {scores.length === 0 ? (
          <div className={styles.emptyState}>
            No scores submitted yet.<br />
            Be the first to join & claim #1!
          </div>
        ) : (
          displayScores.map((entry, idx) => {
            const rank = idx + 1;
            const isWinner = rank === 1;
            const rankSymbol = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

            return (
              <div
                key={entry.id ?? `${entry.playerName}-${idx}`}
                className={`${styles.rankRow} ${isWinner ? styles.rankRowWinner : ''}`}
              >
                <div className={styles.playerLeft}>
                  <span className={styles.rankIndicator}>{rankSymbol}</span>
                  <div
                    className={styles.playerAvatar}
                    style={{ background: avatarColor }}
                  >
                    {entry.playerName.charAt(0).toUpperCase()}
                  </div>
                  <span className={styles.playerName}>
                    {entry.playerName}
                    {entry.playerName.toLowerCase() === hostName.toLowerCase() && (
                      <span className={styles.hostTag}>Host</span>
                    )}
                  </span>
                </div>
                <span className={styles.playerScore}>{entry.scoreFormatted}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.footerBrand}>humanbenchmark.in/battle/{roomCode}</span>
        <span className={styles.footerCta}>Join & beat the board →</span>
      </div>
    </div>
  );
}
