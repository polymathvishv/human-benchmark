import { useState, useEffect, useRef } from 'react';
import { Grid3x3, Heart, Smile } from 'lucide-react';
import styles from './VisualMemory.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import VisualMemoryInfo from './VisualMemoryInfo';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'flashing' | 'input' | 'level_failed' | 'result';

export default function VisualMemory() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gridSize, setGridSize] = useState(3);
  const [activeSquares, setActiveSquares] = useState<Set<number>>(new Set());
  const [clickedSquares, setClickedSquares] = useState<Set<number>>(new Set());
  const [wrongClick, setWrongClick] = useState<number | null>(null);
  const { saveScore } = useHighScore('visual-memory', true);
  const timeoutRef = useRef<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getLevelConfig = (lvl: number) => {
    const size = Math.min(Math.floor((lvl + 1) / 2) + 2, 7);
    const numSquares = lvl + 2; 
    return { size, numSquares };
  };

  const generateLevel = (lvl: number) => {
    const { size, numSquares } = getLevelConfig(lvl);
    setGridSize(size);
    setClickedSquares(new Set());
    setWrongClick(null);

    const newActive = new Set<number>();
    const totalCells = size * size;
    while (newActive.size < numSquares && newActive.size < totalCells) {
      newActive.add(Math.floor(Math.random() * totalCells));
    }
    setActiveSquares(newActive);
    setGameState('flashing');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setGameState('input');
    }, 1500);
  };

  const startGame = () => {
    setLevel(1);
    setLives(3);
    generateLevel(1);
  };

  const handleSquareClick = (index: number) => {
    if (gameState !== 'input') return;
    if (clickedSquares.has(index)) return;

    if (activeSquares.has(index)) {
      soundService.playTileCorrect();
      const newClicked = new Set(clickedSquares).add(index);
      setClickedSquares(newClicked);
      if (newClicked.size === activeSquares.size) {
        soundService.playLevelUp();
        setGameState('flashing');
        setTimeout(() => {
          setLevel(l => l + 1);
          generateLevel(level + 1);
        }, 1000);
      }
    } else {
      soundService.playTileWrong();
      setWrongClick(index);
      const newLives = lives - 1;
      if (newLives === 0) {
        setTimeout(() => {
          setScore(level);
          saveScore(level);
          setGameState('result');
        }, 1500);
      } else {
        setGameState('level_failed');
        setTimeout(() => {
          setLives(newLives);
          generateLevel(level);
        }, 2000);
      }
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`Level ${level - 1}`}
          label="Visual Memory Score"
          icon={<Grid3x3 size={40} />}
          onRetry={() => setGameState('waiting')}
          shareConfig={{
            gameId: 'visual-memory',
            gameName: 'Visual Memory',
            score: level - 1,
            unit: 'Level',
            isLowerBetter: false,
          }}
        >
          <GameInsight 
            score={score} 
            average={9} 
            isHigherBetter={true}
            fact="This measures spatial working memory. Chess grandmasters often excel here because they must remember and manipulate complex positions."
            formatScore={(s) => `Lvl ${s}`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Grid3x3 size={56} className={styles.icon} />
          <h2>Visual Memory</h2>
          <p>Memorize the squares.</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    return (
      <div className={styles.playArea}>
        <div className={styles.header}>
          <div>Level {level}</div>
          <div className={styles.lives}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} size={22} 
                className={i < lives ? styles.lifeActive : styles.lifeLost} 
                fill={i < lives ? 'var(--game-red)' : 'transparent'} 
              />
            ))}
          </div>
        </div>
        <div 
          className={styles.grid}
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            maxWidth: `${gridSize * 80}px`
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, i) => {
            const isActive = activeSquares.has(i);
            const isClicked = clickedSquares.has(i);
            const isWrong = wrongClick === i;
            let cellState = '';
            if (gameState === 'flashing' || gameState === 'level_failed') {
              if (isActive) cellState = styles.active;
              if (isWrong) cellState = styles.wrong;
            } else if (gameState === 'input') {
              if (isClicked) cellState = styles.active;
              if (isWrong) cellState = styles.wrong;
            }
            return (
              <div 
                key={i}
                className={`${styles.cell} ${cellState} ${gameState === 'input' && !isClicked ? styles.clickable : ''}`}
                onClick={() => handleSquareClick(i)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/visual-memory"
      title="Visual Memory Test"
      subtitle="Squares flash on a grid. Memorize which ones lit up, then click them. Each correct level adds more squares. You have 3 lives."
      category="Visuospatial Working Memory"
      heroGradient="linear-gradient(135deg, #2e1065 0%, #4c1d95 40%, #6d28d9 100%)"
      heroTextColor="rgba(233, 213, 255, 0.85)"
      heroAccentColor="rgba(216, 180, 254, 0.7)"
      stats={[
        { value: 'Level 8', label: 'Global avg level' },
        { value: '12+', label: 'Top 10%' },
        { value: '3', label: 'Lives per game' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Chimp Test', path: '/chimp-test', icon: <Smile size={18} />, color: '#ec4899' },
        { name: 'Sequence Memory', path: '/sequence-memory', icon: <Grid3x3 size={18} />, color: '#3b82f6' },
      ]}
      infoContent={<VisualMemoryInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
