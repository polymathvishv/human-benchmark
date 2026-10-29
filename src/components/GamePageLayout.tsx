import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import SEO from './SEO';
import SoundToggle from './SoundToggle';
import GameLeaderboardWidget from './leaderboard/GameLeaderboardWidget';
import GameFaqSection from './GameFaqSection';
import type { GameFaq } from '../data/gameFaqs';
import { SCIENCE_ARTICLES } from '../data/scienceArticles';
import styles from './GamePageLayout.module.css';

interface HeroStat {
  value: string;
  label: string;
}

interface RelatedTest {
  name: string;
  path: string;
  icon: ReactNode;
  color: string;
}

interface GamePageLayoutProps {
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  subtitle: string;
  category: string;
  heroGradient: string;
  heroTextColor?: string;
  heroAccentColor?: string;
  stats: HeroStat[];
  children: ReactNode;
  infoContent: ReactNode;
  relatedTests?: RelatedTest[];
  path?: string;
  gameId?: string;
  aboutText?: string;
  faqs?: GameFaq[];
  headerAccessory?: ReactNode;
}

export default function GamePageLayout({
  title,
  seoTitle,
  seoDescription,
  subtitle,
  category,
  heroGradient,
  heroTextColor = 'rgba(255,255,255,0.7)',
  heroAccentColor = 'rgba(255,255,255,0.7)',
  stats,
  children,
  infoContent,
  relatedTests = [],
  path = '',
  gameId,
  aboutText,
  faqs = [],
  headerAccessory,
}: GamePageLayoutProps) {
  const fullUrl = `https://humanbenchmark.in${path}`;
  
  // Find related science articles for bidirectional internal topic clusters
  const relatedArticles = SCIENCE_ARTICLES.filter(
    (article) => article.relatedGame?.path === path
  ).slice(0, 3);
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareApplication", "WebApplication"],
        "name": title,
        "description": aboutText || subtitle,
        "applicationCategory": "GameApplication",
        "applicationSubCategory": "Cognitive Test",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Works in all modern browsers.",
        "url": fullUrl,
        "inLanguage": "en",
        "author": {
          "@type": "Person",
          "name": "Vishv Kamani",
          "email": "vishv@humanbenchmark.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Human Benchmark",
          "url": "https://humanbenchmark.in/",
          "@id": "https://humanbenchmark.in/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "Free to use — no account required",
          "Works on desktop and mobile",
          "Global percentile comparison",
          "Multiplayer battle mode"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://humanbenchmark.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tests",
            "item": "https://humanbenchmark.in/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": fullUrl
          }
        ]
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${fullUrl}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <>
      <SEO 
        title={seoTitle || (title.endsWith('Test') ? title : `${title} Test`)} 
        description={seoDescription || subtitle}
        canonical={fullUrl}
        jsonLd={schema}
      />
      <div className={styles.pageWrapper}>
      {/* Hero Banner */}
      <section className={styles.hero} style={{ background: heroGradient }}>
        <div className={styles.heroInner}>
          {headerAccessory && (
            <div className={styles.heroAccessory}>
              {headerAccessory}
            </div>
          )}
          <p className={styles.heroCategory} style={{ color: heroAccentColor }}>{category}</p>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle} style={{ color: heroTextColor }}>{subtitle}</p>
          <div className={styles.heroStats}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.heroStatCard}>
                <div className={styles.heroStatValue}>{stat.value}</div>
                <div className={styles.heroStatLabel} style={{ color: heroAccentColor }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb & Sound Controls */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <div className={styles.breadcrumbLeft}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <Link to="/" className={styles.breadcrumbLink}>Tests</Link>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <span className={styles.breadcrumbCurrent}>{title}</span>
          </div>
          <SoundToggle />
        </div>
      </div>

      {/* Two-column layout */}
      <div className={styles.contentArea}>
        <div className={styles.twoCol}>
          {/* Main Column */}
          <div className={styles.mainCol}>
            {/* Overview / Introduction above the game */}
            {aboutText && (
              <div className={styles.introCard}>
                <h2 className={styles.introTitle}>Overview &amp; Purpose</h2>
                <p className={styles.introText}>{aboutText}</p>
              </div>
            )}

            {/* Game Area */}
            <div className={styles.gameContainer}>
              <div className={styles.gameArea}>
                {children}
              </div>
            </div>

            {/* Info Content - always visible */}
            <div className={styles.infoArea}>
              {infoContent}
            </div>

            {/* FAQ Section — visible accordion + FAQPage schema for rich snippets */}
            {faqs.length > 0 && (
              <GameFaqSection faqs={faqs} gameTitle={title} />
            )}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Real-Time Global Leaderboard Widget */}
            {(gameId || path.replace('/', '')) && (
              <GameLeaderboardWidget
                gameId={gameId || path.replace('/', '')}
                gameTitle={title}
                limit={5}
              />
            )}

            {relatedTests.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Related Tests</h3>
                {relatedTests.map((test) => (
                  <Link key={test.path} to={test.path} className={styles.relatedTest}>
                    <div className={styles.relatedTestIcon} style={{ backgroundColor: `${test.color}15`, color: test.color }}>
                      {test.icon}
                    </div>
                    {test.name}
                  </Link>
                ))}
              </div>
            )}

            {relatedArticles.length > 0 && (
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={16} style={{ color: '#3b82f6' }} />
                  Related Research
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/science/${article.slug}`}
                      className={styles.relatedArticleLink}
                    >
                      <div className={styles.relatedArticleTitle}>
                        {article.title}
                      </div>
                      <div className={styles.relatedArticleMeta}>
                        <span className={styles.relatedArticleTag}>{article.categoryLabel}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>About This Test</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
                {aboutText || `${title} is one of the core cognitive benchmarks on Human Benchmark. Play to track your score, see your global percentile, and monitor your improvement over time.`}
              </p>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </>
  );
}
