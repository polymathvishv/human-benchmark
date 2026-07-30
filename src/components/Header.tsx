import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Activity className={styles.icon} />
          <span>Human Benchmark</span>
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Dashboard</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
