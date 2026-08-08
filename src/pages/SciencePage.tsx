import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Layers, 
  Eye, 
  Activity, 
  Cpu, 
  Search, 
  BookOpen, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Award,
  BarChart2,
  Sparkles,
  Clock
} from 'lucide-react';
import SEO from '../components/SEO';
import { SCIENCE_ARTICLES, SCIENCE_CATEGORIES, type ScienceCategory, type ScienceArticle } from '../data/scienceArticles';
import styles from './SciencePage.module.css';

const FAQS = [
  {
    q: 'Why does Human Benchmark maintain a Cognitive Science Library?',
    a: 'Every test on Human Benchmark is rooted in empirical neuropsychology, psychophysics, and information theory (such as Hick\'s Law, Fitts\'s Law, and Miller\'s 7±2 span). Our library provides transparent research insights, mathematical models, and biological mechanisms behind your scores.'
  },
  {
    q: 'What is the difference between Simple Reaction Time and Cognitive Processing Speed?',
    a: 'Simple reaction time (SRT) measures peripheral nerve conduction and simple motor reflexes (~220ms). Cognitive processing speed measures the rate at which executive prefrontal networks inspect, categorize, and transform complex symbolic information before deciding.'
  },
  {
    q: 'Can cognitive benchmark scores actually be improved through targeted practice?',
    a: 'Yes, through task-specific neuroplastic learning (e.g. mastering chunking in Visual Memory or improving eye-hand span in Typing Test). While transfer to general fluid intelligence (Gf) is modest, training motor acquisition, working memory chunking, and attentional focus provides measurable benefits for gaming, sports, and multitasking.'
  },
  {
    q: 'How does hardware (monitor refresh rate, mouse polling) affect reaction time scores?',
    a: 'Displays and input devices add physical latency: 60Hz monitors introduce up to 16.7ms of frame scan delay, while 240Hz monitors reduce this to 4.2ms. USB mouse polling rates (125Hz vs 1000Hz) add another 1–7ms. Human Benchmark uses high-precision timing APIs (`performance.now()`) to eliminate browser-level execution jitter.'
  },
  {
    q: 'How does Human Benchmark calculate global percentiles?',
    a: 'Our percentiles are calculated from continuous parametric probability distribution fits over millions of authenticated benchmark trials worldwide using specialized log-normal or Gaussian kernel density models.'
  }
];

export default function SciencePage() {
  const [selectedCategory, setSelectedCategory] = useState<ScienceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const filteredArticles = useMemo(() => {
    return SCIENCE_ARTICLES.filter((art: ScienceArticle) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch = 
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryIcon = (cat: ScienceCategory | 'all') => {
    switch (cat) {
      case 'reaction-time': return <Zap size={14} />;
      case 'memory': return <Layers size={14} />;
      case 'attention': return <Eye size={14} />;
      case 'processing-speed': return <Activity size={14} />;
      case 'brain-science': return <Cpu size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Cognitive Science & Research Library | Human Benchmark",
    "url": "https://humanbenchmark.in/science",
    "description": "Explore 26 peer-reviewed cognitive science articles covering reaction time, working memory, attention, processing speed, and neuroscience.",
    "publisher": {
      "@type": "Organization",
      "name": "Human Benchmark",
      "url": "https://humanbenchmark.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://humanbenchmark.in/og-image.png?v=2.0"
      }
    },
    "mainEntity": SCIENCE_ARTICLES.map((art) => ({
      "@type": "ScholarlyArticle",
      "headline": art.title,
      "description": art.excerpt,
      "about": art.categoryLabel,
      "url": `https://humanbenchmark.in/science/${art.slug}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://humanbenchmark.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Science Library",
        "item": "https://humanbenchmark.in/science"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const combinedSchemas = [collectionSchema, breadcrumbSchema, faqSchema];

  return (
    <div className={styles.pageWrapper}>
      <SEO
        title="Cognitive Science & Research Library (26 Articles) - Human Benchmark"
        description="Explore 26 in-depth research articles on reaction time, working memory, visual attention, processing speed, and neuroplasticity. Grounded in peer-reviewed neuroscience."
        keywords="cognitive science library, human benchmark science, reaction time research, working memory neuroscience, stroop effect, hicks law, fitts law, ebbinghaus forgetting curve, chimp memory ayumu, 240hz reaction time"
        canonical="https://humanbenchmark.in/science"
        jsonLd={combinedSchemas}
      />

      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <Activity size={15} />
            <span>26 Research Studies & Psychometric Models</span>
          </div>
          <h1 className={styles.heroTitle}>
            The Science of <span className={styles.heroGradientText}>Human Cognition</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Every benchmark on our platform is grounded in biophysical neural pathways, standardized 
            psychometric equations, and empirical literature. Dive into our complete library of 26 cognitive science studies.
          </p>

          {/* Key Metrics Bar */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statVal}>26</div>
              <div className={styles.statLabel}>Peer-Reviewed Studies</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>5</div>
              <div className={styles.statLabel}>Cognitive Domains</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>10M+</div>
              <div className={styles.statLabel}>Global Trials Benchmarked</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statVal}>99.8%</div>
              <div className={styles.statLabel}>Timing Precision</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className={styles.container}>

        {/* ── Filter Bar & Search ── */}
        <div className={styles.filterBar}>
          <div className={styles.tabsList} role="tablist">
            {SCIENCE_CATEGORIES.map((cat) => (
              <button 
                key={cat.id}
                className={`${styles.tabBtn} ${selectedCategory === cat.id ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search 26 studies, formulas, neurobiology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* ── Articles Grid ── */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((art) => (
            <article 
              key={art.slug} 
              className={`${styles.articleCard} ${art.featured ? styles.featuredCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={styles.categoryTag}>{art.categoryLabel}</span>
                  {art.featured && (
                    <span className={styles.featuredBadge}>
                      <Sparkles size={11} />
                      Featured Study
                    </span>
                  )}
                </div>
                <div className={styles.cardIconWrapper}>
                  {getCategoryIcon(art.category)}
                </div>
              </div>

              <h2 className={styles.articleTitle}>
                <Link to={`/science/${art.slug}`} className={styles.articleTitleLink}>
                  {art.title}
                </Link>
              </h2>
              <p className={styles.articleExcerpt}>{art.excerpt}</p>

              {/* Key stat badges preview */}
              {art.keyStats.length > 0 && (
                <div className={styles.cardStatPreview}>
                  <span className={styles.statPreviewVal}>{art.keyStats[0].value}</span>
                  <span className={styles.statPreviewLabel}>{art.keyStats[0].label}</span>
                </div>
              )}

              <div className={styles.cardFooter}>
                <Link 
                  to={`/science/${art.slug}`}
                  className={styles.readMoreBtn}
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.775rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} />
                    {art.readTime}
                  </span>
                  <Link to={art.relatedGame.path} className={styles.testLink}>
                    <span>Play Test</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Scientific Methodology Section ── */}
        <section className={styles.methodologySection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Measurement Standard</span>
            <h3 className={styles.sectionTitle}>How Human Benchmark Measures Brain Performance</h3>
            <p className={styles.sectionSubtitle}>
              Benchmarking human cognition in a browser requires overcoming diverse hardware refresh rates, 
              operating system compositors, and input device latencies.
            </p>
          </div>

          <div className={styles.methodGrid}>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}><Cpu size={20} /></div>
              <h4>Sub-Millisecond Timing APIs</h4>
              <p>
                We use high-resolution web platform timers (<code>performance.now()</code>) capable of microsecond precision, 
                eliminating event loop clock drift and variable execution delays.
              </p>
            </div>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}><BarChart2 size={20} /></div>
              <h4>Global Percentile Normalization</h4>
              <p>
                Scores are mapped against parametric distribution models calibrated over millions of completed sessions, 
                providing an accurate standing compared to global peers.
              </p>
            </div>
            <div className={styles.methodCard}>
              <div className={styles.methodIcon}><Award size={20} /></div>
              <h4>Strict Artifact & Outlier Filtering</h4>
              <p>
                Anticipatory clicks (&lt;100ms in reaction time) and automated bot behavior are identified and segregated 
                to ensure authentic, scientific distribution graphs.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Knowledge Base</span>
            <h3 className={styles.sectionTitle}>Frequently Asked Scientific Questions</h3>
            <p className={styles.sectionSubtitle}>
              Common neuropsychology, measurement, and cognitive science questions answered.
            </p>
          </div>

          <div className={styles.faqList}>
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaqIndex === idx;
              return (
                <div key={idx} className={styles.faqItem}>
                  <button 
                    className={styles.faqQuestion}
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isExpanded && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className={styles.ctaBanner}>
          <h3 className={styles.ctaTitle}>Ready to Test Your Cognitive Abilities?</h3>
          <p className={styles.ctaSubtitle}>
            Compare your reaction speed, working memory capacity, and motor precision against millions of benchmarked users globally.
          </p>
          <Link to="/" className={styles.ctaBtn}>
            <span>Explore All 8 Tests</span>
            <ArrowRight size={16} />
          </Link>
        </section>

      </main>
    </div>
  );
}
