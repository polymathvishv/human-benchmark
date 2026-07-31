import { Link } from 'react-router-dom';
import { Zap, Grid3x3, Target, Hash, MessageSquare, Keyboard, Smile, Smartphone, Layers } from 'lucide-react';
import { getHighScore } from '../hooks/useHighScore';
import SEO from '../components/SEO';
import styles from './Dashboard.module.css';

const GAMES = [
  {
    id: 'reaction-time',
    name: 'Reaction Time',
    description: 'Test your visual reflexes.',
    icon: Zap,
    color: '#ef4444',
    formatScore: (s: number) => `${s} ms`
  },
  {
    id: 'sequence-memory',
    name: 'Sequence Memory',
    description: 'Remember an increasingly long pattern of button presses.',
    icon: Grid3x3,
    color: '#3b82f6',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'aim-trainer',
    name: 'Aim Trainer',
    description: 'How quickly can you hit all the targets?',
    icon: Target,
    color: '#22c55e',
    formatScore: (s: number) => `${s} ms`
  },
  {
    id: 'number-memory',
    name: 'Number Memory',
    description: 'Remember the longest number you can.',
    icon: Hash,
    color: '#a855f7',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'verbal-memory',
    name: 'Verbal Memory',
    description: 'Keep as many words in short term memory as possible.',
    icon: MessageSquare,
    color: '#f59e0b',
    formatScore: (s: number) => `${s} words`
  },
  {
    id: 'chimp-test',
    name: 'Chimp Test',
    description: 'Are you smarter than a chimpanzee?',
    icon: Smile,
    color: '#ec4899',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'visual-memory',
    name: 'Visual Memory',
    description: 'Remember an increasingly large board of squares.',
    icon: Layers,
    color: '#14b8a6',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'typing',
    name: 'Typing',
    description: 'How many words per minute can you type?',
    icon: Keyboard,
    color: '#6366f1',
    formatScore: (s: number) => `${s} WPM`
  },
  {
    id: 'mobile-typing',
    name: 'Mobile Typing',
    description: 'How fast can you type on your phone?',
    icon: Smartphone,
    color: '#0ea5e9',
    formatScore: (s: number) => `${s} WPM`
  }
];

export default function Dashboard() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://humanbenchmark.in/#website",
        "url": "https://humanbenchmark.in/",
        "name": "Human Benchmark",
        "description": "Measure your abilities with brain games and cognitive tests.",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://humanbenchmark.in/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://humanbenchmark.in/#organization",
        "name": "Human Benchmark",
        "url": "https://humanbenchmark.in/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://humanbenchmark.in/favicon.svg"
        }
      }
    ]
  };

  return (
    <>
      <SEO jsonLd={schema} />
      <div className="main-content-contained">
        <div className={styles.dashboard}>
          <div className={styles.hero}>
            <Zap className={styles.heroIcon} />
            <h1 className={styles.title}>Human Benchmark</h1>
            <p className={styles.subtitle}>Measure your abilities with brain games and cognitive tests.</p>
            <Link to="/reaction-time" className={styles.ctaButton}>Get Started</Link>
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
                      Best: {game.formatScore(score)}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
