import { useState, useRef, useEffect, useMemo } from 'react';
import { Keyboard, Activity, Zap, MessageSquare } from 'lucide-react';
import styles from './TypingTest.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import TypingInfo from './TypingInfo';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'playing' | 'result';

const TEXTS = [
  "The quick brown fox jumps over the lazy dog. This is a classic sentence used for typing tests because it contains every letter of the English alphabet at least once. Typing fast requires practice, muscle memory, and a good keyboard. Keep your eyes on the screen and your fingers on the home row.",
  "In the world of software development, writing clean and maintainable code is just as important as writing code that works. Good developers know that code is read far more often than it is written, so they take the time to structure it well, use meaningful variable names, and write clear documentation.",
  "Space exploration has always fascinated humanity. From the earliest stargazers to modern astronauts aboard the International Space Station, the desire to understand the universe drives us forward. With new technologies being developed every day, a mission to Mars seems more possible than ever before in our history."
];

export default function TypingTest() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [targetText, setTargetText] = useState('');
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const startTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { saveScore } = useHighScore('typing', true);

  useEffect(() => {
    if (gameState === 'playing' && containerRef.current) {
      containerRef.current.focus();
    }

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'playing' && (e.key === ' ' || e.code === 'Space')) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, [gameState]);

  const startGame = () => {
    setTargetText(TEXTS[Math.floor(Math.random() * TEXTS.length)]);
    setTypedChars([]);
    setGameState('playing');
    startTimeRef.current = 0;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameState !== 'playing') return;

    // Prevent default browser scrolling and actions for spacebar, backspace, and typing keys
    if (e.key === ' ' || e.key === 'Backspace' || e.key === 'Tab' || e.key.startsWith('Arrow') || e.key.length === 1) {
      e.preventDefault();
    }

    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Tab') return;
    if (e.key.startsWith('Arrow')) return;

    if (typedChars.length === 0 && e.key.length === 1) {
      startTimeRef.current = performance.now();
    }

    if (e.key === 'Backspace') {
      soundService.playKeyClick();
      setTypedChars(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      const nextIndex = typedChars.length;
      if (nextIndex < targetText.length && e.key !== targetText[nextIndex]) {
        soundService.playTypo();
      } else {
        soundService.playKeyClick();
      }

      const newTyped = [...typedChars, e.key];
      setTypedChars(newTyped);
      if (newTyped.length === targetText.length) {
        finishGame(newTyped);
      }
    }
  };

  const finishGame = (finalTyped: string[]) => {
    const endTime = performance.now();
    const timeInMinutes = (endTime - startTimeRef.current) / 60000;
    let correctChars = 0;
    for (let i = 0; i < finalTyped.length; i++) {
      if (finalTyped[i] === targetText[i]) correctChars++;
    }
    const finalAccuracy = Math.round((correctChars / targetText.length) * 100);
    setAccuracy(finalAccuracy);
    const wordsTyped = (correctChars / 5);
    const finalWpm = Math.round(wordsTyped / timeInMinutes);
    setWpm(finalWpm);
    saveScore(finalWpm);
    soundService.playVictory();
    setGameState('result');
  };

  const renderText = useMemo(() => {
    return targetText.split('').map((char, index) => {
      let statusClass = '';
      if (index < typedChars.length) {
        if (typedChars[index] === char) {
          statusClass = styles.correct;
        } else {
          statusClass = styles.incorrect;
        }
      } else if (index === typedChars.length) {
        statusClass = styles.current;
      }
      return (
        <span key={index} className={`${styles.char} ${statusClass}`}>
          {char === ' ' && statusClass === styles.incorrect ? '_' : char}
        </span>
      );
    });
  }, [targetText, typedChars]);

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${wpm} WPM`}
          label={`Accuracy: ${accuracy}%`}
          icon={<Keyboard size={40} />}
          onRetry={() => setGameState('waiting')}
          shareConfig={{
            gameId: 'typing',
            gameName: 'Typing Test',
            score: wpm,
            unit: 'WPM',
            isLowerBetter: false,
          }}
        >
          <GameInsight 
            score={wpm} 
            average={40} 
            isHigherBetter={true}
            fact="Muscle memory allows touch typists to bypass conscious thought, sending signals directly from the visual cortex to the motor cortex!"
            formatScore={(s) => `${s} WPM`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <Keyboard size={56} className={styles.icon} />
          <h2>Typing Test</h2>
          <p>How many words per minute can you type?</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    return (
      <div className={styles.playArea}>
        <div className={styles.header}>
          <div className={styles.stats}>
            <Activity size={20} className={styles.iconSm} />
            <span>Type the text below</span>
          </div>
        </div>
        <div 
          className={styles.typeArea}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={containerRef}
        >
          <div className={styles.textDisplay}>{renderText}</div>
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/typing"
      title="Typing Speed Test"
      subtitle="Type the passage as fast and accurately as you can. Your score is measured in words per minute (WPM)."
      category="Motor Skill - Psychomotor Speed"
      heroGradient="linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)"
      heroTextColor="rgba(203, 213, 225, 0.85)"
      heroAccentColor="rgba(148, 163, 184, 0.7)"
      stats={[
        { value: '52', label: 'Global avg WPM' },
        { value: '85+', label: 'Top 10% WPM' },
        { value: '212', label: 'World record' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
        { name: 'Verbal Memory', path: '/verbal-memory', icon: <MessageSquare size={18} />, color: '#f59e0b' },
      ]}
      aboutText="The Typing Test measures your typing speed in Words Per Minute (WPM) with accuracy penalty. The average adult types 40\u201360 WPM; fast typists reach 80\u2013100 WPM; professional typists exceed 100 WPM. The current world record exceeds 212 WPM. Typing speed reflects both motor learning (finger placement automaticity) and cognitive processing speed. Regular deliberate practice can yield significant improvement."
      infoContent={<TypingInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
