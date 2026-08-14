import { useState } from 'react';
import { MessageSquare, Heart, Hash, Zap } from 'lucide-react';
import styles from './VerbalMemory.module.css';
import GameResult from '../../components/GameResult';
import GameInsight from '../../components/GameInsight';
import GamePageLayout from '../../components/GamePageLayout';
import VerbalMemoryInfo from './VerbalMemoryInfo';
import { WORDS } from '../../utils/words';
import { useHighScore } from '../../hooks/useHighScore';
import soundService from '../../services/soundService';

type GameState = 'waiting' | 'playing' | 'result';

export default function VerbalMemory() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentWord, setCurrentWord] = useState('');
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const { saveScore } = useHighScore('verbal-memory', true);
  const [animateWord, setAnimateWord] = useState(false);

  const getNextWord = (currentSeen: Set<string>) => {
    const showSeen = currentSeen.size > 0 && Math.random() < 0.4;
    if (showSeen) {
      const seenArray = Array.from(currentSeen);
      return seenArray[Math.floor(Math.random() * seenArray.length)];
    } else {
      let newWord = '';
      let attempts = 0;
      do {
        newWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        attempts++;
      } while (currentSeen.has(newWord) && attempts < 50);
      return newWord;
    }
  };

  const startGame = () => {
    const initialSeen = new Set<string>();
    setSeenWords(initialSeen);
    setScore(0);
    setLives(3);
    setCurrentWord(getNextWord(initialSeen));
    setGameState('playing');
  };

  const handleAnswer = (isSeen: boolean) => {
    const wordActuallySeen = seenWords.has(currentWord);
    let newLives = lives;
    let newScore = score;
    const newSeenWords = new Set(seenWords);

    if (isSeen === wordActuallySeen) {
      newScore += 1;
    } else {
      newLives -= 1;
      soundService.playLifeLost(newLives);
    }

    if (!wordActuallySeen) {
      newSeenWords.add(currentWord);
    }

    if (newLives === 0) {
      setScore(newScore);
      saveScore(newScore);
      setGameState('result');
    } else {
      setScore(newScore);
      setLives(newLives);
      setSeenWords(newSeenWords);
      setCurrentWord(getNextWord(newSeenWords));
      setAnimateWord(false);
      setTimeout(() => setAnimateWord(true), 10);
    }
  };

  const renderGame = () => {
    if (gameState === 'result') {
      return (
        <GameResult
          score={`${score} words`}
          label="Verbal Memory Score"
          icon={<MessageSquare size={40} />}
          onRetry={() => setGameState('waiting')}
          shareConfig={{
            gameId: 'verbal-memory',
            gameName: 'Verbal Memory',
            score: score,
            unit: 'words',
            isLowerBetter: false,
          }}
        >
          <GameInsight 
            score={score} 
            average={40} 
            isHigherBetter={true}
            fact="Verbal memory tests short-term recognition memory, which relies heavily on the hippocampus."
            formatScore={(s) => `${s} words`}
          />
        </GameResult>
      );
    }

    if (gameState === 'waiting') {
      return (
        <div className={styles.startScreen}>
          <MessageSquare size={56} className={styles.icon} />
          <h2>Verbal Memory</h2>
          <p>You will be shown words, one at a time. If you've seen a word during the test, click SEEN. If it's a new word, click NEW.</p>
          <button className={styles.startBtn} onClick={startGame}>Start</button>
        </div>
      );
    }

    return (
      <div className={styles.playArea}>
        <div className={styles.statsBar}>
          <div className={styles.lives}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart 
                key={i} 
                size={22} 
                className={i < lives ? styles.lifeActive : styles.lifeLost} 
                fill={i < lives ? 'var(--game-red)' : 'transparent'} 
              />
            ))}
          </div>
          <div className={styles.scoreDisplay}>Score: {score}</div>
        </div>

        <div className={styles.gameArea}>
          <h2 className={`${styles.word} ${animateWord ? styles.animate : ''}`}>
            {currentWord}
          </h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={() => handleAnswer(true)}>SEEN</button>
            <button className={styles.actionBtn} onClick={() => handleAnswer(false)}>NEW</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GamePageLayout
      path="/verbal-memory"
      title="Verbal Memory Test"
      subtitle="Words appear one at a time. Click Seen if you've encountered the word before, New if it's your first time. Three strikes and the test ends."
      category="Episodic Memory - Recognition"
      heroGradient="linear-gradient(135deg, #3b0764 0%, #6b21a8 45%, #7c3aed 100%)"
      heroTextColor="rgba(233, 213, 255, 0.85)"
      heroAccentColor="rgba(216, 180, 254, 0.7)"
      stats={[
        { value: '30–40', label: 'Global avg score' },
        { value: '100+', label: 'Top 5% score' },
        { value: '95%', label: 'Recognition accuracy' },
        { value: 'Free', label: 'No sign-up' },
      ]}
      relatedTests={[
        { name: 'Number Memory', path: '/number-memory', icon: <Hash size={18} />, color: '#a855f7' },
        { name: 'Reaction Time', path: '/reaction-time', icon: <Zap size={18} />, color: '#ef4444' },
      ]}
      aboutText="Verbal Memory tests short-term recognition memory for words. You see words one at a time and must label each NEW or SEEN. The longer the list, the more interference builds up between similar words. This task is related to the Yes/No recognition paradigm used in clinical memory assessments. Average users correctly classify around 50 words before making their first error."
      infoContent={<VerbalMemoryInfo />}
    >
      {renderGame()}
    </GamePageLayout>
  );
}
