import { useState, useRef, useEffect, useMemo } from 'react';
import { Smartphone, Zap, MessageCircle } from 'lucide-react';
import styles from './MobileTypingTest.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import MobileTypingInfo from './MobileTypingInfo';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'countdown' | 'playing' | 'result';

const GAME_DURATION = 45; // 45 seconds

// Mobile-optimized sentence bank containing ONLY alphabets, commas, and full stops (.)
// Zero numbers, apostrophes, question marks, or symbols that require secondary keyboard screens (?123).
const SENTENCES = [
  // Short everyday messages
  "I am almost there.",
  "Please send me the address.",
  "I will call you in five minutes.",
  "Let us order pizza tonight.",
  "We should meet after work.",
  "My phone battery is low.",
  "See you soon.",
  "I just woke up, give me a minute.",
  "Let me know when you arrive.",
  "Have a great day ahead.",
  "Thanks for the help today.",
  "I will be waiting outside for you.",
  "Can we talk later today.",
  "Everything looks good to me.",
  "I am heading out now, see you.",

  // Conversational sentences with commas and full stops
  "That movie was surprisingly good, I really liked the ending.",
  "The weather is beautiful today, we should go for a walk.",
  "I cannot believe how fast this whole year went by.",
  "Do not forget to grab some bread and milk on your way home.",
  "I will text you when I reach the train station, see you there.",
  "We can go for lunch tomorrow around noon, let me know.",
  "The coffee shop around the corner has great drinks.",
  "Please remember to lock the front door when you leave.",
  "I was thinking about our plans, and I think we should go early.",
  "Take your time, there is no need to rush.",
  "She told me about the new project, it sounds very exciting.",
  "I finished reading the book, and it was truly amazing.",
  "If you have some free time, give me a quick call.",
  "We should try that new restaurant downtown this weekend.",
  "The sunset looks incredible today, look out the window.",

  // Flow and rhythm sentences
  "Practice makes typing faster, especially when using two thumbs.",
  "Touch typing on glass takes practice, but muscle memory helps a lot.",
  "Speed and accuracy are both important, so keep a steady pace.",
  "Quick brown foxes jump over lazy dogs, as the old saying goes.",
  "Good morning, I hope you slept well and feel energized.",
  "I left my keys on the table, please keep them safe for me.",
  "We are planning a road trip next month, you should join us.",
  "The train was slightly delayed, but I am on my way now.",
  "Always stay focused, breathe calmly, and keep your thumbs moving.",
  "Every small improvement counts, so keep practicing every day.",
  "Finding a good balance between speed and precision is the key.",
  "It is always a pleasure to learn new things and build great habits.",
  "Listen carefully, follow the rhythm, and do your best."
];

export default function MobileTypingTest() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [countdown, setCountdown] = useState(3);
  
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [targetText, setTargetText] = useState('');
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const lastIndexRef = useRef<number>(-1);
  
  // Tracking refs to avoid stale closure in timer intervals
  const completedCorrectCharsRef = useRef(0);
  const completedTotalCharsRef = useRef(0);
  const currentTypedCharsRef = useRef<string[]>([]);
  const currentTargetTextRef = useRef<string>('');
  const startTimeRef = useRef<number>(0);

  // Metrics state for results display
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
  }, [gameState, sentenceIndex]);

  const loadRandomSentence = () => {
    let nextIdx = Math.floor(Math.random() * SENTENCES.length);
    if (nextIdx === lastIndexRef.current && SENTENCES.length > 1) {
      nextIdx = (nextIdx + 1) % SENTENCES.length;
    }
    lastIndexRef.current = nextIdx;
    const newText = SENTENCES[nextIdx];
    setTargetText(newText);
    currentTargetTextRef.current = newText;
    setTypedChars([]);
    currentTypedCharsRef.current = [];
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const finishGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Combine completed sentences + in-progress sentence characters
    let totalCorrect = completedCorrectCharsRef.current;
    let totalTyped = completedTotalCharsRef.current;

    const currentTyped = currentTypedCharsRef.current;
    const currentTarget = currentTargetTextRef.current;

    for (let i = 0; i < currentTyped.length; i++) {
      totalTyped++;
      if (currentTyped[i] === currentTarget[i]) {
        totalCorrect++;
      }
    }

    // Standard WPM formula: (Total Correct Characters / 5) / (Test Duration in minutes)
    // 45s test duration = 45 / 60 = 0.75 minutes
    const testDurationMinutes = GAME_DURATION / 60;
    const calculatedWpm = Math.max(0, Math.round((totalCorrect / 5) / testDurationMinutes));
    const calculatedAccuracy = totalTyped === 0 ? 100 : Math.round((totalCorrect / totalTyped) * 100);

    setTotalCorrectChars(totalCorrect);
    setTotalTypedChars(totalTyped);
    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    saveScore(calculatedWpm);
    soundService.playVictory();
    setGameState('result');
  };

  // Countdown logic
  useEffect(() => {
    if (gameState === 'countdown') {
      if (countdown > 0) {
        soundService.playCountdownTick(false);
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        soundService.playCountdownTick(true);
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
            if (timerRef.current) clearInterval(timerRef.current);
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

  const startCountdown = () => {
    setCountdown(3);
    setTimeLeft(GAME_DURATION);
    completedCorrectCharsRef.current = 0;
    completedTotalCharsRef.current = 0;
    currentTypedCharsRef.current = [];
    currentTargetTextRef.current = '';
    setTotalCorrectChars(0);
    setTotalTypedChars(0);
    setSentenceIndex(0);
    setGameState('countdown');
  };

  const startGameplay = () => {
    loadRandomSentence();
    startTimeRef.current = performance.now();
    setGameState('playing');
  };

  // We use onChange on a hidden input to capture mobile keyboard events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'playing') return;
    
    const value = e.target.value;
    const currentTarget = currentTargetTextRef.current;
    // Limit to current target text length
    const boundedValue = value.slice(0, currentTarget.length);
    const newTyped = boundedValue.split('');
    
    if (newTyped.length > currentTypedCharsRef.current.length) {
      const lastChar = newTyped[newTyped.length - 1];
      const targetChar = currentTarget[newTyped.length - 1];
      if (lastChar === targetChar) {
        soundService.playKeyClick();
      } else {
        soundService.playTypo();
      }
    }
    
    setTypedChars(newTyped);
    currentTypedCharsRef.current = newTyped;
    
    // Check if sentence is completed
    if (newTyped.length === currentTarget.length && currentTarget.length > 0) {
      let correctInSentence = 0;
      for (let i = 0; i < newTyped.length; i++) {
        if (newTyped[i] === currentTarget[i]) correctInSentence++;
      }
      
      completedCorrectCharsRef.current += correctInSentence;
      completedTotalCharsRef.current += newTyped.length;
      
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', width: '100%', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{totalTypedChars}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Typed</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{totalCorrectChars}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Correct Chars</div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{Math.round(wpm * 5)}</div>
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
