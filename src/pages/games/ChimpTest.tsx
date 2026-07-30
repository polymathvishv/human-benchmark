import { useState } from 'react';
import { Smile, Grid3x3, Zap } from 'lucide-react';
import styles from './ChimpTest.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import ChimpTestInfo from './ChimpTestInfo';
import { useHighScore } from '../../hooks/useHighScore';

type GameState = 'waiting' | 'memorize' | 'clicking' | 'failed_level' | 'result';

const COLUMNS = 8;
const ROWS = 5;
const TOTAL_CELLS = COLUMNS * ROWS;

interface Cell {
  id: number;
  value: number;
  isHidden: boolean;
  isClicked: boolean;
}

export default function ChimpTest() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [level, setLevel] = useState(4);
  const [strikes, setStrikes] = useState(0);
  const [cells, setCells] = useState<Cell[]>([]);
  const [expectedNext, setExpectedNext] = useState(1);
  const { saveScore } = useHighScore('chimp-test', true);

  const generateLevel = (numCells: number) => {
    const newCells: Cell[] = [];
    const availablePositions = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    for (let i = availablePositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
    }
    for (let i = 0; i < numCells; i++) {
      newCells.push({ id: availablePositions[i], value: i + 1, isHidden: false, isClicked: false });
    }
    setCells(newCells);
    setExpectedNext(1);
    setGameState('memorize');
  };

  const startGame = () => {
    setLevel(4);
    setStrikes(0);
    generateLevel(4);
  };

  const handleCellClick = (cell: Cell) => {
    if (gameState !== 'memorize' && gameState !== 'clicking') return;
    if (cell.isClicked) return;

    if (cell.value === expectedNext) {
      const newExpected = expectedNext + 1;
      setExpectedNext(newExpected);
      const newCells = cells.map(c => {
        if (c.id === cell.id) return { ...c, isClicked: true };
        if (cell.value === 1 && c.id !== cell.id) return { ...c, isHidden: true };
        return c;
      });
      setCells(newCells);
      if (cell.value === 1) setGameState('clicking');
      if (newExpected > level) {
        setTimeout(() => {
          setLevel(l => l + 1);
          generateLevel(level + 1);
        }, 500);
      }
    } else {
      const newStrikes = strikes + 1;
      setCells(cells.map(c => ({ ...c, isHidden: false, isClicked: c.isClicked })));
      if (newStrikes >= 3) {
        setStrikes(newStrikes);
        setTimeout(() => {
          saveScore(level - 1);
          setGameState('result');
        }, 1000);
      } else {
        setStrikes(newStrikes);
        setGameState('failed_level');
      }
    }
  };

  const retryLevel = () => {
    generateLevel(level);
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`Level ${level - 1}`}
          label="Chimp Test Score"
          icon={<Smile size={40} />}
          onRetry={() => setGameState('waiting')}
        >
          <GameInsight 
            score={level - 1} 
            average={7} 
            isHigherBetter={true}
            fact="This test is inspired by research showing young chimpanzees have extraordinary eidetic (photographic) memory for numbers, often beating human adults!"
            formatScore={(s) => `Lvl ${s}`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Smile size={56} className={styles.icon} />
          <h2>Chimp Test</h2>
          <p>Click the squares in order according to their numbers. The test will get harder as you go.</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    const gridCells = Array.from({ length: TOTAL_CELLS }, (_, i) => {
      const activeCell = cells.find(c => c.id === i);
      return (
        <div key={i} className={styles.gridCell}>
          {activeCell && !activeCell.isClicked && (
            <div 
              className={`${styles.box} ${activeCell.isHidden ? styles.hidden : ''}`}
              onClick={() => handleCellClick(activeCell)}
            >
              {activeCell.isHidden ? '' : activeCell.value}
            </div>
          )}
        </div>
      );
    });

    return (
      <div className={styles.playArea}>
        <div className={styles.header}>
          <div>Score: {level}</div>
          <div>Strikes: {strikes} of 3</div>
        </div>
        <div className={styles.grid}>{gridCells}</div>
        {gameState === 'failed_level' && (
          <div className={styles.overlay}>
            <div className={styles.failedModal}>
              <h3>Strike {strikes}</h3>
              <button className={styles.startBtn} onClick={retryLevel}>Continue</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <GamePageLayout
      title="Chimp Test"
      subtitle="Numbers flash briefly on screen. Remember their positions, then click them in order. Based on the research that revealed chimpanzees outperform humans."
      category="Memory Test"
      heroGradient="linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #78350f 70%, #92400e 100%)"
      heroTextColor="rgba(254, 243, 199, 0.85)"
      heroAccentColor="rgba(251, 191, 36, 0.7)"
      stats={[
        { value: 'Level 5', label: 'Human average' },
        { value: 'Level 9+', label: 'Chimp average' },
        { value: 'Top 5%', label: 'Level 8+' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Visual Memory', path: '/visual-memory', icon: <Grid3x3 size={18} />, color: '#14b8a6' },
        { name: 'Sequence Memory', path: '/sequence-memory', icon: <Zap size={18} />, color: '#3b82f6' },
      ]}
      infoContent={<ChimpTestInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
