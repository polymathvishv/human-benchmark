import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, Grid3x3, Target, Hash, MessageSquare, Keyboard,
  Smile, Smartphone, Layers, ChevronDown, Sparkles, Brain, Award
} from 'lucide-react';
import { getHighScore } from '../hooks/useHighScore';
import SEO from '../components/SEO';
import styles from './Dashboard.module.css';

const GAMES = [
  {
    id: 'reaction-time',
    name: 'Reaction Time',
    description: 'Test your visual reflexes and reaction speed.',
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
    description: 'How quickly and accurately can you hit all 30 targets?',
    icon: Target,
    color: '#22c55e',
    formatScore: (s: number) => `${s} ms`
  },
  {
    id: 'number-memory',
    name: 'Number Memory',
    description: 'Remember the longest sequence of numbers you can.',
    icon: Hash,
    color: '#a855f7',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'verbal-memory',
    name: 'Verbal Memory',
    description: 'Keep as many distinct words in short-term working memory.',
    icon: MessageSquare,
    color: '#f59e0b',
    formatScore: (s: number) => `${s} words`
  },
  {
    id: 'chimp-test',
    name: 'Chimp Test',
    description: 'Test your working memory against primate capabilities.',
    icon: Smile,
    color: '#ec4899',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'visual-memory',
    name: 'Visual Memory',
    description: 'Remember an increasingly large spatial board of squares.',
    icon: Layers,
    color: '#14b8a6',
    formatScore: (s: number) => `Level ${s}`
  },
  {
    id: 'typing',
    name: 'Typing Test',
    description: 'Measure how many words per minute (WPM) you type.',
    icon: Keyboard,
    color: '#6366f1',
    formatScore: (s: number) => `${s} WPM`
  },
  {
    id: 'mobile-typing',
    name: 'Mobile Typing',
    description: 'Test your true smartphone touchscreen typing speed.',
    icon: Smartphone,
    color: '#0ea5e9',
    formatScore: (s: number) => `${s} WPM`
  }
];

const FAQS = [
  {
    q: "What is the Human Benchmark test suite?",
    a: "Human Benchmark is a premier collection of online cognitive, perceptual, and motor performance tests. It accurately measures essential human capabilities like visual reaction time, short-term working memory, verbal recall, target aim, and typing speed."
  },
  {
    q: "What are typical human benchmark scores for reaction time?",
    a: "The global median reaction time for human benchmark tests is approximately 273–284 milliseconds. Top 10% performers consistently achieve reaction times below 200 ms, while competitive gamers and athletes can record reflex speeds in the 150–180 ms range."
  },
  {
    q: "How does the Chimp Test work on Human Benchmark?",
    a: "The Chimp Test evaluates spatial working memory. Based on landmark Kyoto University cognitive research by Tetsuro Matsuzawa showing young chimpanzees outperforming adult humans at photographic number recall, the test flashes numbers on screen and asks you to tap them in numerical order once hidden."
  },
  {
    q: "Are the Human Benchmark tests free and available on mobile?",
    a: "Yes! All Human Benchmark tests are 100% free with no downloads required. The site includes dedicated mobile-friendly tests like the Mobile Typing Test and full responsive support across phones, tablets, and desktop browsers."
  },
  {
    q: "How do I save and sync my high scores across devices?",
    a: "You can create a free account or log in with email to automatically sync your personal best high scores to the cloud, track your percentile ranking, and compete on the real-time Global Leaderboards."
  }
];

export default function Dashboard() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://humanbenchmark.in/#website",
        "url": "https://humanbenchmark.in/",
        "name": "Human Benchmark",
        "alternateName": [
          "Human Benchmark",
          "HumanBenchmark",
          "Human Benchmark Online"
        ],
        "description": "How fast is your brain? Test your reaction time, sequence memory, aim, and typing speed against global averages with free cognitive benchmarks.",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://humanbenchmark.in/leaderboard?game={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": "https://humanbenchmark.in/#test-list",
        "name": "Human Benchmark Cognitive Tests",
        "itemListElement": GAMES.map((game, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": `${game.name} Test`,
          "url": `https://humanbenchmark.in/${game.id}`
        }))
      },
      {
        "@type": "FAQPage",
        "@id": "https://humanbenchmark.in/#faq",
        "mainEntity": FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title="Human Benchmark - Reaction Time, Memory & Brain Tests"
        description="How fast is your brain? Test your reaction time, sequence memory, aim, and typing speed. Compare your score with global averages. Free instant brain tests."
        jsonLd={schema}
      />
      
      <div className="main-content-contained">
        <div className={styles.dashboard}>
          
          {/* ── Hero ── */}
          <div className={styles.hero}>
            <Zap className={styles.heroIcon} />
            <h1 className={styles.title}>Human Benchmark</h1>
            <p className={styles.subtitle}>
              Measure your brain's abilities with cognitive benchmarks, reaction tests, and global leaderboards.
            </p>
            <Link to="/reaction-time" className={styles.ctaButton}>Get Started</Link>
          </div>

          {/* ── Tests Grid ── */}
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

          {/* ── SEO Guide & Cognitive Information Section ── */}
          <section className={styles.seoSection}>
            <div className={styles.seoHeader}>
              <div className={styles.seoBadge}>
                <Brain size={14} />
                <span>Cognitive Performance Suite</span>
              </div>
              <h2 className={styles.seoTitle}>Why Measure Your Brain with Human Benchmark?</h2>
              <p className={styles.seoDescription}>
                Human Benchmark is the standard online platform for quantifying cognitive reflexes, perceptual speed, and memory capacity.
              </p>
            </div>

            <div className={styles.infoGrid}>
              <div className={`${styles.infoCard} glass`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Zap size={22} color="#ef4444" />
                  <h3 className={styles.infoCardTitle} style={{ margin: 0 }}>Reaction & Motor Speed</h3>
                </div>
                <p className={styles.infoCardText}>
                  Test how quickly your central nervous system processes visual stimuli through the Reaction Time Test and Aim Trainer. Measure millisecond response delays and pinpoint peak alertness.
                </p>
              </div>

              <div className={`${styles.infoCard} glass`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Layers size={22} color="#3b82f6" />
                  <h3 className={styles.infoCardTitle} style={{ margin: 0 }}>Working & Spatial Memory</h3>
                </div>
                <p className={styles.infoCardText}>
                  Strengthen your short-term recall with Sequence Memory, Visual Memory, and Number Memory. Discover how many chunks of information your working memory can hold under time pressure.
                </p>
              </div>

              <div className={`${styles.infoCard} glass`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Award size={22} color="#a855f7" />
                  <h3 className={styles.infoCardTitle} style={{ margin: 0 }}>Global Percentile Rankings</h3>
                </div>
                <p className={styles.infoCardText}>
                  Compare your personal bests against thousands of players worldwide on real-time leaderboards. Sync your scorecard across all your devices with cloud backups.
                </p>
              </div>
            </div>

            {/* ── FAQ Section ── */}
            <div className={styles.seoHeader} style={{ marginTop: '2rem' }}>
              <div className={styles.seoBadge}>
                <Sparkles size={14} />
                <span>Answers to Common Questions</span>
              </div>
              <h2 className={styles.seoTitle}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqContainer}>
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`${styles.faqItem} glass`}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          opacity: 0.7,
                          flexShrink: 0
                        }}
                      />
                    </button>
                    <div
                      id={`faq-answer-${idx}`}
                      className={styles.faqAnswer}
                      style={{ display: isOpen ? 'block' : 'none' }}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
