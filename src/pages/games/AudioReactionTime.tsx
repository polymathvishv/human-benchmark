import { useState, useRef, useEffect, useCallback } from 'react';
import { Headphones, AlertTriangle, Clock, Zap, Target, Volume2, GitFork } from 'lucide-react';
import styles from './AudioReactionTime.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import AudioReactionTimeInfo from './AudioReactionTimeInfo';
import ReactionModeToggle from '../../components/ReactionModeToggle';
import { GAME_FAQS } from '../../data/gameFaqs';
import { useHighScore } from '../../hooks/useHighScore';
import { generateMockPercentile } from '../../services/shareService';

type GameState = 'waiting' | 'ready' | 'stimulus' | 'too_early' | 'attempt_result' | 'result';

// ─── Web Audio API helpers ──────────────────────────────────────
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!sharedAudioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

/**
 * Play an 880 Hz (A5) pure sine tone via the Web Audio API.
 * Uses a 5ms gain ramp to prevent audio clicking.
 * Returns the exact audioContext.currentTime at which the tone starts.
 */
function playBeep(): number {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);

  // 5ms ramp-up to prevent click artifacts
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.35, now + 0.005);
  // Sustain for ~200ms then fade out
  gain.gain.setValueAtTime(0.35, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.4);

  return now;
}

/** Play a short test preview tone */
function playTestSound(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.3);
}

/** Play a buzzer for false starts */
function playBuzzer(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.2);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

/** Play a short result tick */
function playResultTick(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, now); // D5

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

/** Play a victory chord */
function playVictoryChord(): void {
  const ctx = getAudioContext();
  const notes = [440, 554.37, 659.25, 880]; // A Major
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }, idx * 40);
  });
}

// ─── Component ──────────────────────────────────────────────────

export default function AudioReactionTime() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [bestTime, setBestTime] = useState<number>(0);
  const [worstTime, setWorstTime] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);
  const [testSoundPlayed, setTestSoundPlayed] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const autoNextTimeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const audioStartTimeRef = useRef<number>(0);
  const handleInteractionRef = useRef<() => void>(() => {});
  const { saveScore } = useHighScore('audio-reaction-time', false);

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const triggerStimulus = useCallback(() => {
    // Pre-warm audio context
    getAudioContext();
    // Record performance.now() synchronized right before tone emission
    startTimeRef.current = performance.now();
    audioStartTimeRef.current = playBeep();
    setGameState('stimulus');
  }, []);

  const startNextAttempt = useCallback(() => {
    clearAllTimers();
    setGameState('ready');
    // Random delay between 1500ms and 4500ms
    const randomDelay = Math.floor(Math.random() * 3000) + 1500;
    timeoutRef.current = window.setTimeout(triggerStimulus, randomDelay);
  }, [clearAllTimers, triggerStimulus]);

  const handleInteraction = useCallback(() => {
    if (gameState === 'waiting') {
      // Unlock audio context on user gesture
      getAudioContext();
      setAttempts([]);
      startNextAttempt();
    } else if (gameState === 'ready') {
      // Too early — clicked before the beep
      clearAllTimers();
      playBuzzer();
      setGameState('too_early');
    } else if (gameState === 'stimulus') {
      const endTime = performance.now();
      const rawScore = Math.round(endTime - startTimeRef.current);

      // Anticipation check: < 80ms is physically impossible
      if (rawScore < 80) {
        clearAllTimers();
        playBuzzer();
        setGameState('too_early');
        return;
      }

      // Cap extreme lag above 800ms
      const currentScore = Math.min(rawScore, 800);
      const newAttempts = [...attempts, currentScore];
      setAttempts(newAttempts);

      if (newAttempts.length >= 5) {
        clearAllTimers();
        const average = Math.round(newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length);
        const lowest = Math.min(...newAttempts);
        const highest = Math.max(...newAttempts);
        const globalPercentile = generateMockPercentile(average, 'audio-reaction-time', true);

        setScore(average);
        setBestTime(lowest);
        setWorstTime(highest);
        setPercentile(globalPercentile);
        saveScore(average);
        playVictoryChord();
        setGameState('result');
      } else {
        setScore(currentScore);
        playResultTick();
        setGameState('attempt_result');

        // Auto-advance after 1 second
        clearAllTimers();
        autoNextTimeoutRef.current = window.setTimeout(() => {
          startNextAttempt();
        }, 1000);
      }
    } else if (gameState === 'too_early') {
      startNextAttempt();
    } else if (gameState === 'attempt_result') {
      // Allow early tap to skip wait
      startNextAttempt();
    }
  }, [gameState, attempts, clearAllTimers, startNextAttempt, saveScore]);

  // Keep interaction ref updated for key listener
  useEffect(() => {
    handleInteractionRef.current = handleInteraction;
  }, [handleInteraction]);

  // Listen for spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleInteractionRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTestSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    getAudioContext();
    playTestSound();
    setTestSoundPlayed(true);
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${score} ms`}
          label="Average Audio Reaction Time"
          icon={<Headphones size={40} />}
          onRetry={() => {
            clearAllTimers();
            setGameState('waiting');
            setScore(0);
            setBestTime(0);
            setWorstTime(0);
            setPercentile(0);
            setAttempts([]);
          }}
          shareConfig={{
            gameId: 'audio-reaction-time',
            gameName: 'Audio Reaction Time',
            score: score,
            unit: 'ms',
            isLowerBetter: true,
          }}
        >
          {/* ── Four-stat breakdown ── */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{score} ms</span>
              <span className={styles.statLabel}>Average</span>
            </div>
            <div className={`${styles.statCard} ${styles.statBest}`}>
              <span className={styles.statValue}>{bestTime} ms</span>
              <span className={styles.statLabel}>Best</span>
            </div>
            <div className={`${styles.statCard} ${styles.statWorst}`}>
              <span className={styles.statValue}>{worstTime} ms</span>
              <span className={styles.statLabel}>Worst</span>
            </div>
            <div className={`${styles.statCard} ${styles.statPercentile}`}>
              <span className={styles.statValue}>Top {Math.max(1, 100 - percentile)}%</span>
              <span className={styles.statLabel}>Percentile</span>
            </div>
          </div>
          <GameInsight 
            score={score} 
            average={185} 
            isHigherBetter={false}
            fact="Auditory stimuli reach the brain ~30-50ms faster than visual stimuli because the cochlear pathway has fewer synaptic relays. The average audio reaction time is 185ms."
            formatScore={(s) => `${s}ms`}
          />
        </GameResult>
      );
    }

    return (
      <div 
        className={`${styles.gameArea} ${gameState === 'ready' || gameState === 'stimulus' ? styles.active : ''}`}
        onPointerDown={handleInteraction}
      >
        {gameState === 'waiting' && (
          <div className={styles.content}>
            <Headphones size={56} className={styles.icon} />
            <h2>Audio Reaction Time Test</h2>
            <p>Click or press Space the instant you hear the beep.</p>
            <button 
              className={styles.testSoundBtn}
              onClick={handleTestSound}
              type="button"
            >
              <Volume2 size={18} />
              {testSoundPlayed ? 'Sound OK ✓' : 'Test Sound'}
            </button>
            <button className={styles.startButton}>Start Game</button>
          </div>
        )}

        {/* State 1 & State 2: Zero visual cue when sound plays */}
        {(gameState === 'ready' || gameState === 'stimulus') && (
          <div className={styles.content}>
            <div className={styles.waitingPulse} />
            <h2>Wait for the beep...</h2>
            <p className={styles.waitHint}>Keep your eyes closed or look away for a pure auditory reflex test</p>
          </div>
        )}

        {gameState === 'too_early' && (
          <div className={styles.content}>
            <AlertTriangle size={56} className={styles.icon} />
            <h2>Too soon!</h2>
            <p>You clicked before hearing the tone.</p>
            <p className={styles.instruction}>Click to try again.</p>
          </div>
        )}

        {gameState === 'attempt_result' && (
          <div className={styles.content}>
            <Clock size={56} className={styles.icon} />
            <h2>{score} ms</h2>
            <p>Next round starting in 1s...</p>
            <p className={styles.instruction}>Attempt {attempts.length} of 5</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/audio-reaction-time"
      title="Audio Reaction Time Test"
      seoTitle="Audio Reaction Time Test — Free Online Auditory Reflex Benchmark | Human Benchmark"
      seoDescription="Test your auditory reaction time with a pure 880Hz tone. Measure how fast you respond to sound stimuli. Average is 185ms — how fast are your ears? Free instant online test."
      subtitle="Click the instant you hear the beep. We average five attempts for your score."
      category="Speed Test"
      headerAccessory={<ReactionModeToggle currentMode="audio" />}
      heroGradient="linear-gradient(135deg, #1a0533 0%, #2e1065 45%, #4c1d95 75%, #6d28d9 100%)"
      heroTextColor="rgba(196, 181, 253, 0.85)"
      heroAccentColor="rgba(167, 139, 250, 0.7)"
      stats={[
        { value: '185ms', label: 'Global average' },
        { value: '<135ms', label: 'Top 1%' },
        { value: '30-50ms', label: 'Faster than visual' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Choice Reaction Time', path: '/choice-reaction-time', icon: <GitFork size={18} />, color: '#06b6d4' },
        { name: 'Visual Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
        { name: 'Aim Trainer', path: '/aim-trainer', icon: <Target size={18} />, color: '#22c55e' },
      ]}
      aboutText="The Audio Reaction Time test measures your auditory simple reaction time — the delay between hearing a sound and clicking in response. Because sound signals travel a shorter neural pathway (cochlea → brainstem → auditory cortex → motor cortex) with fewer synaptic relays than vision, auditory reaction times are consistently 30–50ms faster than visual ones. The global web average is approximately 185ms. Top performers score under 135ms."
      infoContent={<AudioReactionTimeInfo />}
      faqs={GAME_FAQS['audio-reaction-time']}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
