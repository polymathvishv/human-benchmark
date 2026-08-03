import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SEO from './SEO';
import GameLeaderboardWidget from './leaderboard/GameLeaderboardWidget';
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
}

export default function GamePageLayout({
  title,
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
}: GamePageLayoutProps) {
  const fullUrl = `https://humanbenchmark.in${path}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": title,
        "description": subtitle,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any",
        "url": fullUrl,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
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
      }
    ]
  };

  return (
    <>
      <SEO 
        title={`${title} Test`} 
        description={subtitle}
        canonical={fullUrl}
        jsonLd={schema}
      />
      <div className={styles.pageWrapper}>
      {/* Hero Banner */}
      <section className={styles.hero} style={{ background: heroGradient }}>
        <div className={styles.heroInner}>
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

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <Link to="/" className={styles.breadcrumbLink}>Tests</Link>
          <ChevronRight size={14} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className={styles.contentArea}>
        <div className={styles.twoCol}>
          {/* Main Column */}
          <div className={styles.mainCol}>
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

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>About This Test</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
                This test measures a specific cognitive ability. Play to climb the global leaderboard and track your brain metrics!
              </p>
            </div>
          </aside>
        </div>
      </div>
      </div>
    </>
  );
}
