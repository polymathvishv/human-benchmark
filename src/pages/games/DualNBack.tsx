import { useState, useEffect, useRef, useCallback } from 'react';
import { Binary, Volume2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './DualNBack.module.css';
import GameResult from '../../components/GameResult';
import GamePageLayout from '../../components/GamePageLayout';
import DualNBackInfo from './DualNBackInfo';
import { GAME_FAQS } from '../../data/gameFaqs';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';
import { generateMockPercentile } from '../../services/shareService';

type NLevel = 1 | 2 | 3;
type GameState = 'waiting' | 'playing' | 'result';

const LETTERS_POOL = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];

// Mapping of 8 outer grid indices to 3x3 (row, col) coordinates
// Index 0: (0,0), 1: (0,1), 2: (0,2), 3: (1,2), 4: (2,2), 5: (2,1), 6: (2,0), 7: (1,0)
const OUTER_POSITIONS: [number, number][] = [
  [0, 0], [0, 1], [0, 2],
  [1, 2],
  [2, 2], [2, 1], [2, 0],
  [1, 0]
];

const TRIAL_TOTAL_DURATION_MS = 2500;
const STIMULUS_DURATION_MS = 500;

interface GeneratedSequence {
  positions: number[];
  letters: string[];
  isPosMatch: boolean[];
  isAudioMatch: boolean[];
}

/**
 * Controlled pseudo-random sequence generator:
 * Ensures every 20 evaluated trials contains exactly 6 Position Matches
 * and 6 Audio Matches (with 2 overlapping dual matches).
 */
function generateSequence(n: NLevel): GeneratedSequence {
  const totalTrials = 20 + n;
  const positions: number[] = new Array(totalTrials);
  const letters: string[] = new Array(totalTrials);
  const isPosMatch: boolean[] = new Array(totalTrials).fill(false);
  const isAudioMatch: boolean[] = new Array(totalTrials).fill(false);

  // Evaluated trial indices: [n ... totalTrials - 1] (length 20)
  const evaluatedIndices = Array.from({ length: 20 }, (_, i) => i + n);
  const shuffled = [...evaluatedIndices].sort(() => Math.random() - 0.5);

  const dualMatchIndices = new Set(shuffled.slice(0, 2));        // Exactly 2 dual matches
  const posOnlyMatchIndices = new Set(shuffled.slice(2, 6));     // Exactly 4 pos only
  const audioOnlyMatchIndices = new Set(shuffled.slice(6, 10));  // Exactly 4 audio only
  // Remaining 10 are non-matches

  // Warmup trials (first n trials)
  for (let i = 0; i < n; i++) {
    positions[i] = Math.floor(Math.random() * 8);
    letters[i] = LETTERS_POOL[Math.floor(Math.random() * LETTERS_POOL.length)];
  }

  // Evaluated trials
  for (let i = n; i < totalTrials; i++) {
    const isDual = dualMatchIndices.has(i);
    const isPosOnly = posOnlyMatchIndices.has(i);
    const isAudioOnly = audioOnlyMatchIndices.has(i);

    const shouldPosMatch = isDual || isPosOnly;
    const shouldAudioMatch = isDual || isAudioOnly;

    isPosMatch[i] = shouldPosMatch;
    isAudioMatch[i] = shouldAudioMatch;

    // Position assignment
    if (shouldPosMatch) {
      positions[i] = positions[i - n];
    } else {
      const otherPositions = [0, 1, 2, 3, 4, 5, 6, 7].filter(p => p !== positions[i - n]);
      positions[i] = otherPositions[Math.floor(Math.random() * otherPositions.length)];
    }

    // Letter assignment
    if (shouldAudioMatch) {
      letters[i] = letters[i - n];
    } else {
      const otherLetters = LETTERS_POOL.filter(l => l !== letters[i - n]);
      letters[i] = otherLetters[Math.floor(Math.random() * otherLetters.length)];
    }
  }

  return { positions, letters, isPosMatch, isAudioMatch };
}

export default function DualNBack() {
  const [nLevel, setNLevel] = useState<NLevel>(2);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [currentTrial, setCurrentTrial] = useState<number>(0);
  const [isStimulusActive, setIsStimulusActive] = useState<boolean>(false);
  const [userPressedPos, setUserPressedPos] = useState<boolean>(false);
  const [userPressedAudio, setUserPressedAudio] = useState<boolean>(false);

  // Active stimulus tokens
  const [activePosition, setActivePosition] = useState<number | null>(null);
  const [activeLetter, setActiveLetter] = useState<string>('');

  // Results tracking
  const [posHits, setPosHits] = useState<number>(0);
  const [posMisses, setPosMisses] = useState<number>(0);
  const [posFAs, setPosFAs] = useState<number>(0);

  const [audioHits, setAudioHits] = useState<number>(0);
  const [audioMisses, setAudioMisses] = useState<number>(0);
  const [audioFAs, setAudioFAs] = useState<number>(0);

  const [finalScore, setFinalScore] = useState<number>(0);
  const [overallAccuracy, setOverallAccuracy] = useState<number>(0);
  const [posAccuracy, setPosAccuracy] = useState<number>(0);
  const [audioAccuracy, setAudioAccuracy] = useState<number>(0);

  const { saveScore } = useHighScore('dual-n-back', true);

  // Refs for tracking mutable loop state across timers
  const sequenceRef = useRef<GeneratedSequence | null>(null);
  const trialIndexRef = useRef<number>(0);
  const pressedPosRef = useRef<boolean>(false);
  const pressedAudioRef = useRef<boolean>(false);
  const timeoutsRef = useRef<number[]>([]);

  // Speech synthesis speaker
  const speakLetter = useCallback((letter: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(letter);
        utter.rate = 1.15;
        utter.pitch = 1.0;
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      } catch {
        // Fallback tone
        soundService.playNBackStimulus(0);
      }
    }
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearAllTimeouts]);

  /**
   * Evaluates the user's responses for a completed trial
   */
  const evaluateTrial = useCallback((trialIdx: number) => {
    const seq = sequenceRef.current;
    if (!seq || trialIdx < nLevel) return;

    const hadPosMatch = seq.isPosMatch[trialIdx];
    const userPos = pressedPosRef.current;

    const hadAudioMatch = seq.isAudioMatch[trialIdx];
    const userAudio = pressedAudioRef.current;

    // Position Signal Detection
    if (hadPosMatch && userPos) {
      setPosHits(h => h + 1);
    } else if (hadPosMatch && !userPos) {
      setPosMisses(m => m + 1);
    } else if (!hadPosMatch && userPos) {
      setPosFAs(f => f + 1);
    }

    // Audio Signal Detection
    if (hadAudioMatch && userAudio) {
      setAudioHits(h => h + 1);
    } else if (hadAudioMatch && !userAudio) {
      setAudioMisses(m => m + 1);
    } else if (!hadAudioMatch && userAudio) {
      setAudioFAs(f => f + 1);
    }
  }, [nLevel]);

  /**
   * Concludes the test round and compiles score metrics
   */
  const finishGame = useCallback(() => {
    soundService.playVictory();

    // Read latest evaluation values directly from state setters
    setPosHits(finalPosHits => {
      setPosMisses(finalPosMisses => {
        setPosFAs(finalPosFAs => {
          setAudioHits(finalAudioHits => {
            setAudioMisses(finalAudioMisses => {
              setAudioFAs(finalAudioFAs => {
                const totalHits = finalPosHits + finalAudioHits;
                const totalMisses = finalPosMisses + finalAudioMisses;
                const totalFAs = finalPosFAs + finalAudioFAs;

                const denominator = totalHits + totalMisses + totalFAs;
                const acc = denominator > 0 ? (totalHits / denominator) * 100 : 0;
                const roundedAcc = Math.round(acc * 10) / 10;

                // Leaderboard formula: N * 100 + scorePercent (e.g., 2-Back @ 85% = 285)
                const composite = Math.round(nLevel * 100 + roundedAcc);

                const posDenom = finalPosHits + finalPosMisses + finalPosFAs;
                const pAcc = posDenom > 0 ? Math.round((finalPosHits / posDenom) * 100) : 0;

                const audioDenom = finalAudioHits + finalAudioMisses + finalAudioFAs;
                const aAcc = audioDenom > 0 ? Math.round((finalAudioHits / audioDenom) * 100) : 0;

                setOverallAccuracy(roundedAcc);
                setFinalScore(composite);
                setPosAccuracy(pAcc);
                setAudioAccuracy(aAcc);

                saveScore(composite);
                setGameState('result');

                return finalAudioFAs;
              });
              return finalAudioMisses;
            });
            return finalAudioHits;
          });
          return finalPosFAs;
        });
        return finalPosMisses;
      });
      return finalPosHits;
    });
  }, [nLevel, saveScore]);

  /**
   * Executes a single trial step and schedules the next trial
   */
  const runTrial = useCallback((idx: number) => {
    const seq = sequenceRef.current;
    const totalTrials = 20 + nLevel;

    if (!seq || idx >= totalTrials) {
      finishGame();
      return;
    }

    trialIndexRef.current = idx;
    setCurrentTrial(idx + 1);

    // Reset user response state for the new trial
    pressedPosRef.current = false;
    pressedAudioRef.current = false;
    setUserPressedPos(false);
    setUserPressedAudio(false);

    const pos = seq.positions[idx];
    const letter = seq.letters[idx];

    setActivePosition(pos);
    setActiveLetter(letter);
    setIsStimulusActive(true);

    // Play tactile sound note & speak letter
    soundService.playNBackStimulus(pos);
    speakLetter(letter);

    // Turn off stimulus after 500ms
    const stimOffTimeout = window.setTimeout(() => {
      setIsStimulusActive(false);
    }, STIMULUS_DURATION_MS);
    timeoutsRef.current.push(stimOffTimeout);

    // At end of trial (2500ms total), evaluate responses and trigger next trial
    const trialEndTimeout = window.setTimeout(() => {
      evaluateTrial(idx);
      runTrial(idx + 1);
    }, TRIAL_TOTAL_DURATION_MS);
    timeoutsRef.current.push(trialEndTimeout);
  }, [evaluateTrial, finishGame, nLevel, speakLetter]);

  /**
   * Initiates a new Dual N-Back round
   */
  const handleStartGame = useCallback((levelToUse: NLevel = nLevel) => {
    soundService.unlockAudioContext();
    clearAllTimeouts();

    setNLevel(levelToUse);
    setPosHits(0);
    setPosMisses(0);
    setPosFAs(0);
    setAudioHits(0);
    setAudioMisses(0);
    setAudioFAs(0);

    const newSeq = generateSequence(levelToUse);
    sequenceRef.current = newSeq;

    setGameState('playing');

    // Initial 400ms pause before Trial 1 begins
    const initTimeout = window.setTimeout(() => {
      runTrial(0);
    }, 400);
    timeoutsRef.current.push(initTimeout);
  }, [clearAllTimeouts, nLevel, runTrial]);

  /**
   * User button handlers (Position & Audio Match)
   */
  const handlePositionMatch = useCallback(() => {
    if (gameState !== 'playing') return;
    soundService.unlockAudioContext();
    soundService.playNBackMatch('pos');

    pressedPosRef.current = true;
    setUserPressedPos(true);
  }, [gameState]);

  const handleAudioMatch = useCallback(() => {
    if (gameState !== 'playing') return;
    soundService.unlockAudioContext();
    soundService.playNBackMatch('audio');

    pressedAudioRef.current = true;
    setUserPressedAudio(true);
  }, [gameState]);

  /**
   * Global Keyboard controls:
   * 'A' -> Position Match
   * 'L' -> Audio Match
   * Space / Enter -> Start / Retry
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.code === 'KeyA') {
        e.preventDefault();
        handlePositionMatch();
      } else if (e.code === 'KeyL') {
        e.preventDefault();
        handleAudioMatch();
      } else if (e.code === 'Space' || e.code === 'Enter') {
        if (gameState === 'waiting' || gameState === 'result') {
          e.preventDefault();
          handleStartGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleAudioMatch, handlePositionMatch, handleStartGame]);

  const totalTrialsCount = 20 + nLevel;
  const percentile = generateMockPercentile(finalScore, 'dual-n-back', false);

  const renderGameContent = () => {
    // ── Results Screen ──
    if (gameState === 'result') {
      const isEligibleForLevelUp = overallAccuracy >= 80 && nLevel < 3;

      return (
        <GameResult
          score={`${finalScore} pts`}
          label={`Dual ${nLevel}-Back Score`}
          icon={<Binary size={40} />}
          onRetry={() => handleStartGame(nLevel)}
          shareConfig={{
            gameId: 'dual-n-back',
            gameName: 'Dual N-Back Test',
            score: finalScore,
            unit: 'pts',
            isLowerBetter: false,
            percentile: percentile,
          }}
        >
          {/* 4-Stat Performance Grid */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard} ${styles.statScore}`}>
              <span className={styles.statValue}>{finalScore}</span>
              <span className={styles.statLabel}>Composite Points</span>
            </div>
            <div className={`${styles.statCard} ${styles.statPos}`}>
              <span className={styles.statValue}>{posAccuracy}%</span>
              <span className={styles.statLabel}>Position Accuracy</span>
            </div>
            <div className={`${styles.statCard} ${styles.statAudio}`}>
              <span className={styles.statValue}>{audioAccuracy}%</span>
              <span className={styles.statLabel}>Audio Accuracy</span>
            </div>
            <div className={`${styles.statCard} ${styles.statPercentile}`}>
              <span className={styles.statValue}>Top {Math.max(1, 100 - percentile)}%</span>
              <span className={styles.statLabel}>{percentile}th Percentile</span>
            </div>
          </div>

          {/* Celebratory Level-Up Banner (if >= 80% on 1-Back or 2-Back) */}
          {isEligibleForLevelUp && (
            <div className={styles.levelUpCard}>
              <div className={styles.levelUpText}>
                <span className={styles.levelUpTitle}>
                  <Sparkles size={18} color="#16a34a" /> Outstanding Working Memory ({overallAccuracy}%)!
                </span>
                <p className={styles.levelUpDesc}>
                  You crushed the {nLevel}-Back benchmark. Ready to level up to Dual {nLevel + 1}-Back?
                </p>
              </div>
              <button
                type="button"
                className={styles.levelUpBtn}
                onClick={() => handleStartGame((nLevel + 1) as NLevel)}
              >
                Level Up to {nLevel + 1}-Back →
              </button>
            </div>
          )}

          {/* Signal Detection & Frontoparietal Neuroscience Card */}
          <div className={styles.neuroCard}>
            <div className={styles.neuroHeader}>
              <div className={styles.neuroTitle}>
                <Binary size={18} color="#7e22ce" />
                <span>Signal Detection &amp; Frontoparietal Metrics</span>
              </div>
              <span className={styles.neuroBadge}>
                Dual {nLevel}-Back ({overallAccuracy}% Overall)
              </span>
            </div>

            <div className={styles.neuroGrid}>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>Total Hits</span>
                <span className={styles.neuroMetricValue} style={{ color: '#15803d' }}>
                  {posHits + audioHits} / 12
                </span>
              </div>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>Misses (Omissions)</span>
                <span className={styles.neuroMetricValue} style={{ color: '#b45309' }}>
                  {posMisses + audioMisses}
                </span>
              </div>
              <div className={styles.neuroMetric}>
                <span className={styles.neuroMetricLabel}>False Alarms</span>
                <span className={styles.neuroMetricValue} style={{ color: '#e11d48' }}>
                  {posFAs + audioFAs}
                </span>
              </div>
            </div>

            <p className={styles.neuroExplanation}>
              Your <strong>Dorsolateral Prefrontal Cortex (dlPFC)</strong> and <strong>Posterior Parietal Cortex</strong> simultaneously updated spatial coordinates (Dorsal stream) and phonemic tokens (Phonological loop) across 20 continuous trials.
              {overallAccuracy >= 75 ? (
                <> Your frontoparietal attentional gating demonstrates high resistance to inter-modal interference.</>
              ) : (
                <> Continuous dual-stream updating requires deliberate practice to overcome sensory interference.</>
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
            <Binary size={44} />
          </div>
          <h2>Dual N-Back Test</h2>
          <p>
            The world's premier task for expanding <strong>fluid intelligence ($G_f$)</strong> and working memory capacity. Track spatial positions and spoken letters simultaneously.
          </p>

          {/* N-Level Selector */}
          <div className={styles.levelSelector}>
            <span className={styles.levelLabel}>Select Difficulty Level:</span>
            <div className={styles.levelTabs}>
              <button
                type="button"
                className={`${styles.levelTab} ${nLevel === 1 ? styles.levelTabActive : ''}`}
                onClick={() => setNLevel(1)}
              >
                <span className={styles.levelTabTitle}>1-Back</span>
                <span className={styles.levelTabDesc}>Beginner Practice</span>
              </button>

              <button
                type="button"
                className={`${styles.levelTab} ${nLevel === 2 ? styles.levelTabActive : ''}`}
                onClick={() => setNLevel(2)}
              >
                <span className={styles.levelTabTitle}>2-Back ★</span>
                <span className={styles.levelTabDesc}>Standard Benchmark</span>
              </button>

              <button
                type="button"
                className={`${styles.levelTab} ${nLevel === 3 ? styles.levelTabActive : ''}`}
                onClick={() => setNLevel(3)}
              >
                <span className={styles.levelTabTitle}>3-Back</span>
                <span className={styles.levelTabDesc}>Executive Challenge</span>
              </button>
            </div>
          </div>

          {/* Keyboard Hints */}
          <div className={styles.keyHintsBox}>
            <div className={styles.keyHintItem}>
              <kbd className={styles.kbd}>A</kbd>
              <span>Position Match</span>
            </div>
            <div className={styles.keyHintItem}>
              <kbd className={styles.kbd}>L</kbd>
              <span>Audio Match</span>
            </div>
          </div>

          <button className={styles.startBtn} onClick={() => handleStartGame(nLevel)}>
            Start Dual {nLevel}-Back
          </button>
        </div>
      );
    }

    // ── Active Gameplay ──
    const isWarmup = currentTrial <= nLevel;

    return (
      <div className={styles.playArea}>
        {/* HUD Header */}
        <div className={styles.hudHeader}>
          <div className={styles.hudGroup}>
            <span className={`${styles.hudBadge} ${styles.hudBadgeHighlight}`}>
              Dual {nLevel}-Back
            </span>
            <span className={styles.hudBadge}>
              Trial {currentTrial} / {totalTrialsCount}
            </span>
          </div>

          <div className={styles.hudGroup}>
            <span className={styles.hudBadge}>
              <Volume2 size={15} /> Spoken Letters
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${(currentTrial / totalTrialsCount) * 100}%` }}
          />
        </div>

        {/* Status Banner */}
        <div className={`${styles.statusBanner} ${isWarmup ? styles.bannerWarmup : styles.bannerActive}`}>
          {isWarmup ? (
            <span>👀 Warmup: Remember the first {nLevel} stimuli...</span>
          ) : (
            <span>🎯 Press if position or letter matches {nLevel} step{nLevel > 1 ? 's' : ''} ago!</span>
          )}
        </div>

        {/* 3x3 Spatial Grid */}
        <div className={styles.gridContainer}>
          {[0, 1, 2].map(row =>
            [0, 1, 2].map(col => {
              // Center cell (1, 1) is dedicated to audio/fixation feedback
              if (row === 1 && col === 1) {
                return (
                  <div key="center" className={`${styles.cell} ${styles.centerCell}`}>
                    {isStimulusActive ? (
                      <div className={styles.spokenLetterBadge}>{activeLetter}</div>
                    ) : (
                      <span className={styles.fixationCross}>+</span>
                    )}
                  </div>
                );
              }

              // Outer 8 cells: Find if this cell matches the active position
              const outerIdx = OUTER_POSITIONS.findIndex(([r, c]) => r === row && c === col);
              const isActive = isStimulusActive && activePosition === outerIdx;

              return (
                <div
                  key={`${row}-${col}`}
                  className={`${styles.cell} ${isActive ? styles.cellActive : ''}`}
                />
              );
            })
          )}
        </div>

        {/* Dual Control Buttons */}
        <div className={styles.controlsGrid}>
          <button
            type="button"
            className={`${styles.controlBtn} ${styles.btnPosition} ${
              userPressedPos ? styles.btnPositionSelected : ''
            }`}
            onClick={handlePositionMatch}
            disabled={isWarmup}
            aria-label="Position Match (Key A)"
          >
            <span className={styles.btnTitle}>
              {userPressedPos && <CheckCircle2 size={16} color="#60a5fa" />} Position Match
            </span>
            <span className={styles.btnKbdHint}>
              <kbd className={styles.kbd}>A</kbd> or Tap Left
            </span>
          </button>

          <button
            type="button"
            className={`${styles.controlBtn} ${styles.btnAudio} ${
              userPressedAudio ? styles.btnAudioSelected : ''
            }`}
            onClick={handleAudioMatch}
            disabled={isWarmup}
            aria-label="Audio Match (Key L)"
          >
            <span className={styles.btnTitle}>
              {userPressedAudio && <CheckCircle2 size={16} color="#c084fc" />} Audio Match
            </span>
            <span className={styles.btnKbdHint}>
              <kbd className={styles.kbd}>L</kbd> or Tap Right
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/dual-n-back"
      title="Dual N-Back Test"
      seoTitle="Dual N-Back Test — Fluid Intelligence & Working Memory | Human Benchmark"
      seoDescription="Train your working memory and fluid intelligence with the scientifically validated Dual N-Back Test. Track spatial positions and spoken letters simultaneously with global percentiles."
      subtitle="The landmark cognitive training task proven to expand working memory capacity and fluid intelligence (Gf). Track spatial positions and spoken letters simultaneously."
      category="Working Memory"
      heroGradient="linear-gradient(135deg, #2e1065 0%, #4c1d95 45%, #6366f1 100%)"
      heroTextColor="rgba(237, 233, 254, 0.85)"
      heroAccentColor="rgba(196, 181, 253, 0.7)"
      stats={[
        { value: '2-Back (70%)', label: 'Benchmark Average' },
        { value: '3-Back (80%+)', label: 'Top 1% Elite' },
        { value: 'Dual Stream', label: 'Visual + Audio' },
        { value: 'Free', label: 'No Sign-Up' },
      ]}
      relatedTests={[
        { name: 'Sequence Memory', path: '/sequence-memory', icon: <ArrowRight size={18} />, color: '#3b82f6' },
        { name: 'Corsi Block Test', path: '/corsi-block-test', icon: <ArrowRight size={18} />, color: '#0284c7' },
        { name: 'Visual Memory', path: '/visual-memory', icon: <ArrowRight size={18} />, color: '#14b8a6' },
      ]}
      aboutText="The Dual N-Back task requires you to simultaneously track two separate sensory streams: a visual location on a 3x3 grid and an auditory spoken letter. Evaluated in Susanne Jaeggi's landmark 2008 PNAS study, Dual N-Back is one of the only cognitive exercises demonstrating measurable transfer to fluid intelligence (Gf) by engaging the frontoparietal attentional network."
      infoContent={<DualNBackInfo />}
      faqs={GAME_FAQS['dual-n-back']}
    >
      <div className={styles.container}>{renderGameContent()}</div>
    </GamePageLayout>
  );
}
