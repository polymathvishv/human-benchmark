import { useState, useEffect, useRef } from 'react';
import { Grid3x3 } from 'lucide-react';
import styles from './SequenceMemory.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import SequenceMemoryInfo from './SequenceMemoryInfo';
import { useHighScore } from '../../hooks/useHighScore';

type GameState = 'waiting' | 'showing' | 'input' | 'result';

export default function SequenceMemory() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [highlightedSquare, setHighlightedSquare] = useState<number | null>(null);
  const { saveScore } = useHighScore('sequence-memory', true);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startLevel = (lvl: number) => {
    const newSequence = lvl === 1 ? [] : [...sequence];
    newSequence.push(Math.floor(Math.random() * 9));
    setSequence(newSequence);
    setUserSequence([]);
    setGameState('showing');

    // Show the sequence
    let i = 0;
    const showNext = () => {
      if (i < newSequence.length) {
        setActiveSquare(newSequence[i]);
        timeoutRef.current = window.setTimeout(() => {
          setActiveSquare(null);
          i++;
          timeoutRef.current = window.setTimeout(showNext, 200);
        }, 600);
      } else {
        setGameState('input');
      }
    };
    timeoutRef.current = window.setTimeout(showNext, 500);
  };

  const startGame = () => {
    setLevel(1);
    setSequence([]);
    startLevel(1);
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== 'input') return;

    setHighlightedSquare(index);
    setTimeout(() => setHighlightedSquare(null), 200);

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    const currentPos = newUserSeq.length - 1;
    if (newUserSeq[currentPos] !== sequence[currentPos]) {
      // Wrong
      saveScore(level);
      setGameState('result');
    } else if (newUserSeq.length === sequence.length) {
      // Correct - next level
      setLevel(l => l + 1);
      setTimeout(() => startLevel(level + 1), 500);
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`Level ${level}`}
          label="Sequence Memory Score"
          icon={<Grid3x3 size={40} />}
          onRetry={() => setGameState('waiting')}
        >
          <GameInsight 
            score={level} 
            average={8} 
            isHigherBetter={true}
            fact="Sequence memory tests short-term memory and pattern recognition. The average person can remember about 7-8 items in sequence."
            formatScore={(s) => `Lvl ${s}`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Grid3x3 size={56} className={styles.icon} />
          <h2>Sequence Memory</h2>
          <p>Remember the sequence of illuminated squares and repeat it in order.</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    return (
      <div className={styles.playArea}>
        <div className={styles.levelDisplay}>Level {level}</div>
        <div className={styles.grid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`${styles.square} ${activeSquare === i ? styles.active : ''} ${highlightedSquare === i ? styles.highlighted : ''}`}
              onClick={() => handleSquareClick(i)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/sequence-memory"
      title="Sequence Memory Test"
      subtitle="Remember an increasingly long pattern of button presses. How far can you go?"
      category="Working Memory"
      heroGradient="linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4338ca 100%)"
      heroTextColor="rgba(199, 210, 254, 0.85)"
      heroAccentColor="rgba(165, 180, 252, 0.7)"
      stats={[
        { value: 'Level 8', label: 'Global average' },
        { value: 'Level 12+', label: 'Top 10%' },
        { value: '9 items', label: 'Grid size' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Visual Memory', path: '/visual-memory', icon: <Grid3x3 size={18} />, color: '#14b8a6' },
        { name: 'Number Memory', path: '/number-memory', icon: <Grid3x3 size={18} />, color: '#a855f7' },
      ]}
      infoContent={<SequenceMemoryInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
