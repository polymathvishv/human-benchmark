import { useEffect, useRef } from 'react';
import styles from './AdContainer.module.css';

interface AdContainerProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  responsive?: boolean;
  minHeight?: number | string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * AdContainer
 * 
 * High-performance, CLS-safe Google AdSense placement container.
 * Features:
 *  - Reserved min-height prevents Cumulative Layout Shift (CLS) when ad loads
 *  - SSR-safe (does not execute window/DOM calls during prerendering)
 *  - Gracefully respects cookie consent state
 */
export default function AdContainer({
  slot,
  format = 'auto',
  responsive = true,
  minHeight = 100,
  className = '',
}: AdContainerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Check if user has consented to cookies/ads
    const consent = localStorage.getItem('hb_cookie_consent');
    if (consent !== 'accepted') return;

    if (!pushedRef.current && adRef.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        console.debug('AdSense push error (expected if adblock is enabled):', err);
      }
    }
  }, []);

  const minHeightStyle = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;

  return (
    <div
      className={`${styles.adContainer} ${className}`}
      style={{ minHeight: minHeightStyle }}
      aria-label="Advertisement"
    >
      <span className={styles.adLabel}>Advertisement</span>
      <ins
        ref={adRef}
        className={`adsbygoogle ${styles.adSlot}`}
        data-ad-client="ca-pub-8374551667006298"
        data-ad-slot={slot || undefined}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
