import { useState, useRef, useEffect, useCallback } from 'react';
import { Palette, Check, X, Brain, Target, Zap, Layers } from 'lucide-react';
import styles from './StroopTest.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import StroopTestInfo from './StroopTestInfo';
import { GAME_FAQS } from '../../data/gameFaqs';
import { useHighScore } from '../../hooks/useHighScore';
import { generateMockPercentile } from '../../services/shareService';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'fixation' | 'stimulus' | 'feedback' | 'result';

interface ColorDef {
  name: 'RED' | 'BLUE' | 'GREEN' | 'YELLOW';
  hex: string;
  key: string;
  num: string;
  btnClass: string;
}

const COLORS: ColorDef[] = [
  { name: 'RED', hex: '#ef4444', key: 'R', num: '1', btnClass: styles.btnRed },
  { name: 'BLUE', hex: '#3b82f6', key: 'B', num: '2', btnClass: styles.btnBlue },
  { name: 'GREEN', hex: '#10b981', key: 'G', num: '3', btnClass: styles.btnGreen },
  { name: 'YELLOW', hex: '#eab308', key: 'Y', num: '4', btnClass: styles.btnYellow },
];

interface StroopTrial {
  id: number;
  word: string;
  inkColor: string;
  inkName: 'RED' | 'BLUE' | 'GREEN' | 'YELLOW';
  isCongruent: boolean;
}

interface TrialResult {
  isCongruent: boolean;
  rt: number;
  isCorrect: boolean;
}

const TOTAL_TRIALS = 24;
const CONGRUENT_COUNT = 10;
const INCONGRUENT_COUNT = 14;

function generateShuffledTrials(): StroopTrial[] {
  const trials: StroopTrial[] = [];
  let id = 1;

  // 1. Generate 10 Congruent Trials
  for (let i = 0; i < CONGRUENT_COUNT; i++) {
    const color = COLORS[i % COLORS.length];
    trials.push({
      id: id++,
      word: color.name,
      inkColor: color.hex,
      inkName: color.name,
      isCongruent: true,
    });
  }

  // 2. Generate 14 Incongruent Trials
  for (let i = 0; i < INCONGRUENT_COUNT; i++) {
    const ink = COLORS[i % COLORS.length];
    // Pick a different word text
    const otherColors = COLORS.filter((c) => c.name !== ink.name);
    const wordColor = otherColors[(i + 1) % otherColors.length];

    trials.push({
      id: id++,
      word: wordColor.name,
      inkColor: ink.hex,
      inkName: ink.name,
      isCongruent: false,
    });
  }

  // 3. Fisher-Yates Shuffle
  for (let i = trials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trials[i], trials[j]] = [trials[j], trials[i]];
  }

  return trials;
}

export default function StroopTest() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [trials, setTrials] = useState<StroopTrial[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [trialResults, setTrialResults] = useState<TrialResult[]>([]);
  const [lastFeedback, setLastFeedback] = useState<boolean | null>(null);

  // Result metrics
  const [compositeScore, setCompositeScore] = useState<number>(0);
  const [congruentSpeed, setCongruentSpeed] = useState<number>(0);
  const [incongruentSpeed, setIncongruentSpeed] = useState<number>(0);
  const [interferenceCost, setInterferenceCost] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);

  const stimulusStartTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const { saveScore } = useHighScore('stroop-test', false);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const showNextTrial = useCallback((index: number, trialList: StroopTrial[]) => {
    clearTimer();
    if (index >= trialList.length) return;

    setCurrentIndex(index);
    setGameState('fixation');

    // 400ms fixation cross
    timeoutRef.current = window.setTimeout(() => {
      setGameState('stimulus');
      stimulusStartTimeRef.current = performance.now();
    }, 400);
  }, [clearTimer]);

  const handleStartTest = useCallback(() => {
    soundService.unlockAudioContext();
    clearTimer();
    const newTrials = generateShuffledTrials();
    setTrials(newTrials);
    setTrialResults([]);
    setCurrentIndex(0);
    setLastFeedback(null);
    setErrorCount(0);
    showNextTrial(0, newTrials);
  }, [clearTimer, showNextTrial]);

  const finishTest = useCallback((results: TrialResult[]) => {
    clearTimer();
    const congruent = results.filter((r) => r.isCongruent);
    const incongruent = results.filter((r) => !r.isCongruent);

    const congAvg = congruent.length > 0
      ? Math.round(congruent.reduce((sum, r) => sum + r.rt, 0) / congruent.length)
      : 560;

    const incongAvg = incongruent.length > 0
      ? Math.round(incongruent.reduce((sum, r) => sum + r.rt, 0) / incongruent.length)
      : 720;

    const interference = incongAvg - congAvg;
    const correctCount = results.filter((r) => r.isCorrect).length;
    const errors = results.length - correctCount;
    const accPct = Math.round((correctCount / results.length) * 100);

    // Primary Leaderboard Metric: Incongruent RT + 50ms penalty per error
    const penaltyMs = errors * 50;
    const finalComposite = Math.round(incongAvg + penaltyMs);

    const calcPercentile = generateMockPercentile(finalComposite, 'stroop-test', true);

    setCompositeScore(finalComposite);
    setCongruentSpeed(congAvg);
    setIncongruentSpeed(incongAvg);
    setInterferenceCost(interference);
    setAccuracy(accPct);
    setErrorCount(errors);
    setPercentile(calcPercentile);

    saveScore(finalComposite);
    soundService.playVictory();
    setGameState('result');
  }, [clearTimer, saveScore]);

  const handleColorChoice = useCallback((selectedColorName: string) => {
    soundService.unlockAudioContext();

    if (gameState === 'waiting') {
      handleStartTest();
      return;
    }

    if (gameState !== 'stimulus') return;

    const latency = Math.round(performance.now() - stimulusStartTimeRef.current);
    const currentTrial = trials[currentIndex];
    if (!currentTrial) return;

    const isCorrect = selectedColorName === currentTrial.inkName;

    if (isCorrect) {
      soundService.playReactionResult();
    } else {
      soundService.playReactionEarly();
    }

    setLastFeedback(isCorrect);
    setGameState('feedback');

    const updatedResults = [
      ...trialResults,
      { isCongruent: currentTrial.isCongruent, rt: latency, isCorrect },
    ];
    setTrialResults(updatedResults);

    // Immediate 250ms visual feedback
    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      const nextIdx = currentIndex + 1;
      if (nextIdx >= TOTAL_TRIALS) {
        finishTest(updatedResults);
      } else {
        showNextTrial(nextIdx, trials);
      }
    }, 250);
  }, [
    gameState,
    currentIndex,
    trials,
    trialResults,
    clearTimer,
    handleStartTest,
    showNextTrial,
    finishTest,
  ]);

  // Keyboard controls listener (R, B, G, Y or 1, 2, 3, 4, and Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        if (gameState === 'waiting' || gameState === 'result') {
          e.preventDefault();
          handleStartTest();
          return;
        }
      }

      if (gameState !== 'stimulus') return;

      const key = e.key.toUpperCase();
      let colorChosen: string | null = null;

      if (key === 'R' || key === '1') colorChosen = 'RED';
      else if (key === 'B' || key === '2') colorChosen = 'BLUE';
      else if (key === 'G' || key === '3') colorChosen = 'GREEN';
      else if (key === 'Y' || key === '4') colorChosen = 'YELLOW';

      if (colorChosen) {
        e.preventDefault();
        handleColorChoice(colorChosen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleStartTest, handleColorChoice]);

  const currentTrial = trials[currentIndex];

  const renderGameContent = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${compositeScore} ms`}
          label="Composite Stroop Score"
          icon={<Palette size={40} />}
          onRetry={handleStartTest}
          shareConfig={{
            gameId: 'stroop-test',
            gameName: 'Stroop Effect Test',
            score: compositeScore,
            unit: 'ms',
            isLowerBetter: true,
            percentile: percentile,
          }}
        >
          {/* ── 4-Stat Performance Grid ── */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard} ${styles.statCongruent}`}>
              <span className={styles.statValue}>{congruentSpeed} ms</span>
              <span className={styles.statLabel}>Congruent (Reading)</span>
            </div>
            <div className={`${styles.statCard} ${styles.statIncongruent}`}>
              <span className={styles.statValue}>{incongruentSpeed} ms</span>
              <span className={styles.statLabel}>Incongruent (Inhibition)</span>
            </div>
            <div className={`${styles.statCard} ${styles.statInterference}`}>
              <span className={styles.statValue}>
                {interferenceCost >= 0 ? `+${interferenceCost}` : interferenceCost} ms
              </span>
              <span className={styles.statLabel}>Interference Cost</span>
            </div>
            <div className={`${styles.statCard} ${styles.statAccuracy}`}>
              <span className={styles.statValue}>{accuracy}%</span>
              <span className={styles.statLabel}>Accuracy ({TOTAL_TRIALS - errorCount}/{TOTAL_TRIALS})</span>
            </div>
          </div>

          {/* ── Anterior Cingulate Cortex (ACC) Neuroscience Breakdown ── */}
          <div className={styles.accCard}>
            <div className={styles.accHeader}>
              <div className={styles.accTitle}>
                <Brain size={18} color="#f43f5e" />
                <span>Executive Inhibition &amp; Conflict Cost</span>
              </div>
              <span className={styles.accBadge}>
                {interferenceCost >= 0 ? `+${interferenceCost} ms Interference` : `${interferenceCost} ms`}
              </span>
            </div>

            <div className={styles.accGrid}>
              <div className={styles.accMetric}>
                <span className={styles.accMetricLabel}>Automatic Baseline</span>
                <span className={styles.accMetricValue} style={{ color: '#15803d' }}>
                  {congruentSpeed} ms
                </span>
              </div>
              <div className={styles.accMetric}>
                <span className={styles.accMetricLabel}>Suppression Latency</span>
                <span className={styles.accMetricValue} style={{ color: '#e11d48' }}>
                  {incongruentSpeed} ms
                </span>
              </div>
              <div className={styles.accMetric}>
                <span className={styles.accMetricLabel}>Leaderboard Composite</span>
                <span className={styles.accMetricValue} style={{ color: '#b45309' }}>
                  {compositeScore} ms
                </span>
              </div>
            </div>

            <p className={styles.accExplanation}>
              Your <strong>Anterior Cingulate Cortex (ACC)</strong> and <strong>dlPFC</strong> expended a{' '}
              <strong style={{ color: '#be123c' }}>
                {interferenceCost >= 0 ? `+${interferenceCost}ms` : `${interferenceCost}ms`}
              </strong>{' '}
              latency penalty to override the prepotent reading impulse before naming the physical ink color.
              {errorCount > 0 && ` (${errorCount} error penalty: +${errorCount * 50}ms included in composite).`}
            </p>
          </div>

          <GameInsight
            score={compositeScore}
            average={720}
            isHigherBetter={false}
            fact="In the classic 1935 Stroop experiment, naming conflicting ink colors took ~74% longer than naming color patches. The average healthy adult experiences +160ms of cognitive interference."
            formatScore={(s) => `${s}ms`}
          />
        </GameResult>
      );
    }

    return (
      <div className={`${styles.gameArea} ${gameState !== 'waiting' ? styles.active : ''}`}>
        {gameState === 'waiting' ? (
          <div className={styles.content}>
            <Palette size={52} className={styles.icon} />
            <h2>The Stroop Effect Test</h2>
            <p>
              Test executive inhibition and selective attention. Select the <strong>INK COLOR</strong> of the word as fast as possible, ignoring what the word spells.
            </p>

            <div className={styles.ruleBanner}>
              <span>Rule: Choose the <span className={styles.ruleHighlight}>INK COLOR</span>, NOT the word!</span>
            </div>

            {/* Preview stage */}
            <div className={styles.stageCard} aria-hidden="true">
              <span className={styles.stimulusWord} style={{ color: '#3b82f6' }}>
                RED
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '-0.5rem 0 0' }}>
              Example: The word says "RED" in Blue ink $\to$ Correct answer is <strong>BLUE</strong>.
            </p>

            <button className={styles.startButton} onClick={handleStartTest} type="button">
              Start Test (24 Trials)
            </button>

            {/* 4 Preview Buttons */}
            <div className={styles.buttonsGrid} aria-hidden="true">
              {COLORS.map((col) => (
                <div key={col.name} className={`${styles.colorButton} ${col.btnClass}`}>
                  <div className={styles.btnColorDot} style={{ background: col.hex }} />
                  <span className={styles.btnTitle}>{col.name}</span>
                  <span className={styles.btnKbdHint}>Key: {col.num} / {col.key}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {/* ── HUD Status Bar ── */}
            <div className={styles.hudBar}>
              <div className={styles.hudItem}>
                <span>Trial:</span>
                <span className={styles.hudValueAccent}>
                  {currentIndex + 1} / {TOTAL_TRIALS}
                </span>
              </div>
              <div className={styles.hudItem}>
                <span>Rule:</span>
                <span style={{ color: '#ffffff' }}>Identify INK COLOR</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBarFill}
                style={{
                  width: `${((currentIndex + (gameState === 'feedback' ? 1 : 0)) / TOTAL_TRIALS) * 100}%`,
                }}
              />
            </div>

            {/* ── Central Stage (Fixation vs. Stimulus Word vs. Feedback) ── */}
            <div className={styles.stageCard} role="region" aria-live="assertive">
              {gameState === 'fixation' && (
                <div className={styles.fixationCross}>+</div>
              )}

              {gameState === 'stimulus' && currentTrial && (
                <span
                  className={styles.stimulusWord}
                  style={{
                    color: currentTrial.inkColor,
                    textShadow: `0 4px 20px ${currentTrial.inkColor}60`,
                  }}
                >
                  {currentTrial.word}
                </span>
              )}

              {gameState === 'feedback' && (
                <div className={styles.feedbackOverlay}>
                  {lastFeedback ? (
                    <Check size={56} className={styles.feedbackCorrect} />
                  ) : (
                    <X size={56} className={styles.feedbackWrong} />
                  )}
                </div>
              )}
            </div>

            {/* ── 4 Color Response Buttons ── */}
            <div className={styles.buttonsGrid} role="group" aria-label="Ink color choices">
              {COLORS.map((col) => (
                <button
                  key={col.name}
                  type="button"
                  className={`${styles.colorButton} ${col.btnClass}`}
                  disabled={gameState !== 'stimulus'}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleColorChoice(col.name);
                  }}
                  aria-label={`Select ${col.name} ink (Keyboard: ${col.num} or ${col.key})`}
                >
                  <div className={styles.btnColorDot} style={{ background: col.hex }} />
                  <span className={styles.btnTitle}>{col.name}</span>
                  <span className={styles.btnKbdHint}>Key: {col.num} / {col.key}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/stroop-test"
      gameId="stroop-test"
      title="The Stroop Effect Test"
      seoTitle="Stroop Effect Test — Free Online Cognitive Interference Benchmark | Human Benchmark"
      seoDescription="Measure your executive inhibition and selective attention with the classic 4-color Stroop Test. Calculate your Stroop interference cost and anterior cingulate control in milliseconds."
      subtitle="Name the ink color while ignoring what the word spells. We measure your cognitive inhibition across 24 randomized trials."
      category="Executive Function Benchmark"
      heroGradient="linear-gradient(135deg, #1f082e 0%, #360f4e 45%, #581c87 75%, #7e22ce 100%)"
      heroTextColor="rgba(243, 232, 255, 0.88)"
      heroAccentColor="rgba(216, 180, 254, 0.75)"
      stats={[
        { value: '~720ms', label: 'Incongruent Median' },
        { value: '+160ms', label: 'Average Interference' },
        { value: '<560ms', label: 'Top 10% Composite' },
        { value: 'Free', label: 'No sign-up required' },
      ]}
      relatedTests={[
        { name: 'Choice Reaction Time', path: '/choice-reaction-time', icon: <Zap size={18} />, color: '#06b6d4' },
        { name: 'Visual Memory', path: '/visual-memory', icon: <Layers size={18} />, color: '#14b8a6' },
        { name: 'Aim Trainer', path: '/aim-trainer', icon: <Target size={18} />, color: '#22c55e' },
      ]}
      aboutText="The Stroop Effect Test measures executive inhibitory control and selective attention. When the semantic meaning of a word conflicts with the color of its font, your Anterior Cingulate Cortex (ACC) and Dorsolateral Prefrontal Cortex (dlPFC) must expend additional mental effort to override automatic reading. The test records your congruent speed, incongruent speed, and net Stroop Interference Cost across 24 randomized trials."
      infoContent={<StroopTestInfo />}
      faqs={GAME_FAQS['stroop-test']}
    >
      {renderGameContent()}
    </GamePageLayout>
  );
}
