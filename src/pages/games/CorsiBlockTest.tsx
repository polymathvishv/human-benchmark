import { useState, useEffect, useRef, useCallback } from 'react';
import { Boxes, ArrowRight, RotateCcw, Brain, CheckCircle2, ShieldAlert } from 'lucide-react';
import styles from './CorsiBlockTest.module.css';
import GameResult from '../../components/GameResult';
import GamePageLayout from '../../components/GamePageLayout';
import CorsiBlockTestInfo from './CorsiBlockTestInfo';
import { GAME_FAQS } from '../../data/gameFaqs';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';
import { generateMockPercentile } from '../../services/shareService';

type CorsiMode = 'forward' | 'backward';
type GameState = 'waiting' | 'showing' | 'input' | 'result';

interface BlockPosition {
  x: number; // percentage from left (0..100)
  y: number; // percentage from top (0..100)
}

/**
 * Standardized 9-block Corsi layout (Milner 1971 / Corsi 1972).
 * Scattered irregularly to defeat verbal row/column labeling and chunking heuristics.
 */
const CORSI_BLOCK_POSITIONS: BlockPosition[] = [
  { x: 18, y: 18 }, // Block 0: top-left
  { x: 52, y: 14 }, // Block 1: top-middle
  { x: 82, y: 24 }, // Block 2: top-right
  { x: 32, y: 38 }, // Block 3: upper-mid left
  { x: 68, y: 42 }, // Block 4: upper-mid right
  { x: 16, y: 62 }, // Block 5: lower-left
  { x: 48, y: 64 }, // Block 6: lower-center
  { x: 84, y: 72 }, // Block 7: lower-right
  { x: 34, y: 86 }, // Block 8: bottom-center
];

const FLASH_DURATION_MS = 600;
const INTER_STIMULUS_INTERVAL_MS = 400;

export default function CorsiBlockTest() {
  const [mode, setMode] = useState<CorsiMode>('forward');
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentSpan, setCurrentSpan] = useState<number>(2);
  const [trialNumber, setTrialNumber] = useState<1 | 2>(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [flashingBlock, setFlashingBlock] = useState<number | null>(null);
  const [tappedBlock, setTappedBlock] = useState<number | null>(null);
  const [errorBlock, setErrorBlock] = useState<number | null>(null);
  const [isInputLocked, setIsInputLocked] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [bannerType, setBannerType] = useState<'showing' | 'inputForward' | 'inputBackward' | 'success' | 'error'>('showing');
  const [maxCompletedSpan, setMaxCompletedSpan] = useState<number>(0);
  const [totalSuccesses, setTotalSuccesses] = useState<number>(0);

  const { saveScore } = useHighScore('corsi-block-test', true);

  // Timeouts tracker to clean up on unmount
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  /**
   * Generates a random sequence of blocks without immediate adjacent repeats
   */
  const generateSequence = (length: number): number[] => {
    const seq: number[] = [];
    for (let i = 0; i < length; i++) {
      let next: number;
      do {
        next = Math.floor(Math.random() * 9);
      } while (i > 0 && next === seq[i - 1]);
      seq.push(next);
    }
    return seq;
  };

  /**
   * Plays the stimulus sequence by flashing blocks sequentially
   */
  const playStimulusSequence = useCallback((newSeq: number[], span: number, trial: 1 | 2) => {
    clearAllTimeouts();
    setGameState('showing');
    setIsInputLocked(true);
    setSequence(newSeq);
    setUserSequence([]);
    setFlashingBlock(null);
    setTappedBlock(null);
    setErrorBlock(null);
    setBannerType('showing');
    setStatusMessage(`Watch closely: Span ${span} (Trial ${trial} of 2)`);

    let delay = 500;

    newSeq.forEach((blockIdx) => {
      // Turn on flash
      const flashOnTimeout = window.setTimeout(() => {
        setFlashingBlock(blockIdx);
        soundService.playSequenceNote(blockIdx);
      }, delay);
      timeoutsRef.current.push(flashOnTimeout);

      // Turn off flash
      delay += FLASH_DURATION_MS;
      const flashOffTimeout = window.setTimeout(() => {
        setFlashingBlock(null);
      }, delay);
      timeoutsRef.current.push(flashOffTimeout);

      // Gap between flashes
      delay += INTER_STIMULUS_INTERVAL_MS;
    });

    // Sequence finished -> unlock for user input
    const finishTimeout = window.setTimeout(() => {
      setGameState('input');
      setIsInputLocked(false);
      if (mode === 'forward') {
        setBannerType('inputForward');
        setStatusMessage(`Your Turn: Tap 1 of ${span} (Forward Order)`);
      } else {
        setBannerType('inputBackward');
        setStatusMessage(`Your Turn: Tap 1 of ${span} (REVERSE Order)`);
      }
    }, delay);
    timeoutsRef.current.push(finishTimeout);
  }, [clearAllTimeouts, mode]);

  /**
   * Starts a brand new test
   */
  const handleStartTest = useCallback(() => {
    soundService.unlockAudioContext();
    clearAllTimeouts();
    setCurrentSpan(2);
    setTrialNumber(1);
    setMaxCompletedSpan(0);
    setTotalSuccesses(0);

    const firstSeq = generateSequence(2);
    playStimulusSequence(firstSeq, 2, 1);
  }, [clearAllTimeouts, playStimulusSequence]);

  /**
   * Handles user tapping on a block
   */
  const handleBlockTap = (blockIdx: number) => {
    if (gameState !== 'input' || isInputLocked) return;
    soundService.unlockAudioContext();

    // Visual tap feedback
    setTappedBlock(blockIdx);
    const tapReset = window.setTimeout(() => setTappedBlock(null), 180);
    timeoutsRef.current.push(tapReset);

    // Play tactile musical note
    soundService.playSequenceNote(blockIdx);

    // Calculate expected block based on Forward vs. Backward mode
    const tapIndex = userSequence.length;
    const expectedBlock = mode === 'forward'
      ? sequence[tapIndex]
      : sequence[sequence.length - 1 - tapIndex];

    if (blockIdx === expectedBlock) {
      // Correct block tapped
      const nextUserSeq = [...userSequence, blockIdx];
      setUserSequence(nextUserSeq);

      if (nextUserSeq.length === sequence.length) {
        // Full sequence completed successfully!
        setIsInputLocked(true);
        soundService.playLevelUp();
        setBannerType('success');
        setStatusMessage(`Span ${currentSpan} Completed!`);

        const newMaxSpan = Math.max(maxCompletedSpan, currentSpan);
        setMaxCompletedSpan(newMaxSpan);
        setTotalSuccesses(prev => prev + 1);

        // Advance to next span level
        const nextSpan = currentSpan + 1;
        const advanceTimeout = window.setTimeout(() => {
          setCurrentSpan(nextSpan);
          setTrialNumber(1);
          const nextSeq = generateSequence(nextSpan);
          playStimulusSequence(nextSeq, nextSpan, 1);
        }, 850);
        timeoutsRef.current.push(advanceTimeout);
      } else {
        // Progress within sequence
        const nextTapNumber = nextUserSeq.length + 1;
        if (mode === 'forward') {
          setStatusMessage(`Your Turn: Tap ${nextTapNumber} of ${currentSpan} (Forward Order)`);
        } else {
          setStatusMessage(`Your Turn: Tap ${nextTapNumber} of ${currentSpan} (REVERSE Order)`);
        }
      }
    } else {
      // Wrong block tapped!
      setIsInputLocked(true);
      soundService.playSequenceWrong();
      setErrorBlock(blockIdx);
      setBannerType('error');

      if (trialNumber === 1) {
        // Failed trial 1 -> give trial 2 at the same span length
        setStatusMessage(`Incorrect Block. Trial 1 Missed — Retrying Span ${currentSpan}...`);
        const retryTimeout = window.setTimeout(() => {
          setErrorBlock(null);
          setTrialNumber(2);
          const retrySeq = generateSequence(currentSpan);
          playStimulusSequence(retrySeq, currentSpan, 2);
        }, 1200);
        timeoutsRef.current.push(retryTimeout);
      } else {
        // Failed trial 2 -> test over!
        // Corsi Span is highest span length passed (if failed span 2, minimum score 1)
        const finalSpanScore = maxCompletedSpan > 0 ? maxCompletedSpan : 1;
        setStatusMessage(`Span ${currentSpan} missed twice. Test Complete!`);

        const finishTimeout = window.setTimeout(() => {
          soundService.playVictory();
          saveScore(finalSpanScore);
          setGameState('result');
        }, 1200);
        timeoutsRef.current.push(finishTimeout);
      }
    }
  };

  // Final score & percentile calculations
  const finalScore = maxCompletedSpan > 0 ? maxCompletedSpan : 1;
  const percentile = generateMockPercentile(finalScore, 'corsi-block-test', false);

  const renderGameContent = () => {
    // ── Results Screen ──
    if (gameState === 'result') {
      return (
        <GameResult
          score={`Span ${finalScore}`}
          label="Corsi Working Memory Span"
          icon={<Boxes size={40} />}
          onRetry={handleStartTest}
          shareConfig={{
            gameId: 'corsi-block-test',
            gameName: 'Corsi Block-Tapping Test',
            score: finalScore,
            unit: 'Span',
            isLowerBetter: false,
            percentile: percentile,
          }}
        >
          {/* 4-Stat Performance Grid */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard} ${styles.statSpan}`}>
              <span className={styles.statValue}>Span {finalScore}</span>
              <span className={styles.statLabel}>Highest Span Passed</span>
            </div>
            <div className={`${styles.statCard} ${styles.statMode}`}>
              <span className={styles.statValue}>{mode === 'forward' ? 'Forward' : 'Backward'}</span>
              <span className={styles.statLabel}>Test Paradigm</span>
            </div>
            <div className={`${styles.statCard} ${styles.statTrials}`}>
              <span className={styles.statValue}>{totalSuccesses}</span>
              <span className={styles.statLabel}>Sequences Solved</span>
            </div>
            <div className={`${styles.statCard} ${styles.statPercentile}`}>
              <span className={styles.statValue}>Top {Math.max(1, 100 - percentile)}%</span>
              <span className={styles.statLabel}>{percentile}th Percentile</span>
            </div>
          </div>

          {/* Baddeley Visuospatial Sketchpad Neuroscience Card */}
          <div className={styles.neuroCard}>
            <div className={styles.neuroHeader}>
              <div className={styles.neuroTitle}>
                <Brain size={18} color="#0284c7" />
                <span>Visuospatial Sketchpad &amp; Dorsal Stream Profile</span>
              </div>
              <span className={styles.neuroBadge}>
                {mode === 'forward' ? 'Passive Visuospatial Storage' : 'Executive Working Memory Inversion'}
              </span>
            </div>

            <div className={styles.neuroGrid}>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>Tested Span</span>
                <span className={styles.neuroMetricValue} style={{ color: '#0284c7' }}>
                  {finalScore} Blocks
                </span>
              </div>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>Global Adult Norm</span>
                <span className={styles.neuroMetricValue} style={{ color: '#0f172a' }}>
                  {mode === 'forward' ? '5.6 Blocks' : '4.8 Blocks'}
                </span>
              </div>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>Neural Substrate</span>
                <span className={styles.neuroMetricValue} style={{ color: mode === 'forward' ? '#15803d' : '#7e22ce' }}>
                  {mode === 'forward' ? 'Parietal-Occipital' : 'dlPFC + Parietal'}
                </span>
              </div>
            </div>

            <p className={styles.neuroExplanation}>
              {mode === 'forward' ? (
                <>
                  Your <strong>Forward Span of {finalScore}</strong> measures the pure retention capacity of your{' '}
                  <strong>Visuospatial Sketchpad</strong> and the dorsal visual stream. Because Corsi's asymmetric blocks prevent verbal labeling or geometric chunking, your brain successfully maintained {finalScore} raw spatial coordinates across the frontoparietal attentional network.
                </>
              ) : (
                <>
                  Your <strong>Backward Span of {finalScore}</strong> measures advanced central executive manipulation. In addition to retaining spatial positions, your <strong>Dorsolateral Prefrontal Cortex (dlPFC)</strong> actively reordered the sequence in reverse order while shielding memory traces from temporal decay.
                </>
              )}
            </p>
          </div>
        </GameResult>
      );
    }

    // ── Start Screen ──
    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <div className={styles.iconWrapper}>
            <Boxes size={44} />
          </div>
          <h2>Corsi Block-Tapping Test</h2>
          <p>
            The clinical gold standard for measuring <strong>visuospatial working memory</strong>. Memorize the sequence of flashing blocks on an asymmetric 3D board and tap them back.
          </p>

          {/* Mode Selector Tabs */}
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={`${styles.modeTab} ${mode === 'forward' ? styles.modeTabActive : ''}`}
              onClick={() => setMode('forward')}
            >
              <span className={styles.modeTabTitle}>
                <ArrowRight size={16} /> Forward Span
              </span>
              <span className={styles.modeTabDesc}>
                Tap in the <strong>exact order</strong> flashed (Passive visuospatial storage).
              </span>
            </button>

            <button
              type="button"
              className={`${styles.modeTab} ${mode === 'backward' ? styles.modeTabActive : ''}`}
              onClick={() => setMode('backward')}
            >
              <span className={styles.modeTabTitle}>
                <RotateCcw size={16} /> Backward Span
              </span>
              <span className={styles.modeTabDesc}>
                Tap in <strong>reverse order</strong> (Executive dlPFC manipulation).
              </span>
            </button>
          </div>

          <button className={styles.startBtn} onClick={handleStartTest}>
            Start Corsi Test
          </button>
        </div>
      );
    }

    // ── Active Game Stage ──
    return (
      <div className={styles.playArea}>
        {/* HUD Header */}
        <div className={styles.hudHeader}>
          <div className={styles.hudGroup}>
            <span className={`${styles.hudBadge} ${styles.hudBadgeHighlight}`}>
              Span {currentSpan}
            </span>
            <span className={styles.hudBadge}>
              {mode === 'forward' ? 'Forward' : 'Reverse'}
            </span>
          </div>

          <div className={styles.hudGroup}>
            <div className={styles.hudBadge}>
              <span>Trial {trialNumber}/2</span>
              <div className={styles.livesIndicator}>
                <div className={`${styles.lifePip} ${trialNumber > 1 ? styles.lifePipSpent : ''}`} />
                <div className={`${styles.lifePip}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Status Banner */}
        <div
          className={`${styles.statusBanner} ${
            bannerType === 'showing'
              ? styles.bannerShowing
              : bannerType === 'inputForward'
              ? styles.bannerInputForward
              : bannerType === 'inputBackward'
              ? styles.bannerInputBackward
              : bannerType === 'success'
              ? styles.bannerSuccess
              : styles.bannerError
          }`}
        >
          {bannerType === 'success' && <CheckCircle2 size={18} />}
          {bannerType === 'error' && <ShieldAlert size={18} />}
          <span>{statusMessage}</span>
        </div>

        {/* 9-Block Asymmetric Corsi Board */}
        <div className={styles.boardArea}>
          {CORSI_BLOCK_POSITIONS.map((pos, idx) => {
            const isFlashing = flashingBlock === idx;
            const isTapped = tappedBlock === idx;
            const isError = errorBlock === idx;

            return (
              <button
                key={idx}
                type="button"
                className={`${styles.block} ${
                  isFlashing ? styles.blockFlashing : ''
                } ${isTapped ? styles.blockTapped : ''} ${
                  isError ? styles.blockError : ''
                }`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                disabled={gameState !== 'input' || isInputLocked}
                onClick={() => handleBlockTap(idx)}
                aria-label={`Corsi Block ${idx + 1}`}
              >
                <div className={styles.blockNode} />
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/corsi-block-test"
      title="Corsi Block-Tapping Test"
      seoTitle="Corsi Block-Tapping Test — Visuospatial Working Memory Span | Human Benchmark"
      seoDescription="Test your visuospatial working memory with the clinical Corsi Block-Tapping Test. Measures forward and backward spatial memory span on standardized asymmetric 3D blocks with global percentiles."
      subtitle="The clinical gold-standard assessment of visuospatial working memory and executive span. Memorize asymmetric spatial block sequences in forward or reverse order."
      category="Working Memory"
      heroGradient="linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #0284c7 100%)"
      heroTextColor="rgba(224, 242, 254, 0.85)"
      heroAccentColor="rgba(125, 211, 252, 0.7)"
      stats={[
        { value: 'Span 5.6', label: 'Global Forward Average' },
        { value: 'Span 4.8', label: 'Global Reverse Average' },
        { value: 'Span 8+', label: 'Top 5% Elite' },
        { value: '2 Modes', label: 'Forward & Reverse' },
      ]}
      relatedTests={[
        { name: 'Sequence Memory', path: '/sequence-memory', icon: <Boxes size={18} />, color: '#3b82f6' },
        { name: 'Visual Memory', path: '/visual-memory', icon: <Boxes size={18} />, color: '#14b8a6' },
        { name: 'Chimp Test', path: '/chimp-test', icon: <Boxes size={18} />, color: '#ec4899' },
      ]}
      aboutText="The Corsi Block-Tapping Test measures your visuospatial working memory span—the brain's capacity to temporarily hold and manipulate ordered spatial coordinates without relying on verbal rehearsal. Developed in 1972 by Philip Corsi, this asymmetric test isolates the Baddeley Visuospatial Sketchpad in the dorsal visual stream and the dorsolateral prefrontal cortex."
      infoContent={<CorsiBlockTestInfo />}
      faqs={GAME_FAQS['corsi-block-test']}
    >
      <div className={styles.container}>{renderGameContent()}</div>
    </GamePageLayout>
  );
}
