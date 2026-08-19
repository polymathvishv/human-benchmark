import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <img src="/logo.webp" alt="Human Benchmark Logo" className={styles.brandLogo} />
          <span className={styles.brandName}>Human Benchmark</span>
        </Link>
        <div className={styles.linksWrapper}>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupLabel}>Platform</span>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/science" className={styles.link}>Science</Link>
            <Link to="/contact" className={styles.link}>Contact Us</Link>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.linkGroupLabel}>Legal</span>
            <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link to="/terms" className={styles.link}>Terms of Service</Link>
          </div>
        </div>
        <div className={styles.copyright}>
          <p className={styles.disclaimer}>
            Human Benchmark tests are for educational and entertainment purposes only.
            Not a substitute for medical or psychological assessment.
          </p>
          &copy; {new Date().getFullYear()} Human Benchmark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

