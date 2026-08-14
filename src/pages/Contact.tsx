import styles from './Contact.module.css';
import { Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Human Benchmark"
        description="Get in touch with the Human Benchmark team. Report bugs, suggest new cognitive tests, or send feedback. We respond within 24-48 hours."
        canonical="https://humanbenchmark.in/contact"
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Mail size={48} className={styles.icon} />
          </div>
          <h1 className={styles.heading}>Contact Us</h1>
          <p className={styles.text}>
            We'd love to hear from you. Whether you have a question about the cognitive tests, want to report a bug, or have a suggestion for a new feature, our team is ready to listen.
          </p>

          <div className={styles.card}>
            <h2 className={styles.cardHeading}>Get in Touch via Email</h2>
            <p className={styles.cardText}>
              For all inquiries, please email us directly at:
            </p>
            <a href="mailto:contact@humanbenchmark.in" className={styles.emailLink}>
              contact@humanbenchmark.in
            </a>
            <p className={styles.cardText} style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
              We typically respond within 24-48 hours. If you're reporting a bug, please include details about your browser and device.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
