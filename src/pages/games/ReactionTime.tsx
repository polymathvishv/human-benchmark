import { useState, useRef, useEffect } from 'react';
import { Zap, AlertTriangle, Clock, Target } from 'lucide-react';
import styles from './ReactionTime.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import ReactionTimeInfo from './ReactionTimeInfo';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'ready' | 'now' | 'too_early' | 'attempt_result' | 'result';

export default function ReactionTime() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const { saveScore } = useHighScore('reaction-time', false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const triggerGreen = () => {
    setGameState('now');
    startTimeRef.current = performance.now();
    soundService.playReactionGreen();
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      setAttempts([]);
      setGameState('ready');
      const randomDelay = Math.floor(Math.random() * 3000) + 2000;
      timeoutRef.current = window.setTimeout(triggerGreen, randomDelay);
    } else if (gameState === 'ready') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      soundService.playReactionEarly();
      setGameState('too_early');
    } else if (gameState === 'now') {
      const endTime = performance.now();
      const rawScore = Math.floor(endTime - startTimeRef.current);
      const currentScore = Math.max(0, rawScore - 60); // Account for 60ms device latency
      const newAttempts = [...attempts, currentScore];
      setAttempts(newAttempts);

      if (newAttempts.length >= 5) {
        const average = Math.floor(newAttempts.reduce((a, b) => a + b, 0) / newAttempts.length);
        setScore(average);
        saveScore(average);
        soundService.playVictory();
        setGameState('result');
      } else {
        setScore(currentScore);
        soundService.playReactionResult();
        setGameState('attempt_result');
      }
    } else if (gameState === 'too_early') {
      setGameState('ready');
      const randomDelay = Math.floor(Math.random() * 3000) + 2000;
      timeoutRef.current = window.setTimeout(triggerGreen, randomDelay);
    } else if (gameState === 'attempt_result') {
      setGameState('ready');
      const randomDelay = Math.floor(Math.random() * 3000) + 2000;
      timeoutRef.current = window.setTimeout(triggerGreen, randomDelay);
    }
  };

  const getStyles = (): React.CSSProperties => {
    switch (gameState) {
      case 'ready':
        return { backgroundColor: 'var(--game-red)', color: 'white' };
      case 'now':
        return { backgroundColor: 'var(--game-green)', color: 'white' };
      default:
        return {};
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${score} ms`}
          label="Average Reaction Time"
          icon={<Zap size={40} />}
          onRetry={() => {
            setGameState('waiting');
            setScore(0);
            setAttempts([]);
          }}
          shareConfig={{
            gameId: 'reaction-time',
            gameName: 'Reaction Time',
            score: score,
            unit: 'ms',
            isLowerBetter: true,
          }}
        >
          <GameInsight 
            score={score} 
            average={273} 
            isHigherBetter={false}
            fact="Visual stimuli take about 20-40ms to reach the brain, and motor commands take another 70-100ms. The average reaction time is 273ms."
            formatScore={(s) => `${s}ms`}
          />
        </GameResult>
      );
    }

    return (
      <div 
        className={`${styles.gameArea} ${gameState === 'ready' || gameState === 'now' ? styles.active : ''}`}
        style={getStyles()}
        onMouseDown={handleClick}
      >
        {gameState === 'waiting' && (
          <div className={styles.content}>
            <Zap size={56} className={styles.icon} />
            <h2>Reaction Time Test</h2>
            <p>When the red box turns green, click as quickly as you can.</p>
            <button className={styles.startButton}>Start Game</button>
          </div>
        )}

        {gameState === 'ready' && (
          <div className={styles.content}>
            <h2>Wait for green...</h2>
          </div>
        )}

        {gameState === 'now' && (
          <div className={styles.content}>
            <h2>Click!</h2>
          </div>
        )}

        {gameState === 'too_early' && (
          <div className={styles.content}>
            <AlertTriangle size={56} className={styles.icon} />
            <h2>Too soon!</h2>
            <p>Click to try again.</p>
          </div>
        )}

        {gameState === 'attempt_result' && (
          <div className={styles.content}>
            <Clock size={56} className={styles.icon} />
            <h2>{score} ms</h2>
            <p>Click to keep going.</p>
            <p className={styles.instruction}>Attempt {attempts.length} of 5</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/reaction-time"
      title="Reaction Time Test"
      subtitle="Click the moment the screen turns green. We average five attempts for your score."
      category="Speed Test"
      heroGradient="linear-gradient(135deg, #022c1a 0%, #064e3b 45%, #065f46 75%, #047857 100%)"
      heroTextColor="rgba(167, 243, 208, 0.85)"
      heroAccentColor="rgba(110, 231, 183, 0.7)"
      stats={[
        { value: '284ms', label: 'Global average' },
        { value: '<200ms', label: 'Top 10%' },
        { value: 'Age 24', label: 'Peak speed' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Aim Trainer', path: '/aim-trainer', icon: <Target size={18} />, color: '#22c55e' },
        { name: 'Sequence Memory', path: '/sequence-memory', icon: <Zap size={18} />, color: '#3b82f6' },
      ]}
      infoContent={<ReactionTimeInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
