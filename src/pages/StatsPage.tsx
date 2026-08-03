import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Grid3x3, Target, Hash, MessageSquare, Keyboard, Smile,
  Smartphone, Layers, Play, Trophy, Activity, Info, Share2, Settings, Cloud, User, RefreshCw, CheckCircle2
} from 'lucide-react';
import { getHighScore } from '../hooks/useHighScore';
import { generateMockPercentile } from '../services/shareService';
import { useAuth } from '../context/AuthContext';
import ScoreCardShareModal from '../components/share/ScoreCardShareModal';
import EditProfileModal from '../components/auth/EditProfileModal';
import type { ScoreCardGameItem } from '../components/share/ScoreCardShareCard';
import SEO from '../components/SEO';
import styles from './StatsPage.module.css';

const GAMES = [
  {
    id: 'reaction-time',
    name: 'Reaction Time',
    icon: Zap,
    color: '#ef4444',
    isLowerBetter: true,
    formatScore: (s: number) => `${s} ms`,
  },
  {
    id: 'sequence-memory',
    name: 'Sequence Memory',
    icon: Grid3x3,
    color: '#3b82f6',
    isLowerBetter: false,
    formatScore: (s: number) => `Level ${s}`,
  },
  {
    id: 'aim-trainer',
    name: 'Aim Trainer',
    icon: Target,
    color: '#22c55e',
    isLowerBetter: true,
    formatScore: (s: number) => `${s} ms`,
  },
  {
    id: 'number-memory',
    name: 'Number Memory',
    icon: Hash,
    color: '#a855f7',
    isLowerBetter: false,
    formatScore: (s: number) => `Level ${s}`,
  },
  {
    id: 'verbal-memory',
    name: 'Verbal Memory',
    icon: MessageSquare,
    color: '#f59e0b',
    isLowerBetter: false,
    formatScore: (s: number) => `${s} words`,
  },
  {
    id: 'chimp-test',
    name: 'Chimp Test',
    icon: Smile,
    color: '#ec4899',
    isLowerBetter: false,
    formatScore: (s: number) => `Level ${s}`,
  },
  {
    id: 'visual-memory',
    name: 'Visual Memory',
    icon: Layers,
    color: '#14b8a6',
    isLowerBetter: false,
    formatScore: (s: number) => `Level ${s}`,
  },
  {
    id: 'typing',
    name: 'Typing',
    icon: Keyboard,
    color: '#6366f1',
    isLowerBetter: false,
    formatScore: (s: number) => `${s} WPM`,
  },
  {
    id: 'mobile-typing',
    name: 'Mobile Typing',
    icon: Smartphone,
    color: '#0ea5e9',
    isLowerBetter: false,
    formatScore: (s: number) => `${s} WPM`,
  },
];

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

interface ActivityEntry {
  gameId: string;
  gameName: string;
  score: string;
  timestamp: number;
  color: string;
}

function getRecentActivity(): ActivityEntry[] {
  const entries: ActivityEntry[] = [];
  GAMES.forEach(game => {
    const score = getHighScore(game.id);
    if (score !== null) {
      const tsKey = `hb-score-ts-${game.id}`;
      const ts = parseInt(localStorage.getItem(tsKey) || '0', 10);
      entries.push({
        gameId: game.id,
        gameName: game.name,
        score: game.formatScore(score),
        timestamp: ts || Date.now() - Math.random() * 86400000 * 2,
        color: game.color,
      });
    }
  });
  return entries.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
}

export default function StatsPage() {
  const { user, profile, openAuthModal, isSyncingScores, syncScores } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [syncTick, setSyncTick] = useState(0);

  // Re-calculate scores whenever sync events occur
  useEffect(() => {
    const handleSync = () => {
      setSyncTick(prev => prev + 1);
    };
    window.addEventListener('hb-scores-synced', handleSync);
    return () => window.removeEventListener('hb-scores-synced', handleSync);
  }, []);

  const completedGameItems: ScoreCardGameItem[] = GAMES.reduce<ScoreCardGameItem[]>((acc, game) => {
    const score = getHighScore(game.id);
    if (score !== null) {
      const percentile = generateMockPercentile(score, game.id, game.isLowerBetter);
      acc.push({
        gameId: game.id,
        gameName: game.name,
        icon: game.icon,
        color: game.color,
        scoreFormatted: game.formatScore(score),
        percentile,
      });
    }
    return acc;
  }, []);

  const overallPercentile = completedGameItems.length > 0
    ? Math.round(completedGameItems.reduce((sum, item) => sum + item.percentile, 0) / completedGameItems.length)
    : 0;

  const testsCompleted = completedGameItems.length;
  const activity = getRecentActivity();

  const lastSyncStr = localStorage.getItem('hb-last-sync-ts');
  const lastSyncTime = lastSyncStr ? parseInt(lastSyncStr, 10) : null;

  const displayName = profile?.username || user?.user_metadata?.username || (user ? user.email?.split('@')[0] : 'Guest User');
  const avatarGradient = profile?.avatar_color || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
  const initial = displayName ? displayName.charAt(0).toUpperCase() : 'G';

  return (
    <>
      <SEO jsonLd={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Score Card — Human Benchmark', url: 'https://humanbenchmark.in/dashboard' }} />
      <div className="main-content-contained">
        <div className={styles.page} key={syncTick}>

          {/* ── Profile Card ── */}
          <div className={styles.profileCard}>
            <div className={styles.avatarRing} style={{ background: user ? avatarGradient : undefined }}>
              <span className={styles.avatarInitial}>{initial}</span>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileLabel}>{user ? 'Member Profile' : 'Guest Account'}</div>
              <h1 className={styles.profileName}>{displayName}</h1>
              <div className={styles.profileMeta}>
                <span className={styles.metaBadge}>
                  <Trophy size={14} />
                  {testsCompleted} / {GAMES.length} tests completed
                </span>
                <span className={styles.metaBadge}>
                  <Activity size={14} />
                  {activity.length} recent activities
                </span>
                {user ? (
                  <span className={styles.metaBadge} style={{ color: '#22c55e' }}>
                    <CheckCircle2 size={14} />
                    {isSyncingScores ? 'Syncing...' : (lastSyncTime ? `Cloud Synced (${getRelativeTime(lastSyncTime)})` : 'Cloud Connected')}
                  </span>
                ) : (
                  <span className={styles.metaBadge} style={{ color: 'var(--text-muted)' }}>
                    <Cloud size={14} />
                    Scores saved on this device only
                  </span>
                )}
              </div>
            </div>

            <div className={styles.profileActions}>
              {user ? (
                <>
                  <button
                    className={styles.syncBtn}
                    onClick={() => syncScores()}
                    disabled={isSyncingScores}
                    title="Sync scores with cloud database"
                  >
                    <RefreshCw size={15} className={isSyncingScores ? styles.spinning : ''} />
                    <span>{isSyncingScores ? 'Syncing...' : 'Sync Cloud'}</span>
                  </button>

                  <button
                    className={styles.editProfileBtn}
                    onClick={() => setIsEditProfileOpen(true)}
                    title="Customize your username and avatar color"
                  >
                    <Settings size={16} />
                    <span>Edit Profile</span>
                  </button>
                </>
              ) : (
                <button
                  className={styles.editProfileBtn}
                  onClick={() => openAuthModal('login')}
                  title="Log in to your account"
                >
                  <User size={16} />
                  <span>Log In</span>
                </button>
              )}

              <button
                className={styles.shareScorecardBtn}
                onClick={() => setIsShareModalOpen(true)}
                disabled={completedGameItems.length === 0}
                title={completedGameItems.length === 0 ? 'Play at least 1 test to share your scorecard' : 'Share your entire scorecard'}
              >
                <Share2 size={18} />
                <span>Share Score Card</span>
              </button>
            </div>
          </div>

          {/* ── Guest Warning / Signup Banner ── */}
          {!user && (
            <div className={styles.guestBanner}>
              <div className={styles.guestBannerText}>
                <Cloud size={20} className={styles.guestBannerIcon} />
                <span>
                  <strong>Playing as a Guest.</strong> Create an account to permanently sync your scores across devices and claim your unique username.
                </span>
              </div>
              <button
                className={styles.guestBannerBtn}
                onClick={() => openAuthModal('signup')}
              >
                Create Free Account
              </button>
            </div>
          )}

          {/* ── Tests Table ── */}
          <div className={styles.tableCard}>
            <div className={styles.tableHeaderGrid}>
              <span className={styles.colHeader}>Test</span>
              <span className={styles.colHeader}>Actions</span>
              <span className={styles.colHeader}>
                Score
                <Info size={13} style={{ opacity: 0.5 }} />
              </span>
              <span className={styles.colHeader}>
                Percentile
                <Info size={13} style={{ opacity: 0.5 }} />
              </span>
            </div>

            {GAMES.map(game => {
              const Icon = game.icon;
              const score = getHighScore(game.id);
              const percentile = score !== null
                ? generateMockPercentile(score, game.id, game.isLowerBetter)
                : null;

              return (
                <div className={styles.testRow} key={game.id}>
                  {/* Test Name */}
                  <div className={styles.testNameCell}>
                    <div
                      className={styles.testIcon}
                      style={{ background: `${game.color}18`, color: game.color }}
                    >
                      <Icon size={18} />
                    </div>
                    <span className={styles.testName}>{game.name}</span>
                  </div>

                  {/* Actions */}
                  <div className={styles.actionsCell}>
                    <Link to={`/${game.id}`} className={styles.playBtn}>
                      <Play size={12} />
                      Play
                    </Link>
                  </div>

                  {/* Score */}
                  <div className={styles.scoreCell}>
                    {score !== null
                      ? game.formatScore(score)
                      : <span className={styles.noScore}>?</span>
                    }
                  </div>

                  {/* Percentile */}
                  <div className={styles.percentileCell}>
                    {percentile !== null ? (
                      <>
                        <div className={styles.percentileLabelRow}>
                          <span className={styles.percentileLabel}>Top {100 - percentile}%</span>
                        </div>
                        <div className={styles.percentileBarTrack}>
                          <div
                            className={styles.percentileBarFill}
                            style={{ width: `${percentile}%` }}
                          />
                        </div>
                      </>
                    ) : (
                      <span className={styles.noScore}>?</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Activity Feed ── */}
          <div className={styles.activityCard}>
            <div className={styles.activityHeader}>
              <Activity size={18} color="var(--primary-color)" />
              <h2>Activity feed</h2>
            </div>

            {activity.length === 0 ? (
              <div className={styles.emptyFeed}>
                <p>You haven't recorded any scores yet. Try a game!</p>
                <Link to="/" className={styles.emptyFeedLink}>Browse Tests</Link>
              </div>
            ) : (
              <div className={styles.activityFeed}>
                {activity.map((entry, i) => {
                  const game = GAMES.find(g => g.id === entry.gameId);
                  const Icon = game?.icon || Zap;
                  return (
                    <div className={styles.activityItem} key={i}>
                      <div className={styles.activityDot} style={{ background: entry.color }} />
                      <Icon size={16} color={entry.color} style={{ flexShrink: 0 }} />
                      <div className={styles.activityText}>
                        Scored <span className={styles.activityScore}>{entry.score}</span> in <strong>{entry.gameName}</strong>
                      </div>
                      <div className={styles.activityTime}>{getRelativeTime(entry.timestamp)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      <ScoreCardShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        items={completedGameItems}
        totalGamesCount={GAMES.length}
        overallPercentile={overallPercentile}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
}
