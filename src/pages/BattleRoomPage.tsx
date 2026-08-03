import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Swords, Copy, Check, Play, Loader2, Trophy, Clock, ArrowRight, Share2
} from 'lucide-react';
import {
  fetchBattleRoom,
  subscribeToBattleRoom,
  formatBattleScore,
  isLowerBetter,
  getRoomTimeRemaining,
} from '../services/battleService';
import type { BattleRoomWithScores } from '../services/battleService';
import { setBattleContext } from '../hooks/useBattleAutoSubmit';
import BattleShareModal from '../components/share/BattleShareModal';
import SEO from '../components/SEO';
import styles from './BattleRoomPage.module.css';

const GAME_PATHS: Record<string, string> = {
  'reaction-time': '/reaction-time',
  'aim-trainer': '/aim-trainer',
  'typing': '/typing',
  'mobile-typing': '/mobile-typing',
  'sequence-memory': '/sequence-memory',
  'visual-memory': '/visual-memory',
  'number-memory': '/number-memory',
  'verbal-memory': '/verbal-memory',
  'chimp-test': '/chimp-test',
};

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

function getRelativeTime(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  return `${hours}h ago`;
}

export default function BattleRoomPage() {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<BattleRoomWithScores | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Play form state
  const [playerName, setPlayerName] = useState('');
  const [nameError, setNameError] = useState('');

  // Share modal state
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Copy link state
  const [copied, setCopied] = useState(false);

  // Time remaining
  const [timeRemaining, setTimeRemaining] = useState('');

  const loadRoom = useCallback(async () => {
    if (!roomCode) return;
    const data = await fetchBattleRoom(roomCode);
    if (!data) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setRoom(data);
    setTimeRemaining(getRoomTimeRemaining(data.expiresAt));
    setLoading(false);
  }, [roomCode]);

  useEffect(() => {
    loadRoom();
  }, [loadRoom]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!room?.id) return;
    const unsubscribe = subscribeToBattleRoom(room.id, () => {
      loadRoom();
    });
    return unsubscribe;
  }, [room?.id, loadRoom]);

  // Update time remaining every minute
  useEffect(() => {
    if (!room) return;
    const interval = setInterval(() => {
      setTimeRemaining(getRoomTimeRemaining(room.expiresAt));
    }, 60000);
    return () => clearInterval(interval);
  }, [room]);

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /**
   * Stores the battle context in sessionStorage, then navigates to the game.
   * When the game finishes, GameResult auto-submits the score via useBattleAutoSubmit.
   */
  const handlePlayTest = () => {
    if (!room) return;
    const name = playerName.trim();
    if (!name) {
      setNameError('Please enter your name before playing.');
      return;
    }
    if (name.length > 30) {
      setNameError('Name must be 30 characters or less.');
      return;
    }

    // Check if name is already taken
    const nameTaken = room.scores.some(
      s => s.playerName.toLowerCase() === name.toLowerCase()
    );
    if (nameTaken) {
      setNameError(`"${name}" has already submitted a score. Choose a different name.`);
      return;
    }

    setNameError('');

    // Store battle context in sessionStorage — GameResult picks this up after the game
    setBattleContext({
      roomCode: room.roomCode,
      playerName: name,
      gameId: room.gameId,
    });

    // Navigate to the actual game
    const gamePath = GAME_PATHS[room.gameId] || '/';
    navigate(gamePath);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>
          <Loader2 size={36} className="spinning" color="#10b981" />
          <p>Loading battle room…</p>
        </div>
      </div>
    );
  }

  if (notFound || !room) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <Swords size={52} color="#10b981" style={{ opacity: 0.4 }} />
          <h1 className={styles.notFoundTitle}>Room Not Found</h1>
          <p className={styles.notFoundText}>
            This battle room doesn't exist or may have expired after 48 hours.
          </p>
          <Link to="/battle" className={styles.notFoundBtn}>Create a New Room</Link>
        </div>
      </div>
    );
  }

  const lowerBetter = isLowerBetter(room.gameId);

  return (
    <>
      <SEO
        title={`${room.gameName} Battle — ${room.roomCode} | Human Benchmark`}
        description={`Join this Human Benchmark battle room! Compete on ${room.gameName} with up to ${room.maxPlayers} players. Your score is auto-submitted after the test.`}
        canonical={`https://humanbenchmark.in/battle/${room.roomCode}`}
      />

      <div className={styles.page}>

        {/* ── Room Header ── */}
        <div className={styles.roomHeader}>
          <div className={styles.roomHeaderInner}>
            <div className={styles.roomBreadcrumb}>
              <Link to="/battle" className={styles.breadcrumbLink}>Battles</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{room.roomCode}</span>
            </div>

            <div className={styles.roomMeta}>
              <div>
                <h1 className={styles.roomTitle}>⚔️ {room.gameName} Battle</h1>
                <div className={styles.roomTags}>
                  <span className={styles.tag}>
                    <Swords size={11} />
                    {room.roomCode}
                  </span>
                  <span className={styles.tag}>
                    Hosted by {room.hostName}
                  </span>
                  <span className={`${styles.tag} ${room.isFull ? styles.tagRed : styles.tagGreen}`}>
                    {room.playerCount} / {room.maxPlayers} players
                  </span>
                  <span className={`${styles.tag} ${room.isExpired ? styles.tagRed : ''}`}>
                    <Clock size={11} />
                    {room.isExpired ? 'Expired' : timeRemaining}
                  </span>
                </div>
              </div>

              <div className={styles.roomActions}>
                <button
                  className={styles.shareLeaderboardBtn}
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 size={15} />
                  Share Leaderboard
                </button>
                <button className={styles.copyLinkBtn} onClick={handleCopyLink}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? 'Copied!' : 'Copy Room Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>

          {/* ── Play Test Card ── */}
          {!room.isExpired && !room.isFull ? (
            <div className={styles.submitCard}>
              <div className={styles.submitCardAccent} />
              <div className={styles.submitBody}>
                <h2 className={styles.submitTitle}>🎮 Join the Battle</h2>
                <p className={styles.submitSubtitle}>
                  Enter your name below, then click <strong>Play {room.gameName}</strong>.
                  Your score will be automatically submitted to this battle room when you finish the test!
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <div className={styles.fieldWrap} style={{ flex: 1, minWidth: 200 }}>
                    <label className={styles.fieldLabel}>Your name in this battle</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      placeholder="e.g. Alex"
                      maxLength={30}
                      value={playerName}
                      onChange={e => { setPlayerName(e.target.value); setNameError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handlePlayTest()}
                      autoFocus
                    />
                  </div>
                  <button
                    className={styles.submitBtn}
                    style={{ flex: '0 0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                    onClick={handlePlayTest}
                  >
                    <Play size={16} fill="white" style={{ marginRight: '0.35rem' }} />
                    Play {room.gameName}
                    <ArrowRight size={16} style={{ marginLeft: '0.35rem' }} />
                  </button>
                </div>

                {nameError && (
                  <p className={`${styles.submitMsg} ${styles.submitMsgError}`}>{nameError}</p>
                )}

                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(16,185,129,0.06)',
                  border: '1px solid rgba(16,185,129,0.15)',
                  borderRadius: 10,
                  fontSize: '0.8rem',
                  color: 'rgba(156,163,175,0.9)',
                  lineHeight: 1.5,
                }}>
                  ✨ <strong style={{ color: '#34d399' }}>How it works:</strong>{' '}
                  After clicking Play, you'll be taken to the {room.gameName} test.
                  Complete the test normally — your score will be automatically posted to this leaderboard.
                  No manual entry needed!
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.infoBox}>
              {room.isExpired ? (
                <>
                  <h3 className={styles.infoBoxTitle}>⏱️ Room Expired</h3>
                  <p className={styles.infoBoxText}>
                    This battle room has expired after 48 hours.{' '}
                    <Link to="/battle" style={{ color: '#34d399' }}>Create a new room →</Link>
                  </p>
                </>
              ) : (
                <>
                  <h3 className={styles.infoBoxTitle}>🔒 Room Full</h3>
                  <p className={styles.infoBoxText}>
                    This room has reached its {room.maxPlayers}-player limit. Check out the final leaderboard below!
                  </p>
                </>
              )}
            </div>
          )}

          {/* ── Live Leaderboard ── */}
          <div className={styles.leaderboardCard}>
            <div className={styles.lbHeader}>
              <div className={styles.lbTitle}>
                {!room.isExpired && <div className={styles.lbLiveDot} />}
                Live Leaderboard
              </div>
              <div className={styles.lbHeaderActions}>
                <button
                  className={styles.lbShareBtn}
                  onClick={() => setIsShareOpen(true)}
                >
                  <Share2 size={13} />
                  Share Board
                </button>
                <span className={styles.lbCount}>
                  {room.playerCount} / {room.maxPlayers} entries
                </span>
              </div>
            </div>

            {room.scores.length === 0 ? (
              <div className={styles.emptyState}>
                <Trophy size={36} style={{ opacity: 0.25, margin: '0 auto 0.75rem', display: 'block' }} />
                <p>No scores yet — be the first to play!</p>
                <p style={{ marginTop: '0.35rem', fontSize: '0.8rem', opacity: 0.6 }}>
                  Enter your name above and play <strong>{room.gameName}</strong> to kick things off.
                </p>
              </div>
            ) : (
              <table className={styles.lbTable}>
                <thead className={styles.lbTHead}>
                  <tr>
                    <th className={styles.lbTh}>Rank</th>
                    <th className={styles.lbTh}>Player</th>
                    <th className={styles.lbTh}>Score {lowerBetter ? '(lower is better)' : '(higher is better)'}</th>
                    <th className={styles.lbTh}>When</th>
                  </tr>
                </thead>
                <tbody>
                  {room.scores.map((entry, idx) => {
                    const rank = idx + 1;
                    const isWinner = rank === 1;
                    const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : undefined;

                    return (
                      <tr
                        key={entry.id}
                        className={`${styles.lbRow} ${isWinner ? styles.lbRowWinner : ''}`}
                      >
                        <td className={styles.lbTd}>
                          {rankEmoji ? (
                            <span style={{ fontSize: '1.2rem' }}>{rankEmoji}</span>
                          ) : (
                            <span className={styles.rankPill}>#{rank}</span>
                          )}
                        </td>
                        <td className={styles.lbTd}>
                          <div className={styles.playerWrap}>
                            <div className={styles.playerAvatar} style={{ background: avatarColor }}>
                              {entry.playerName.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles.playerName}>
                              {entry.playerName}
                              {entry.playerName.toLowerCase() === room.hostName.toLowerCase() && (
                                <span className={styles.hostTag}>Host</span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className={styles.lbTd}>
                          <span className={styles.scoreText}>
                            {formatBattleScore(room.gameId, entry.score)}
                          </span>
                        </td>
                        <td className={styles.lbTd}>
                          <span className={styles.timeText}>{getRelativeTime(entry.createdAt)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Bottom CTAs ── */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsShareOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: '1px solid rgba(52,211,153,0.4)',
                color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                padding: '0.65rem 1.25rem', borderRadius: 12, cursor: 'pointer',
                boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.35)'
              }}
            >
              <Share2 size={15} />
              Share Leaderboard
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                padding: '0.65rem 1.25rem', borderRadius: 12, cursor: 'pointer'
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Link Copied!' : 'Copy Room Link'}
            </button>
            <Link to="/battle" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', fontSize: '0.85rem', fontWeight: 700,
              padding: '0.65rem 1.25rem', borderRadius: 12, textDecoration: 'none'
            }}>
              <Swords size={15} />
              Create New Battle
            </Link>
          </div>

        </div>
      </div>

      {/* ── Share Leaderboard Modal ── */}
      <BattleShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        room={room}
      />
    </>
  );
}
