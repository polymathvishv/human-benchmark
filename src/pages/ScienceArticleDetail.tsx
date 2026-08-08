import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Zap,
  Layers,
  Eye,
  Activity,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import SEO from '../components/SEO';
import DataVisualizer from '../components/science/DataVisualizer';
import { SCIENCE_ARTICLES } from '../data/scienceArticles';
import styles from './ScienceArticleDetail.module.css';

export default function ScienceArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const article = SCIENCE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/science" replace />;
  }

  const relatedArticles = SCIENCE_ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  // ── Multi-Schema JSON-LD: ScholarlyArticle + Breadcrumbs + FAQPage + Speakable ──
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "name": article.title,
    "description": article.excerpt,
    "articleSection": article.categoryLabel,
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": "Human Benchmark Science Lab",
      "url": "https://humanbenchmark.in/science"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Human Benchmark",
      "url": "https://humanbenchmark.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://humanbenchmark.in/og-image.png?v=2.0"
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.publishedDate,
    "mainEntityOfPage": `https://humanbenchmark.in/science/${article.slug}`,
    "image": "https://humanbenchmark.in/og-image.png?v=2.0",
    "about": {
      "@type": "Thing",
      "name": article.categoryLabel
    },
    "citation": article.academicCitations,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [`.${styles.aeoSummaryText}`, `.${styles.articleTitle}`, `.${styles.takeawaysList}`]
    }
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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.categoryLabel,
        "item": "https://humanbenchmark.in/science"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": article.title,
        "item": `https://humanbenchmark.in/science/${article.slug}`
      }
    ]
  };

  const faqSchema = article.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const combinedSchemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  const getCategoryIcon = () => {
    switch (article.category) {
      case 'reaction-time': return <Zap size={14} />;
      case 'memory': return <Layers size={14} />;
      case 'attention': return <Eye size={14} />;
      case 'processing-speed': return <Activity size={14} />;
      case 'brain-science': return <Cpu size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <SEO
        title={`${article.title} - Human Benchmark Science`}
        description={article.excerpt}
        keywords={`${article.title}, ${article.categoryLabel}, cognitive science, neuropsychology, reaction time research, working memory study, brain benchmark, ${article.keyStats.map(s => s.label).join(', ')}`}
        canonical={`https://humanbenchmark.in/science/${article.slug}`}
        type="article"
        jsonLd={combinedSchemas}
      >
        <meta property="article:published_time" content={article.publishedDate} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.categoryLabel} />
      </SEO>

      <article className={styles.container}>
        {/* ── Breadcrumb Navigation ── */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link to="/science" className={styles.breadcrumbLink}>Science Library</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{article.categoryLabel}</span>
        </nav>

        {/* ── Article Header ── */}
        <header className={styles.articleHeader}>
          <div className={styles.categoryBadge}>
            {getCategoryIcon()}
            <span>{article.categoryLabel}</span>
          </div>

          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleSubtitle}>{article.subtitle}</p>

          <div className={styles.metaBar}>
            <div className={styles.metaItem}>
              <User size={15} />
              <span>{article.author}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={15} />
              <span>{article.readTime}</span>
            </div>
            <div className={styles.metaItem}>
              <Sparkles size={15} color="#2563eb" />
              <span>Peer-Reviewed Science</span>
            </div>
          </div>

          {/* ── AEO: Quick Answer / Key Definitional Summary ── */}
          <section className={styles.aeoBox} aria-label="Direct Answer">
            <div className={styles.aeoHeader}>
              <BrainCircuit size={16} />
              <span>Quick Answer / Key Definition</span>
            </div>
            <p className={styles.aeoSummaryText}>
              {article.excerpt}
            </p>
          </section>
        </header>

        {/* ── Key Metrics Highlight Row ── */}
        {article.keyStats.length > 0 && (
          <section className={styles.statsRow} aria-label="Key Empirical Metrics">
            {article.keyStats.map((stat, idx) => (
              <div key={idx} className={styles.statCard}>
                <div className={styles.statVal}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                {stat.subtext && <div className={styles.statSubtext}>{stat.subtext}</div>}
              </div>
            ))}
          </section>
        )}

        {/* ── Data Visualization Component (if applicable) ── */}
        {article.visualization && (
          <DataVisualizer visualization={article.visualization} />
        )}

        {/* ── Article Body Content ── */}
        <main className={styles.articleBody}>
          {article.sections.map((section, sIdx) => (
            <section key={sIdx}>
              <h2 className={styles.articleH2}>{section.heading}</h2>

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className={styles.articleP}>{para}</p>
              ))}

              {section.bullets && (
                <ul className={styles.articleList}>
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}

              {section.subsections && (
                <div className={styles.negativeList}>
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx} className={styles.negativeItem}>
                      <div className={styles.negativeHeader}>
                        {sub.isNegative ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                        <span>{sub.title}</span>
                      </div>
                      <div className={styles.negativeDesc}>{sub.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* ── Key Takeaways Box ── */}
          {article.keyTakeaways.length > 0 && (
            <section className={styles.takeawaysBox} aria-label="Key Takeaways">
              <div className={styles.takeawaysTitle}>
                <CheckCircle2 size={20} color="#2563eb" />
                <span>Key Neuropsychological Takeaways</span>
              </div>
              <ul className={styles.takeawaysList}>
                {article.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx}>{takeaway}</li>
                ))}
              </ul>
            </section>
          )}
        </main>

        {/* ── Related Test Banner CTA ── */}
        <aside className={styles.gameCtaCard} aria-label="Benchmark Game">
          <div className={styles.gameCtaText}>
            <h3>Test Your Abilities on the {article.relatedGame.name}</h3>
            <p>
              Put the science to the test. Benchmark your cognitive speed and working memory against global percentiles.
            </p>
          </div>
          <Link to={article.relatedGame.path} className={styles.gameCtaBtn}>
            <span>{article.relatedGame.ctaText}</span>
            <ArrowRight size={16} />
          </Link>
        </aside>

        {/* ── Academic Bibliography / Citations ── */}
        {article.academicCitations.length > 0 && (
          <section className={styles.citationSection} aria-label="Academic Citations">
            <h3 className={styles.citationTitle}>
              <BookOpen size={18} color="#2563eb" />
              <span>Academic Citations & Literature</span>
            </h3>
            <ul className={styles.citationList}>
              {article.academicCitations.map((cite, cIdx) => (
                <li key={cIdx}>{cite}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ── FAQ Section (Indexed for AEO & Google People Also Ask) ── */}
        {article.faq.length > 0 && (
          <section className={styles.faqSection} aria-label="Frequently Asked Questions">
            <h3 className={styles.faqHeader}>Frequently Asked Questions</h3>
            {article.faq.map((faq, fIdx) => {
              const isExpanded = expandedFaqIndex === fIdx;
              return (
                <div key={fIdx} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                    aria-expanded={isExpanded}
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isExpanded && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* ── Related Articles from the Domain ── */}
        {relatedArticles.length > 0 && (
          <nav className={styles.relatedSection} aria-label="Related Scientific Articles">
            <h3 className={styles.relatedTitle}>More Studies in {article.categoryLabel}</h3>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} to={`/science/${rel.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedCategory}>{rel.categoryLabel}</span>
                  <h4 className={styles.relatedCardTitle}>{rel.title}</h4>
                  <span className={styles.relatedReadTime}>{rel.readTime}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </article>
    </div>
  );
}
