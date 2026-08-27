import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Home, 
  Zap, 
  Grid3x3, 
  Target, 
  Keyboard, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import SEO from '../components/SEO';
import styles from './NotFound.module.css';

const POPULAR_TESTS = [
  {
    name: 'Reaction Time',
    path: '/reaction-time',
    desc: 'Test your visual reflexes and reaction speed in milliseconds.',
    icon: Zap,
    color: '#ef4444'
  },
  {
    name: 'Sequence Memory',
    path: '/sequence-memory',
    desc: 'Remember an increasingly long sequence of flashing tiles.',
    icon: Grid3x3,
    color: '#3b82f6'
  },
  {
    name: 'Aim Trainer',
    path: '/aim-trainer',
    desc: 'Measure your click precision and target acquisition speed.',
    icon: Target,
    color: '#22c55e'
  },
  {
    name: 'Typing Test',
    path: '/typing',
    desc: 'Test your words-per-minute (WPM) speed and typing accuracy.',
    icon: Keyboard,
    color: '#6366f1'
  }
];

export default function NotFound() {
  return (
    <div className={styles.container}>
      <SEO
        title="404: Page Not Found | Human Benchmark"
        description="The page or cognitive test you are looking for does not exist or has moved. Explore our reaction time, memory, and aim benchmarks."
        canonical="https://humanbenchmark.in/404"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEO>

      <div className={styles.content}>
        {/* ── Badge & Header ── */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertCircle size={40} className={styles.errorIcon} />
          </div>
          <div className={styles.badge}>Error 404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.subtitle}>
            The benchmark, test, or page you were looking for doesn't exist, may have moved, or the link was mistyped.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.primaryButton}>
              <Home size={18} />
              <span>Back to Homepage</span>
            </Link>
            <Link to="/science" className={styles.secondaryButton}>
              <BookOpen size={18} />
              <span>Science Library</span>
            </Link>
          </div>
        </div>

        {/* ── Popular Benchmarks Recommendation ── */}
        <div className={styles.recommendations}>
          <h2 className={styles.recommendationsTitle}>
            Try Popular Cognitive Benchmarks
          </h2>
          <div className={styles.grid}>
            {POPULAR_TESTS.map((test) => {
              const Icon = test.icon;
              return (
                <Link key={test.path} to={test.path} className={styles.card}>
                  <div 
                    className={styles.cardIconWrapper}
                    style={{ backgroundColor: `${test.color}15`, color: test.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{test.name}</h3>
                      <ArrowRight size={16} className={styles.arrowIcon} />
                    </div>
                    <p className={styles.cardDesc}>{test.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
