import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight, Loader2 } from 'lucide-react';
import { fetchLeaderboard, subscribeToLeaderboardUpdates } from '../../services/leaderboardService';
import type { LeaderboardEntry } from '../../services/leaderboardService';
import { useAuth } from '../../context/AuthContext';
import styles from './GameLeaderboardWidget.module.css';

interface GameLeaderboardWidgetProps {
  gameId: string;
  gameTitle?: string;
  limit?: number;
}

export default function GameLeaderboardWidget({
  gameId,
  gameTitle,
  limit = 5,
}: GameLeaderboardWidgetProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await fetchLeaderboard(gameId, 'all', limit, user?.id);
      setEntries(data);
    } catch (err) {
      console.warn('Could not load widget leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToLeaderboardUpdates(gameId, () => {
      loadData();
    });
    return () => unsubscribe();
  }, [gameId, user?.id]);

  const getRankClass = (rank: number) => {
    if (rank === 1) return styles.rank1;
    if (rank === 2) return styles.rank2;
    if (rank === 3) return styles.rank3;
    return '';
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetTitleGroup}>
          <Trophy size={18} color="#eab308" />
          <h3 className={styles.widgetTitle}>
            {gameTitle ? `${gameTitle} Top Players` : 'Global Leaderboard'}
          </h3>
        </div>
        <Link to={`/leaderboard?game=${gameId}`} className={styles.viewAllLink}>
          <span>View All</span>
          <ChevronRight size={14} />
        </Link>
      </div>

      {loading ? (
        <div className={styles.loadingSpinner}>
          <Loader2 size={24} className="spinning" />
        </div>
      ) : entries.length === 0 ? (
        <div className={styles.emptyState}>
          No global scores recorded yet. Be the first on the board!
        </div>
      ) : (
        <div className={styles.list}>
          {entries.map((entry) => (
            <div
              key={entry.userId}
              className={`${styles.entryRow} ${entry.isCurrentUser ? styles.isCurrentUser : ''}`}
            >
              <div className={styles.playerLeft}>
                <span className={`${styles.rankBadge} ${getRankClass(entry.rank)}`}>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </span>
                <div
                  className={styles.avatar}
                  style={{ background: entry.avatarColor }}
                >
                  {entry.username.charAt(0).toUpperCase()}
                </div>
                <span className={styles.playerName}>
                  {entry.username}
                  {entry.isCurrentUser && <span className={styles.youTag}>You</span>}
                </span>
              </div>
              <div className={styles.scoreVal}>{entry.scoreFormatted}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
