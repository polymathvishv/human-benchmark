import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GitFork, AlertTriangle, Zap, Target, Headphones, Brain } from 'lucide-react';
import styles from './ChoiceReactionTime.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import ChoiceReactionTimeInfo from './ChoiceReactionTimeInfo';
import ReactionModeToggle from '../../components/ReactionModeToggle';
import { GAME_FAQS } from '../../data/gameFaqs';
import { useHighScore, getHighScore } from '../../hooks/useHighScore';
import { generateMockPercentile } from '../../services/shareService';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'ready' | 'stimulus' | 'error_flash' | 'anticipation_warning' | 'result';

interface PodConfig {
  key: string;
  finger: string;
  hand: string;
}

const PODS: PodConfig[] = [
  { key: 'D', finger: 'Left Mid', hand: 'Left' },
  { key: 'F', finger: 'Left Idx', hand: 'Left' },
  { key: 'J', finger: 'Right Idx', hand: 'Right' },
  { key: 'K', finger: 'Right Mid', hand: 'Right' },
];

const TOTAL_VALID_TRIALS_REQUIRED = 15;

export default function ChoiceReactionTime() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [activeTarget, setActiveTarget] = useState<number | null>(null);
  const [wrongTarget, setWrongTarget] = useState<number | null>(null);
  const [correctTarget, setCorrectTarget] = useState<number | null>(null);
  const [validTrials, setValidTrials] = useState<number[]>([]);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [lastRT, setLastRT] = useState<number | null>(null);

  // Result stats
  const [meanScore, setMeanScore] = useState<number>(0);
  const [bestTrialTime, setBestTrialTime] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);
  const [simpleRT, setSimpleRT] = useState<number | null>(null);

  const timeoutRef = useRef<number | null>(null);
  const nextTrialTimeoutRef = useRef<number | null>(null);
  const stimulusStartTimeRef = useRef<number>(0);
  const lastTargetRef = useRef<number | null>(null);

  const { saveScore } = useHighScore('choice-reaction-time', false);

  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (nextTrialTimeoutRef.current) {
      clearTimeout(nextTrialTimeoutRef.current);
      nextTrialTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // Pick a random target pod, avoiding long repetitive streaks
  const pickRandomTarget = useCallback((): number => {
    let next: number;
    let attempts = 0;
    do {
      next = Math.floor(Math.random() * 4);
      attempts++;
    } while (next === lastTargetRef.current && attempts < 3);
    lastTargetRef.current = next;
    return next;
  }, []);

  const triggerStimulus = useCallback(() => {
    clearAllTimers();
    const targetIdx = pickRandomTarget();
    setActiveTarget(targetIdx);
    setWrongTarget(null);
    setCorrectTarget(null);
    setGameState('stimulus');
    stimulusStartTimeRef.current = performance.now();
    soundService.playReactionGreen();
  }, [clearAllTimers, pickRandomTarget]);

  const scheduleNextTrial = useCallback((delayMs?: number) => {
    clearAllTimers();
    setGameState('ready');
    setActiveTarget(null);
    setWrongTarget(null);
    setCorrectTarget(null);

    // Randomized inter-trial interval between 1000ms and 2500ms
    const randomizedITI = delayMs ?? Math.floor(Math.random() * 1500) + 1000;
    timeoutRef.current = window.setTimeout(() => {
      triggerStimulus();
    }, randomizedITI);
  }, [clearAllTimers, triggerStimulus]);

  const handleStartTest = useCallback(() => {
    soundService.unlockAudioContext();
    clearAllTimers();
    setValidTrials([]);
    setTotalAttempts(0);
    setErrorCount(0);
    setLastRT(null);
    lastTargetRef.current = null;
    scheduleNextTrial(1200);
  }, [clearAllTimers, scheduleNextTrial]);

  const finishTest = useCallback((finalValid: number[]) => {
    clearAllTimers();
    const mean = Math.round(finalValid.reduce((a, b) => a + b, 0) / finalValid.length);
    const best = Math.min(...finalValid);
    const calcPercentile = generateMockPercentile(mean, 'choice-reaction-time', true);

    // Check if user has a saved Simple Reaction Time score
    const savedSimple = getHighScore('reaction-time');
    setSimpleRT(savedSimple);

    setMeanScore(mean);
    setBestTrialTime(best);
    setPercentile(calcPercentile);
    saveScore(mean);
    soundService.playVictory();
    setGameState('result');
  }, [clearAllTimers, saveScore]);

  const handlePodPress = useCallback((podIndex: number) => {
    soundService.unlockAudioContext();

    // 1. If test hasn't started, start it
    if (gameState === 'waiting') {
      handleStartTest();
      return;
    }

    // 2. If clicked before stimulus (false start)
    if (gameState === 'ready') {
      clearAllTimers();
      soundService.playReactionEarly();
      setGameState('anticipation_warning');
      nextTrialTimeoutRef.current = window.setTimeout(() => {
        scheduleNextTrial(1000);
      }, 900);
      return;
    }

    // 3. If in active stimulus state
    if (gameState === 'stimulus') {
      const responseTime = performance.now();
      const rawRT = Math.round(responseTime - stimulusStartTimeRef.current);

      // Rejection of Anticipation inputs (<120ms)
      if (rawRT < 120) {
        clearAllTimers();
        soundService.playReactionEarly();
        setGameState('anticipation_warning');
        nextTrialTimeoutRef.current = window.setTimeout(() => {
          scheduleNextTrial(1000);
        }, 900);
        return;
      }

      setTotalAttempts((prev) => prev + 1);

      // Check if user chose correctly
      if (podIndex === activeTarget) {
        // CORRECT CHOICE!
        soundService.playReactionResult();
        setCorrectTarget(podIndex);
        setLastRT(rawRT);
        const updatedValid = [...validTrials, rawRT];
        setValidTrials(updatedValid);

        if (updatedValid.length >= TOTAL_VALID_TRIALS_REQUIRED) {
          finishTest(updatedValid);
        } else {
          // Transition quickly to next trial
          clearAllTimers();
          nextTrialTimeoutRef.current = window.setTimeout(() => {
            scheduleNextTrial();
          }, 350);
        }
      } else {
        // WRONG CHOICE!
        soundService.playReactionEarly();
        setErrorCount((prev) => prev + 1);
        setWrongTarget(podIndex);
        setGameState('error_flash');

        // Penalty delay & repeat trial so user still finishes 15 valid correct responses
        clearAllTimers();
        nextTrialTimeoutRef.current = window.setTimeout(() => {
          scheduleNextTrial(1200);
        }, 750);
      }
    }
  }, [
    gameState,
    activeTarget,
    validTrials,
    clearAllTimers,
    handleStartTest,
    scheduleNextTrial,
    finishTest,
  ]);

  // Keyboard controls listener (D, F, J, K and Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to start / retry
      if (e.code === 'Space' || e.key === ' ') {
        if (gameState === 'waiting') {
          e.preventDefault();
          handleStartTest();
          return;
        }
        if (gameState === 'result') {
          e.preventDefault();
          handleStartTest();
          return;
        }
      }

      const key = e.key.toUpperCase();
      let podIndex = -1;
      if (key === 'D' || e.code === 'KeyD') podIndex = 0;
      else if (key === 'F' || e.code === 'KeyF') podIndex = 1;
      else if (key === 'J' || e.code === 'KeyJ') podIndex = 2;
      else if (key === 'K' || e.code === 'KeyK') podIndex = 3;

      if (podIndex !== -1) {
        e.preventDefault();
        handlePodPress(podIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleStartTest, handlePodPress]);

  // Accuracy calculation
  const accuracyPercentage = totalAttempts > 0
    ? Math.round((validTrials.length / totalAttempts) * 100)
    : 100;

  // Decision overhead (Choice RT - Simple RT)
  const decisionOverhead = simpleRT !== null ? meanScore - simpleRT : null;

  const renderGameContent = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${meanScore} ms`}
          label="Average Choice Reaction Time"
          icon={<GitFork size={40} />}
          onRetry={handleStartTest}
          shareConfig={{
            gameId: 'choice-reaction-time',
            gameName: "Choice Reaction Time (Hick's Law)",
            score: meanScore,
            unit: 'ms',
            isLowerBetter: true,
            percentile: percentile,
          }}
        >
          {/* ── 4-Stat Performance Grid ── */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{meanScore} ms</span>
              <span className={styles.statLabel}>Choice RT</span>
            </div>
            <div className={`${styles.statCard} ${styles.statAccuracy}`}>
              <span className={styles.statValue}>{accuracyPercentage}%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
            <div className={`${styles.statCard} ${styles.statBest}`}>
              <span className={styles.statValue}>{bestTrialTime} ms</span>
              <span className={styles.statLabel}>Best Trial</span>
            </div>
            <div className={`${styles.statCard} ${styles.statPercentile}`}>
              <span className={styles.statValue}>Top {Math.max(1, 100 - percentile)}%</span>
              <span className={styles.statLabel}>Percentile</span>
            </div>
          </div>

          {/* ── Hick's Law Decision Overhead Breakdown ── */}
          <div className={styles.overheadCard}>
            <div className={styles.overheadHeader}>
              <div className={styles.overheadTitle}>
                <Brain size={18} color="#06b6d4" />
                <span>Hick's Law Decision Overhead</span>
              </div>
              <span className={styles.overheadBadge}>
                {decisionOverhead !== null
                  ? decisionOverhead >= 0
                    ? `+${decisionOverhead} ms Overhead`
                    : `${decisionOverhead} ms`
                  : '4-Choice vs 1-Choice'}
              </span>
            </div>

            {simpleRT !== null && decisionOverhead !== null ? (
              <>
                <div className={styles.overheadGrid}>
                  <div className={styles.overheadMetric}>
                    <span className={styles.overheadMetricLabel}>Simple RT (1 Option)</span>
                    <span className={styles.overheadMetricValue}>{simpleRT} ms</span>
                  </div>
                  <div className={styles.overheadMetric}>
                    <span className={styles.overheadMetricLabel}>Choice RT (4 Options)</span>
                    <span className={styles.overheadMetricValue}>{meanScore} ms</span>
                  </div>
                  <div className={styles.overheadMetric}>
                    <span className={styles.overheadMetricLabel}>Decision Processing</span>
                    <span className={styles.overheadMetricValue} style={{ color: '#0d9488' }}>
                      {decisionOverhead >= 0 ? `+${decisionOverhead}` : `${decisionOverhead}`} ms
                    </span>
                  </div>
                </div>
                <p className={styles.overheadExplanation}>
                  {decisionOverhead >= 0
                    ? `Your prefrontal decision processing stage costs +${decisionOverhead}ms to discriminate among 4 options and select the correct motor program (2 bits of entropy).`
                    : `Your choice reaction time was recorded faster than your stored simple reaction time. Consider taking a fresh Simple Reaction Time test to calibrate.`}
                </p>
              </>
            ) : (
              <p className={styles.overheadExplanation}>
                Want to see your exact Hick's Law decision overhead?{' '}
                <Link to="/reaction-time" className={styles.simpleRtLink}>
                  Take the Simple Reaction Time Test →
                </Link>{' '}
                We will automatically calculate your precise cortical processing latency.
              </p>
            )}
          </div>

          <GameInsight
            score={meanScore}
            average={370}
            isHigherBetter={false}
            fact="According to Hick's Law, choice reaction time scales logarithmically with information entropy: RT = a + b·log₂(n+1). For 4 choices (2 bits), the average adult decision penalty is roughly +97ms."
            formatScore={(s) => `${s}ms`}
          />
        </GameResult>
      );
    }

    return (
      <div
        className={`${styles.gameArea} ${gameState !== 'waiting' ? styles.active : ''} ${
          gameState === 'error_flash' ? styles.errorFlash : ''
        }`}
      >
        {gameState === 'waiting' ? (
          <div className={styles.content}>
            <GitFork size={52} className={styles.icon} />
            <h2>Choice Reaction Time Test</h2>
            <p>
              Measure how multiple choices slow your reaction speed. When one of the four pods lights up, press its matching key or tap it as quickly and accurately as possible.
            </p>

            <div className={styles.podsGrid} aria-hidden="true">
              {PODS.map((pod) => (
                <div key={pod.key} className={styles.pod}>
                  <div className={styles.podBulb} />
                  <span className={styles.podKey}>{pod.key}</span>
                  <span className={styles.podFinger}>{pod.finger}</span>
                </div>
              ))}
            </div>

            <button className={styles.startButton} onClick={handleStartTest} type="button">
              Start Test (15 Trials)
            </button>

            <div className={styles.desktopKeyHints}>
              <span>Desktop: Use keys</span>
              <kbd className={styles.kbd}>D</kbd>
              <kbd className={styles.kbd}>F</kbd>
              <kbd className={styles.kbd}>J</kbd>
              <kbd className={styles.kbd}>K</kbd>
              <span>— Mobile: Tap targets directly</span>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {/* ── HUD Status Bar ── */}
            <div className={styles.hudBar}>
              <div className={styles.hudItem}>
                <span>Trial:</span>
                <span className={styles.hudValueAccent}>
                  {validTrials.length} / {TOTAL_VALID_TRIALS_REQUIRED}
                </span>
                {errorCount > 0 && (
                  <span style={{ color: '#f87171', fontSize: '0.78rem' }}>
                    ({errorCount} repeat{errorCount > 1 ? 's' : ''})
                  </span>
                )}
              </div>

              <div className={styles.hudItem}>
                <span>Accuracy:</span>
                <span className={styles.hudValue}>{accuracyPercentage}%</span>
              </div>

              {lastRT !== null && (
                <div className={styles.hudItem}>
                  <span>Last:</span>
                  <span className={styles.hudValue}>{lastRT}ms</span>
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBarFill}
                style={{
                  width: `${(validTrials.length / TOTAL_VALID_TRIALS_REQUIRED) * 100}%`,
                }}
              />
            </div>

            {/* ── Status Cue ── */}
            <div className={styles.statusMessage}>
              {gameState === 'ready' && (
                <span className={styles.statusWaiting}>Wait for a target to illuminate...</span>
              )}
              {gameState === 'stimulus' && (
                <span className={styles.statusStimulus}>PRESS MATCHING TARGET!</span>
              )}
              {gameState === 'error_flash' && (
                <span className={styles.statusError}>
                  <AlertTriangle size={16} /> Wrong key! +1 repeat trial added
                </span>
              )}
              {gameState === 'anticipation_warning' && (
                <span className={styles.statusAnticipation}>
                  <AlertTriangle size={16} /> Too fast! Anticipation (&lt;120ms) rejected
                </span>
              )}
            </div>

            {/* ── 4 Pods Array ── */}
            <div className={styles.podsGrid} role="group" aria-label="Target choices">
              {PODS.map((pod, idx) => {
                const isIlluminated = gameState === 'stimulus' && activeTarget === idx;
                const isWrong = gameState === 'error_flash' && wrongTarget === idx;
                const isCorrect = correctTarget === idx;

                return (
                  <button
                    key={pod.key}
                    type="button"
                    className={`${styles.pod} ${isIlluminated ? styles.podActive : ''} ${
                      isWrong ? styles.podError : ''
                    } ${isCorrect ? styles.podCorrect : ''}`}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handlePodPress(idx);
                    }}
                    aria-label={`Target pod ${pod.key} (${pod.finger})`}
                  >
                    <div className={styles.podBulb} />
                    <span className={styles.podKey}>{pod.key}</span>
                    <span className={styles.podFinger}>{pod.finger}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.desktopKeyHints}>
              <span>Keys:</span>
              <kbd className={styles.kbd}>D</kbd>
              <kbd className={styles.kbd}>F</kbd>
              <kbd className={styles.kbd}>J</kbd>
              <kbd className={styles.kbd}>K</kbd>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/choice-reaction-time"
      gameId="choice-reaction-time"
      title="Choice Reaction Time Test (Hick's Law)"
      seoTitle="Choice Reaction Time Test — Hick's Law Decision Speed Benchmark | Human Benchmark"
      seoDescription="Measure how decision complexity slows down your reaction time using Hick's Law. Test 4-choice visual processing speed, accuracy, and mental overhead. Free online benchmark."
      subtitle="React as fast as possible to four distinct targets. We measure your decision overhead across 15 trials using Hick's Law."
      category="Cognitive Speed Benchmark"
      headerAccessory={<ReactionModeToggle currentMode="choice" />}
      heroGradient="linear-gradient(135deg, #082032 0%, #0e3a53 45%, #155e75 75%, #0891b2 100%)"
      heroTextColor="rgba(207, 250, 254, 0.88)"
      heroAccentColor="rgba(103, 232, 249, 0.75)"
      stats={[
        { value: '370ms', label: 'Global 4-choice median' },
        { value: '<290ms', label: 'Top 10% decision speed' },
        { value: '2 Bits', label: 'Entropy (4 choices)' },
        { value: 'Free', label: 'No sign-up required' },
      ]}
      relatedTests={[
        { name: 'Visual Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
        { name: 'Audio Reaction Time', path: '/audio-reaction-time', icon: <Headphones size={18} />, color: '#8b5cf6' },
        { name: 'Aim Trainer', path: '/aim-trainer', icon: <Target size={18} />, color: '#22c55e' },
      ]}
      aboutText="The Choice Reaction Time Test measures cognitive decision latency governed by Hick's Law (RT = a + b · log₂(n+1)). While Simple Reaction Time only requires sensory detection (~273ms), Choice Reaction Time requires stimulus discrimination and motor response selection across multiple alternatives. The global web median for 4 choices (2 bits of entropy) is approximately 370ms. Your result automatically calculates your exact mental decision overhead."
      infoContent={<ChoiceReactionTimeInfo />}
      faqs={GAME_FAQS['choice-reaction-time']}
    >
      {renderGameContent()}
    </GamePageLayout>
  );
}
