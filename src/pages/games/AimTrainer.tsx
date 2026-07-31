import { useState, useRef } from 'react';
import { Target, Zap, Crosshair } from 'lucide-react';
import styles from './AimTrainer.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import AimTrainerInfo from './AimTrainerInfo';
import { useHighScore } from '../../hooks/useHighScore';

type GameState = 'waiting' | 'playing' | 'result';

const TOTAL_TARGETS = 30;

export default function AimTrainer() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [targetsHit, setTargetsHit] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef(0);
  const timesRef = useRef<number[]>([]);
  const { saveScore } = useHighScore('aim-trainer', false);

  const placeTarget = () => {
    setTargetPos({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  const startGame = () => {
    timesRef.current = [];
    setTargetsHit(0);
    placeTarget();
    setGameState('playing');
    startTimeRef.current = performance.now();
  };

  const handleTargetClick = () => {
    const now = performance.now();
    timesRef.current.push(now - startTimeRef.current);
    startTimeRef.current = now;

    const newHits = targetsHit + 1;
    setTargetsHit(newHits);

    if (newHits >= TOTAL_TARGETS) {
      const rawAvg = Math.floor(timesRef.current.reduce((a, b) => a + b, 0) / timesRef.current.length);
      const avg = Math.max(0, rawAvg - 180); // Account for 180ms device latency
      setAverageTime(avg);
      saveScore(avg);
      setGameState('result');
    } else {
      placeTarget();
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${averageTime} ms`}
          label="Average Time Per Target"
          icon={<Target size={40} />}
          onRetry={() => setGameState('waiting')}
        >
          <GameInsight 
            score={averageTime} 
            average={400} 
            isHigherBetter={false}
            fact="Aim training combines reaction time with fine motor control. The best FPS players average under 250ms per target."
            formatScore={(s) => `${s}ms`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Target size={56} className={styles.icon} />
          <h2>Aim Trainer</h2>
          <p>Hit {TOTAL_TARGETS} targets as quickly as you can.</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    return (
      <div className={styles.playArea} ref={containerRef}>
        <div className={styles.header}>
          <div className={styles.remaining}>Targets: {targetsHit} / {TOTAL_TARGETS}</div>
        </div>
        <div className={styles.gameArea}>
          <div
            className={styles.target}
            style={{ left: `calc(${targetPos.x}% - 24px)`, top: `calc(${targetPos.y}% - 24px)` }}
            onClick={handleTargetClick}
          >
            <Crosshair size={48} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/aim-trainer"
      title="Aim Trainer"
      subtitle="Hit 30 targets as quickly as you can. Measures your hand-eye coordination and motor speed."
      category="Motor Skill"
      heroGradient="linear-gradient(135deg, #052e16 0%, #14532d 45%, #166534 75%, #15803d 100%)"
      heroTextColor="rgba(187, 247, 208, 0.85)"
      heroAccentColor="rgba(134, 239, 172, 0.7)"
      stats={[
        { value: '400ms', label: 'Global average' },
        { value: '<250ms', label: 'Top 10%' },
        { value: '30', label: 'Targets to hit' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
        { name: 'Visual Memory', path: '/visual-memory', icon: <Target size={18} />, color: '#14b8a6' },
      ]}
      infoContent={<AimTrainerInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
