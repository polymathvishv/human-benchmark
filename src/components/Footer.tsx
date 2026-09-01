import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <Link to="/" className={styles.brand}>
            <img src="/logo.webp" alt="Human Benchmark Logo" className={styles.brandLogo} />
            <span className={styles.brandName}>Human Benchmark</span>
          </Link>
          <div className={styles.linksWrapper}>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Cognitive Tests</span>
              <Link to="/reaction-time" className={styles.link}>Reaction Time</Link>
              <Link to="/sequence-memory" className={styles.link}>Sequence Memory</Link>
              <Link to="/aim-trainer" className={styles.link}>Aim Trainer</Link>
              <Link to="/number-memory" className={styles.link}>Number Memory</Link>
              <Link to="/visual-memory" className={styles.link}>Visual Memory</Link>
              <Link to="/typing" className={styles.link}>Typing Speed</Link>
              <Link to="/chimp-test" className={styles.link}>Chimp Test</Link>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Science &amp; Articles</span>
              <Link to="/science/what-is-reaction-time" className={styles.link}>What is Reaction Time?</Link>
              <Link to="/science/working-memory-explained" className={styles.link}>Working Memory Guide</Link>
              <Link to="/science/fitts-law" className={styles.link}>Fitts's Law &amp; Aim</Link>
              <Link to="/science/chimp-memory-research" className={styles.link}>Ayumu Chimp Memory</Link>
              <Link to="/science" className={styles.link}>All 26 Science Articles &rarr;</Link>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Platform</span>
              <Link to="/about" className={styles.link}>About Human Benchmark</Link>
              <Link to="/leaderboard" className={styles.link}>Global Leaderboard</Link>
              <Link to="/battle" className={styles.link}>Multiplayer Battles</Link>
              <Link to="/contact" className={styles.link}>Contact &amp; Support</Link>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Legal &amp; Privacy</span>
              <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
              <Link to="/terms" className={styles.link}>Terms of Service</Link>
              <Link to="/privacy#cookies" className={styles.link}>Cookie Policy &amp; Ads</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.disclaimer}>
            Human Benchmark tests are for educational and entertainment purposes only.
            Not a substitute for medical or psychological assessment.
          </p>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Human Benchmark. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

