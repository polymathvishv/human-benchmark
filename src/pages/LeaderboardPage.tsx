import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Trophy, Zap, Grid3x3, Target, Hash, MessageSquare, Smile,
  Layers, Keyboard, Smartphone, Crown, Play, Loader2,
  Calendar, Flame, Sparkles
} from 'lucide-react';
import {
  fetchLeaderboard,
  fetchUserRankStats,
  subscribeToLeaderboardUpdates,
} from '../services/leaderboardService';
import type {
  LeaderboardEntry,
  UserRankStats,
  TimeframeFilter,
} from '../services/leaderboardService';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import styles from './LeaderboardPage.module.css';

const GAMES = [
  { id: 'reaction-time', name: 'Reaction Time', icon: Zap, path: '/reaction-time' },
  { id: 'sequence-memory', name: 'Sequence Memory', icon: Grid3x3, path: '/sequence-memory' },
  { id: 'aim-trainer', name: 'Aim Trainer', icon: Target, path: '/aim-trainer' },
  { id: 'number-memory', name: 'Number Memory', icon: Hash, path: '/number-memory' },
  { id: 'verbal-memory', name: 'Verbal Memory', icon: MessageSquare, path: '/verbal-memory' },
  { id: 'chimp-test', name: 'Chimp Test', icon: Smile, path: '/chimp-test' },
  { id: 'visual-memory', name: 'Visual Memory', icon: Layers, path: '/visual-memory' },
  { id: 'typing', name: 'Typing Test', icon: Keyboard, path: '/typing' },
  { id: 'mobile-typing', name: 'Mobile Typing', icon: Smartphone, path: '/mobile-typing' },
];

function getRelativeTime(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function LeaderboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGameId = searchParams.get('game') || 'reaction-time';

  const [timeframe, setTimeframe] = useState<TimeframeFilter>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRankStats | null>(null);
  const [loading, setLoading] = useState(true);

  const { user, openAuthModal } = useAuth();

  const selectedGame = GAMES.find(g => g.id === activeGameId) || GAMES[0];

  const handleSelectGame = (gameId: string) => {
    setSearchParams({ game: gameId });
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [leaderboardData, rankData] = await Promise.all([
        fetchLeaderboard(activeGameId, timeframe, 50, user?.id),
        user?.id ? fetchUserRankStats(activeGameId, user.id) : Promise.resolve(null),
      ]);

      setEntries(leaderboardData);
      setUserRank(rankData);
    } catch (err) {
      console.error('Error loading leaderboard page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToLeaderboardUpdates(activeGameId, () => {
      loadData();
    });
    return () => unsubscribe();
  }, [activeGameId, timeframe, user?.id]);

  const top1 = entries[0];
  const top2 = entries[1];
  const top3 = entries[2];

  return (
    <>
      <SEO
        title={`${selectedGame.name} Global Leaderboard — Human Benchmark`}
        description={`See the top human benchmark high scores and global rankings for ${selectedGame.name}.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${selectedGame.name} Global Leaderboard`,
          url: `https://humanbenchmark.in/leaderboard?game=${activeGameId}`,
        }}
      />

      <div className="main-content-contained">
        <div className={styles.page}>

          {/* ── Hero ── */}
          <div className={styles.hero}>
            <div className={styles.heroBadge}>
              <Trophy size={14} />
              <span>Real-Time World Rankings</span>
            </div>
            <h1 className={styles.heroTitle}>Global Leaderboards</h1>
            <p className={styles.heroSubtitle}>
              Compete with players worldwide, track your rank, and aim for the global Top 10.
            </p>
          </div>

          {/* ── Game Selector Tabs ── */}
          <div className={styles.gameSelectorScroll}>
            <div className={styles.gameSelector}>
              {GAMES.map(g => {
                const Icon = g.icon;
                const isActive = g.id === activeGameId;
                return (
                  <button
                    key={g.id}
                    className={`${styles.gameTab} ${isActive ? styles.gameTabActive : ''}`}
                    onClick={() => handleSelectGame(g.id)}
                  >
                    <Icon size={16} />
                    <span>{g.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Controls Row (Timeframe & Play CTA) ── */}
          <div className={styles.controlsRow}>
            <div className={styles.timeframeTabs}>
              <button
                className={`${styles.timeframeBtn} ${timeframe === 'all' ? styles.timeframeBtnActive : ''}`}
                onClick={() => setTimeframe('all')}
              >
                <Flame size={14} style={{ display: 'inline', marginRight: 4 }} />
                All-Time
              </button>
              <button
                className={`${styles.timeframeBtn} ${timeframe === 'month' ? styles.timeframeBtnActive : ''}`}
                onClick={() => setTimeframe('month')}
              >
                <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
                This Month
              </button>
              <button
                className={`${styles.timeframeBtn} ${timeframe === 'week' ? styles.timeframeBtnActive : ''}`}
                onClick={() => setTimeframe('week')}
              >
                <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} />
                This Week
              </button>
            </div>

            <Link to={selectedGame.path} className={styles.playTestBtn}>
              <Play size={16} fill="white" />
              <span>Play {selectedGame.name}</span>
            </Link>
          </div>

          {/* ── User Rank Banner ── */}
          <div className={styles.userRankBanner}>
            <div className={styles.userRankLeft}>
              <Trophy size={28} color="#38bdf8" />
              <div className={styles.userRankInfo}>
                <h4>Your Global Standing in {selectedGame.name}</h4>
                <p>
                  {user
                    ? userRank
                      ? `Ranked #${userRank.rank} globally among ${userRank.totalPlayers} players`
                      : 'Play this test to record your score on the global leaderboard!'
                    : 'Log in or sign up to record your scores and climb the world leaderboard.'}
                </p>
              </div>
            </div>

            <div className={styles.userRankStats}>
              {user ? (
                userRank ? (
                  <>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Your Rank</div>
                      <div className={`${styles.statValue} ${styles.statValueHighlight}`}>
                        #{userRank.rank}
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Your Best</div>
                      <div className={styles.statValue}>{userRank.scoreFormatted}</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Percentile</div>
                      <div className={styles.statValue}>Top {100 - userRank.percentile}%</div>
                    </div>
                  </>
                ) : (
                  <Link to={selectedGame.path} className={styles.playTestBtn}>
                    Play Test
                  </Link>
                )
              ) : (
                <button
                  className={styles.playTestBtn}
                  onClick={() => openAuthModal('signup')}
                >
                  Create Account
                </button>
              )}
            </div>
          </div>

          {/* ── Loading Spinner ── */}
          {loading ? (
            <div className={styles.loadingState}>
              <Loader2 size={36} className="spinning" color="var(--primary-color)" />
              <p style={{ marginTop: '1rem' }}>Loading live global scores...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className={styles.emptyState}>
              <Trophy size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3>No scores recorded yet for this timeframe</h3>
              <p>Be the first player to record a high score on the global board!</p>
              <Link to={selectedGame.path} className={styles.playTestBtn} style={{ marginTop: '1.25rem' }}>
                Play {selectedGame.name}
              </Link>
            </div>
          ) : (
            <>
              {/* ── Top 3 Podium ── */}
              {entries.length >= 3 && (
                <div className={styles.podiumSection}>
                  {/* Rank 2 (Silver) */}
                  {top2 && (
                    <div className={`${styles.podiumCard} ${styles.podium2}`}>
                      <div className={`${styles.podiumRankBadge} ${styles.rankBadge2}`}>
                        <span>🥈 #2</span>
                      </div>
                      <div className={styles.podiumAvatar} style={{ background: top2.avatarColor }}>
                        {top2.username.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.podiumName}>{top2.username}</div>
                      <div className={styles.podiumScore}>{top2.scoreFormatted}</div>
                      <div className={styles.podiumTime}>{getRelativeTime(top2.createdAt)}</div>
                    </div>
                  )}

                  {/* Rank 1 (Gold) */}
                  {top1 && (
                    <div className={`${styles.podiumCard} ${styles.podium1}`}>
                      <div className={`${styles.podiumRankBadge} ${styles.rankBadge1}`}>
                        <Crown size={14} />
                        <span>🥇 #1 CHAMPION</span>
                      </div>
                      <div className={styles.podiumAvatar} style={{ background: top1.avatarColor }}>
                        {top1.username.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.podiumName}>{top1.username}</div>
                      <div className={styles.podiumScore}>{top1.scoreFormatted}</div>
                      <div className={styles.podiumTime}>{getRelativeTime(top1.createdAt)}</div>
                    </div>
                  )}

                  {/* Rank 3 (Bronze) */}
                  {top3 && (
                    <div className={`${styles.podiumCard} ${styles.podium3}`}>
                      <div className={`${styles.podiumRankBadge} ${styles.rankBadge3}`}>
                        <span>🥉 #3</span>
                      </div>
                      <div className={styles.podiumAvatar} style={{ background: top3.avatarColor }}>
                        {top3.username.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.podiumName}>{top3.username}</div>
                      <div className={styles.podiumScore}>{top3.scoreFormatted}</div>
                      <div className={styles.podiumTime}>{getRelativeTime(top3.createdAt)}</div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Rankings Table ── */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <span>Rank</span>
                  <span>Player</span>
                  <span>Score</span>
                  <span className={styles.dateCol}>Date</span>
                </div>

                {entries.map(entry => (
                  <div
                    key={entry.userId}
                    className={`${styles.tableRow} ${entry.isCurrentUser ? styles.tableRowCurrentUser : ''}`}
                  >
                    <div className={styles.rankCol}>
                      {entry.rank === 1 ? (
                        <span className={styles.rankPill} style={{ background: '#fef3c7', color: '#b45309' }}>🥇</span>
                      ) : entry.rank === 2 ? (
                        <span className={styles.rankPill} style={{ background: '#f1f5f9', color: '#475569' }}>🥈</span>
                      ) : entry.rank === 3 ? (
                        <span className={styles.rankPill} style={{ background: '#ffedd5', color: '#c2410c' }}>🥉</span>
                      ) : (
                        <span className={styles.rankPill}>#{entry.rank}</span>
                      )}
                    </div>

                    <div className={styles.playerCol}>
                      <div
                        className={styles.playerAvatar}
                        style={{ background: entry.avatarColor }}
                      >
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.playerUsername}>
                        {entry.username}
                        {entry.isCurrentUser && <span className={styles.youTag}>You</span>}
                      </span>
                    </div>

                    <div className={styles.scoreCol}>
                      {entry.scoreFormatted}
                    </div>

                    <div className={styles.dateCol}>
                      {getRelativeTime(entry.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
