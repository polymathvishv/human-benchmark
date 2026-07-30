import { Link } from 'react-router-dom';
import { Zap, Grid3x3, Target, Hash, MessageSquare, Keyboard, Smile } from 'lucide-react';
import { getHighScore } from '../hooks/useHighScore';
import styles from './Dashboard.module.css';

// Using some standard icons for now since lucide doesn't have a monkey icon
// We'll use different icons that fit best.

const GAMES = [
  {
    id: 'reaction-time',
    name: 'Reaction Time',
    description: 'Test your visual reflexes.',
    icon: Zap,
    color: '#ef4444', // red
    formatScore: (s: number) => `${s} ms`
  },
  {
    id: 'sequence-memory',
    name: 'Sequence Memory',
    description: 'Remember an increasingly long pattern of button presses.',
    icon: Grid3x3,
    color: '#3b82f6' // blue
  },
  {
    id: 'aim-trainer',
    name: 'Aim Trainer',
    description: 'How quickly can you hit all the targets?',
    icon: Target,
    color: '#22c55e', // green
    formatScore: (s: number) => `${s} ms`
  },
  {
    id: 'number-memory',
    name: 'Number Memory',
    description: 'Remember the longest number you can.',
    icon: Hash,
    color: '#a855f7', // purple
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'verbal-memory',
    name: 'Verbal Memory',
    description: 'Keep as many words in short term memory as possible.',
    icon: MessageSquare,
    color: '#f59e0b', // yellow
    formatScore: (s: number) => `${s} words`
  },
  {
    id: 'chimp-test',
    name: 'Chimp Test',
    description: 'Are you smarter than a chimpanzee?',
    icon: Smile, // using Smile as placeholder for chimp
    color: '#ec4899', // pink
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'visual-memory',
    name: 'Visual Memory',
    description: 'Remember an increasingly large board of squares.',
    icon: Grid3x3,
    color: '#14b8a6', // teal
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'typing',
    name: 'Typing',
    description: 'How many words per minute can you type?',
    icon: Keyboard,
    color: '#6366f1', // indigo
    formatScore: (s: number) => `${s} WPM`
  }
];

export default function Dashboard() {
  return (
    <div className="main-content-contained">
    <div className={styles.dashboard}>
      <div className={styles.hero}>
        <Zap className={styles.heroIcon} />
        <h1 className={styles.title}>Human Benchmark</h1>
        <p className={styles.subtitle}>Measure your abilities with brain games and cognitive tests.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </div>

      <div className={styles.grid}>
        {GAMES.map((game) => {
          const Icon = game.icon;
          const score = getHighScore(game.id);
          return (
            <Link to={`/${game.id}`} key={game.id} className={`${styles.card} glass`}>
              <div className={styles.iconWrapper} style={{ backgroundColor: `${game.color}20`, color: game.color }}>
                <Icon size={32} />
              </div>
              <h2 className={styles.cardTitle}>{game.name}</h2>
              <p className={styles.cardDesc}>{game.description}</p>
              {score !== null && (
                <div className={styles.highScore}>
                  Best: {game.formatScore ? game.formatScore(score) : score}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
    </div>
  );
}
