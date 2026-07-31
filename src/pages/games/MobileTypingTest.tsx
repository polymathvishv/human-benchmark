import { useState, useRef, useEffect, useMemo } from 'react';
import { Smartphone, Zap, MessageCircle } from 'lucide-react';
import styles from './MobileTypingTest.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import MobileTypingInfo from './MobileTypingInfo';
import { useHighScore } from '../../hooks/useHighScore';

type GameState = 'waiting' | 'countdown' | 'playing' | 'result';

const GAME_DURATION = 45; // 45 seconds

// Structured dataset imitating natural messaging
const SENTENCES = [
  // Easy (short, mostly lowercase, minimal punctuation)
  "I'm almost there.",
  "Can you send me the address?",
  "I'll call you in five minutes.",
  "Let's order pizza tonight.",
  "We should meet after work.",
  "My phone battery is almost dead.",
  "See you soon!",
  // Medium (longer, some punctuation)
  "That movie was surprisingly good.",
  "The weather is beautiful today, isn't it?",
  "I can't believe how fast this year went by.",
  "Don't forget to grab some milk on your way home.",
  "I'll text you when I arrive at the station.",
  "Are we still on for lunch tomorrow at 1?",
  // Hard (numbers, symbols, URLs)
  "See you at 7:30 PM tonight.",
  "My email is hello@example.com.",
  "Check out humanbenchmark.in for more tests!",
  "Wait, really?! That's 100% crazy.",
  "Call me back ASAP. 911-555-0198",
  "It costs $45.99, but shipping is free."
];

export default function MobileTypingTest() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [countdown, setCountdown] = useState(3);
  
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [targetText, setTargetText] = useState('');
  const [typedChars, setTypedChars] = useState<string[]>([]);
  
  // Metrics
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);
  const { saveScore } = useHighScore('mobile-typing', true);

  // Focus input automatically on mobile when playing
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, sentenceIndex]); // Re-focus on new sentence just in case

  // Countdown logic
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        startGameplay();
      }
    }
  }, [gameState, countdown]);

  // Main game timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameState]);

  const loadRandomSentence = () => {
    // Pick random sentence from pool
    const newText = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setTargetText(newText);
    setTypedChars([]);
    // Clear the hidden input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    setTimeLeft(GAME_DURATION);
    setTotalCorrectChars(0);
    setTotalTypedChars(0);
    setGameState('countdown');
  };

  const startGameplay = () => {
    loadRandomSentence();
    setGameState('playing');
  };

  const finishGame = () => {
    // Calculate final metrics
    // WPM = (correct chars / 5) / (time in minutes)
    const timeInMinutes = GAME_DURATION / 60;
    const finalWpm = Math.round((totalCorrectChars / 5) / timeInMinutes);
    const finalAccuracy = totalTypedChars === 0 ? 0 : Math.round((totalCorrectChars / totalTypedChars) * 100);
    
    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
    saveScore(finalWpm);
    setGameState('result');
  };

  // We use onChange on a hidden input to capture mobile keyboard events better than onKeyDown
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;
    
    const value = e.target.value;
    const newTyped = value.split('');
    setTypedChars(newTyped);
    
    // Check if sentence is completed
    if (newTyped.length === targetText.length) {
      // Calculate how many were correct in this sentence
      let correctInSentence = 0;
      for (let i = 0; i < newTyped.length; i++) {
        if (newTyped[i] === targetText[i]) correctInSentence++;
      }
      
      setTotalCorrectChars(prev => prev + correctInSentence);
      setTotalTypedChars(prev => prev + newTyped.length);
      
      // Load next sentence instantly
      loadRandomSentence();
      setSentenceIndex(prev => prev + 1);
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const renderText = useMemo(() => {
    if (!targetText) return null;
    
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
          icon={<Smartphone size={40} />}
          onRetry={() => setGameState('waiting')}
          shareConfig={{
            gameId: 'mobile-typing',
            gameName: 'Mobile Typing Test',
            score: wpm,
            unit: 'WPM',
            isLowerBetter: false,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{totalCorrectChars}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Correct Chars</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{wpm * 5}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CPM</div>
            </div>
          </div>
          
          <GameInsight 
            score={wpm} 
            average={45} 
            isHigherBetter={true}
            fact="The average mobile typing speed is around 40-45 WPM, significantly slower than the desktop average of 52 WPM due to the lack of tactile feedback."
            formatScore={(s) => `${s} WPM`}
          />
        </GameResult>
      );
    }

    if (gameState === 'countdown') {
      return (
        <div className={styles.countdownScreen}>
          <div className={styles.countdownNumber}>
            {countdown > 0 ? countdown : 'GO!'}
          </div>
        </div>
      );
    }

    if (gameState === 'playing') {
      return (
        <div className={styles.playArea}>
          <div className={styles.gameHeader}>
            <div className={styles.progressLabel}>Message {sentenceIndex + 1}</div>
            <div className={`${styles.timer} ${timeLeft <= 10 ? styles.warning : ''}`}>
              0:{timeLeft.toString().padStart(2, '0')}
            </div>
          </div>
          
          <div 
            className={styles.chatContainer} 
            onClick={() => inputRef.current?.focus()}
          >
            <div className={styles.chatBubble}>
              {renderText}
            </div>
            
            <input 
              ref={inputRef}
              type="text" 
              className={styles.hiddenInput}
              value={typedChars.join('')}
              onChange={handleInputChange}
              onPaste={handlePaste}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </div>
          
          <div className={styles.instructionText}>
            Type to reply. Auto-advances when finished.
          </div>
        </div>
      );
    }

    // Waiting State
    return (
      <div className={styles.startScreen}>
        <Smartphone size={56} className={styles.icon} />
        <h2>Mobile Typing Test</h2>
        <p>How fast can you actually type on your phone? Find out in 45 seconds.</p>
        <button className={styles.startBtn} onClick={startCountdown}>Start Test</button>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/mobile-typing"
      title="Mobile Typing Speed Test"
      subtitle="Designed specifically for smartphones. Measure your true touchscreen WPM and accuracy."
      category="Mobile Skill"
      heroGradient="linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)"
      heroTextColor="rgba(219, 234, 254, 0.85)"
      heroAccentColor="rgba(147, 197, 253, 0.7)"
      stats={[
        { value: '45s', label: 'Time limit' },
        { value: '40 WPM', label: 'Mobile avg' },
        { value: '94%', label: 'Avg accuracy' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Desktop Typing', path: '/typing', icon: <MessageCircle size={18} />, color: '#6366f1' },
        { name: 'Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
      ]}
      infoContent={<MobileTypingInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
