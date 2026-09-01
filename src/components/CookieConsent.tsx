import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import styles from './CookieConsent.module.css';

const CONSENT_KEY = 'hb_cookie_consent';

type ConsentValue = 'accepted' | 'rejected';

/**
 * Loads the Google AdSense script dynamically after consent.
 * This is a GDPR requirement — AdSense must NOT load before the user
 * explicitly accepts advertising cookies.
 */
function loadAdSenseScript() {
  if (document.querySelector('script[src*="adsbygoogle"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8374551667006298';
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    if (stored === 'accepted') {
      // User previously consented — load ads
      loadAdSenseScript();
    } else if (!stored) {
      // No decision yet — show banner
      // Small delay so it doesn't compete with initial page paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    // If 'rejected', do nothing — no banner, no ads
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    loadAdSenseScript();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-label="Cookie consent">
      <div className={styles.banner}>
        <div className={styles.content}>
          <Shield size={20} className={styles.icon} aria-hidden="true" />
          <div className={styles.textBlock}>
            <p className={styles.title}>We value your privacy</p>
            <p className={styles.description}>
              We use essential cookies to make this site work. With your consent, we also use
              analytics cookies (Google Analytics) to understand how you interact with our tests,
              and advertising cookies (Google AdSense) to show relevant ads that help keep Human
              Benchmark free. You can read more in our{' '}
              <a href="/privacy">Privacy Policy</a>.
            </p>
            <div className={styles.actions}>
              <button className={styles.acceptBtn} onClick={handleAccept}>
                Accept All Cookies
              </button>
              <button className={styles.rejectBtn} onClick={handleReject}>
                Necessary Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
