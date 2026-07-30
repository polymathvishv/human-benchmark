import { useState, useRef, useEffect } from 'react';
import { Hash, ArrowRight, Zap, MessageSquare } from 'lucide-react';
import styles from './NumberMemory.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import NumberMemoryInfo from './NumberMemoryInfo';
import { useHighScore } from '../../hooks/useHighScore';

type GameState = 'waiting' | 'showing' | 'input' | 'result';

export default function NumberMemory() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [level, setLevel] = useState(1);
  const [targetNumber, setTargetNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [progress, setProgress] = useState(100);
  
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const { saveScore } = useHighScore('number-memory', true);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const generateNumber = (length: number) => {
    let num = '';
    num += Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };

  const startLevel = (currentLevel: number) => {
    const newNumber = generateNumber(currentLevel);
    setTargetNumber(newNumber);
    setUserInput('');
    setGameState('showing');
    setProgress(100);

    const timeToShow = Math.max(2000, currentLevel * 1000);
    const intervalTime = 20;
    const step = (intervalTime / timeToShow) * 100;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p - step <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return p - step;
      });
    }, intervalTime);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setGameState('input');
    }, timeToShow);
  };

  const startGame = () => {
    setLevel(1);
    startLevel(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput === targetNumber) {
      setLevel(l => l + 1);
      startLevel(level + 1);
    } else {
      saveScore(level);
      setGameState('result');
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${level - 1} Digits`}
          label="Number Memory Score"
          icon={<Hash size={40} />}
          onRetry={() => setGameState('waiting')}
        >
          <GameInsight 
            score={level - 1} 
            average={7} 
            isHigherBetter={true}
            fact="According to Miller's Law, the average person can only hold 7 (plus or minus 2) digits in their working memory."
            formatScore={(s) => `${s} digits`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Hash size={56} className={styles.icon} />
          <h2>Number Memory</h2>
          <p>The average person can remember 7 numbers at once. Can you do more?</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    if (gameState === 'showing') {
      return (
        <div className={styles.showingArea}>
          <h2 className={styles.targetNumber}>{targetNumber}</h2>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.inputArea}>
        <h2>What was the number?</h2>
        <p>Press enter to submit</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
            autoFocus
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            Submit <ArrowRight size={20} />
          </button>
        </form>
      </div>
    );
  };

  return (
    <GamePageLayout
      title="Number Memory Test"
      subtitle="Remember the longest number you can. The average person can hold 7 digits in working memory."
      category="Working Memory"
      heroGradient="linear-gradient(135deg, #1e1b4b 0%, #3730a3 45%, #4f46e5 100%)"
      heroTextColor="rgba(199, 210, 254, 0.85)"
      heroAccentColor="rgba(165, 180, 252, 0.7)"
      stats={[
        { value: '7 digits', label: 'Global average' },
        { value: '9+', label: 'Top 10%' },
        { value: "Miller's Law", label: '7 ± 2 items' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Verbal Memory', path: '/verbal-memory', icon: <MessageSquare size={18} />, color: '#f59e0b' },
        { name: 'Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
      ]}
      infoContent={<NumberMemoryInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
