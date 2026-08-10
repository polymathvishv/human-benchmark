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
        <div className={styles.links}>
          <Link to="/about" className={styles.link}>About</Link>
          <Link to="/science" className={styles.link}>Science</Link>
          <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
          <Link to="/contact" className={styles.link}>Contact Us</Link>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Human Benchmark. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
