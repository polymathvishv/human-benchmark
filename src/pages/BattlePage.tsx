import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Swords, Zap, Grid3x3, Target, Hash, MessageSquare,
  Smile, Layers, Keyboard, Smartphone, Users, Clock, Trophy
} from 'lucide-react';
import { createBattleRoom } from '../services/battleService';
import SEO from '../components/SEO';
import styles from './BattlePage.module.css';

const TESTS = [
  { id: 'reaction-time', name: 'Reaction Time', emoji: '⚡', path: '/reaction-time', icon: Zap, time: '~1 min' },
  { id: 'aim-trainer', name: 'Aim Trainer', emoji: '🎯', path: '/aim-trainer', icon: Target, time: '~1 min' },
  { id: 'typing', name: 'Typing Test', emoji: '⌨️', path: '/typing', icon: Keyboard, time: '~1 min' },
  { id: 'mobile-typing', name: 'Mobile Typing', emoji: '📱', path: '/mobile-typing', icon: Smartphone, time: '~1 min' },
  { id: 'sequence-memory', name: 'Sequence Memory', emoji: '🧠', path: '/sequence-memory', icon: Grid3x3, time: '~3 min' },
  { id: 'visual-memory', name: 'Visual Memory', emoji: '👁', path: '/visual-memory', icon: Layers, time: '~3 min' },
  { id: 'number-memory', name: 'Number Memory', emoji: '🔢', path: '/number-memory', icon: Hash, time: '~2 min' },
  { id: 'verbal-memory', name: 'Verbal Memory', emoji: '📝', path: '/verbal-memory', icon: MessageSquare, time: '~3 min' },
  { id: 'chimp-test', name: 'Chimp Test', emoji: '🐒', path: '/chimp-test', icon: Smile, time: '~2 min' },
];

const HOW_IT_WORKS = [
  {
    n: 1,
    title: 'Create a room',
    desc: 'Pick any test, enter your name, and hit Create. You get a unique shareable link instantly.',
  },
  {
    n: 2,
    title: 'Share the link',
    desc: 'Send it via WhatsApp, Telegram, Discord, iMessage — anywhere. No accounts needed.',
  },
  {
    n: 3,
    title: 'Everyone plays',
    desc: 'Each friend opens the link, plays the test, and enters their score in the room.',
  },
  {
    n: 4,
    title: 'Live leaderboard',
    desc: 'Scores appear in real-time. The room ranks all players automatically as they submit.',
  },
];

export default function BattlePage() {
  const [hostName, setHostName] = useState('');
  const [selectedTest, setSelectedTest] = useState<typeof TESTS[0] | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!selectedTest) {
      setError('Please select a test to battle on.');
      return;
    }
    setCreating(true);
    setError('');

    const result = await createBattleRoom(
      hostName.trim() || 'Host',
      selectedTest.id,
      selectedTest.name
    );

    setCreating(false);
    if (!result) {
      setError('Something went wrong. Please try again.');
      return;
    }
    navigate(`/battle/${result.roomCode}`);
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cognitive Test Battles — Human Benchmark',
    description: 'Create a free battle room, pick a cognitive test, and challenge up to 10 friends. Live leaderboard, no sign-in required.',
    url: 'https://humanbenchmark.in/battle',
  };

  return (
    <>
      <SEO
        title="Cognitive Test Battles — Challenge Friends | Human Benchmark"
        description="Create a free battle room, pick from 9 cognitive tests, and challenge up to 10 friends. Live leaderboard, no account required."
        canonical="https://humanbenchmark.in/battle"
        keywords="human benchmark battle, cognitive test battle, reaction time challenge friends, multiplayer brain test"
        jsonLd={schema}
      />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Swords size={12} />
            Multiplayer Cognitive Testing
          </div>
          <h1 className={styles.heroTitle}>Cognitive Test Battles</h1>
          <p className={styles.heroSubtitle}>
            Challenge up to 10 friends on any cognitive test. One link, live leaderboard, no sign-in required.
          </p>
          <div className={styles.heroTags}>
            <a href="#create" className={styles.heroTag}>Create a Room</a>
            <a href="#how-it-works" className={styles.heroTag}>How It Works</a>
            <Link to="/leaderboard" className={styles.heroTag}>Global Leaderboards</Link>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className={styles.statsStrip}>
        <div className={styles.statsGrid}>
          <div>
            <div className={styles.statNumber}>9</div>
            <div className={styles.statLabel}>Tests available</div>
          </div>
          <div>
            <div className={styles.statNumber}>10</div>
            <div className={styles.statLabel}>Max players per room</div>
          </div>
          <div>
            <div className={styles.statNumber}>48h</div>
            <div className={styles.statLabel}>Room lifetime</div>
          </div>
          <div>
            <div className={styles.statNumber}>Free</div>
            <div className={styles.statLabel}>No account needed</div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className={styles.mainArea}>
        <div className={styles.mainInner}>

          {/* ── Create + How It Works ── */}
          <section id="create" className={styles.createGrid}>

            {/* Form */}
            <div>
              <p className={styles.sectionLabel}>Step 1</p>
              <h2 className={styles.sectionTitle}>Create Your Battle Room</h2>

              <div className={styles.formCard}>
                <div className={styles.formCardAccent} />
                <div className={styles.formBody}>

                  {/* Host name */}
                  <div>
                    <label className={styles.formLabel}>Your name</label>
                    <input
                      id="battle-host-name"
                      type="text"
                      className={styles.nameInput}
                      placeholder="e.g. Alex"
                      maxLength={30}
                      value={hostName}
                      onChange={e => setHostName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleCreate()}
                    />
                  </div>

                  {/* Test Picker */}
                  <div>
                    <label className={styles.formLabel}>Choose a test</label>
                    <div className={styles.testGrid}>
                      {TESTS.map(test => (
                        <button
                          key={test.id}
                          type="button"
                          className={`${styles.testBtn} ${selectedTest?.id === test.id ? styles.testBtnActive : ''}`}
                          onClick={() => { setSelectedTest(test); setError(''); }}
                          title={test.time}
                        >
                          <span className={styles.testBtnEmoji}>{test.emoji}</span>
                          <span>{test.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p className={styles.createError}>{error}</p>}

                  <button
                    id="create-battle-btn"
                    className={styles.createBtn}
                    onClick={handleCreate}
                    disabled={creating}
                  >
                    {creating ? 'Creating room…' : '⚔️ Create Battle Room'}
                  </button>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div id="how-it-works">
              <p className={styles.sectionLabel}>Steps 2 – 4</p>
              <h2 className={styles.sectionTitle}>How It Works</h2>

              <div className={styles.howSteps}>
                {HOW_IT_WORKS.map(step => (
                  <div key={step.n} className={styles.howStep}>
                    <span className={styles.stepNumber}>{step.n}</span>
                    <div>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Battle Room Rules ── */}
          <section>
            <p className={styles.sectionLabel}>Battle Room Rules</p>
            <h2 className={styles.sectionTitle}>What You Need to Know</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                {
                  icon: <Users size={18} color="#34d399" />,
                  title: 'Up to 10 players',
                  desc: 'Each room accepts up to 10 score submissions. Once full, no more entries are accepted.',
                },
                {
                  icon: <Clock size={18} color="#34d399" />,
                  title: '48-hour window',
                  desc: 'Rooms expire after 48 hours. All participants should complete the test within that window.',
                },
                {
                  icon: <Trophy size={18} color="#34d399" />,
                  title: 'One score per name',
                  desc: 'Each player name can only appear once on the battle leaderboard. Choose your name carefully.',
                },
                {
                  icon: <Swords size={18} color="#34d399" />,
                  title: 'Honest scoring',
                  desc: 'Scores are self-reported after playing the test. Battle rooms work best with trusted friend groups.',
                },
              ].map((rule, i) => (
                <div key={i} style={{
                  background: '#0f1117',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {rule.icon}
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{rule.title}</span>
                  </div>
                  <p style={{ color: 'rgba(156,163,175,0.85)', fontSize: '0.8rem', lineHeight: 1.55 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
