import { useState } from 'react';
import type { ShareConfig } from '../../types/share';
import { getShareMessage, getShareUrl } from '../../services/shareService';
import { copyToClipboard } from '../../services/clipboardService';
import { SiWhatsapp, SiSnapchat, SiX, SiInstagram } from 'react-icons/si';
import { FaLink } from 'react-icons/fa6';
import { Check } from 'lucide-react';
import styles from './ShareOptions.module.css';

interface ShareOptionsProps {
  config: ShareConfig;
}

export default function ShareOptions({ config }: ShareOptionsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const text = getShareMessage(config);
  const url = getShareUrl(config.gameId);
  const encodedText = encodeURIComponent(text);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    if (success) showFeedback('Link copied to clipboard!');
  };

  return (
    <>
      <div className={styles.grid}>
        <button className={styles.platformBtn} onClick={handleCopyLink}>
          <div className={`${styles.iconContainer} ${styles['bg-copy']}`}>
            <FaLink size={34} />
          </div>
          <span className={styles.label}>Copy Link</span>
        </button>

        <a 
          href={`https://wa.me/?text=${encodedText}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.platformBtn}
        >
          <div className={`${styles.iconContainer} ${styles['bg-whatsapp']}`}>
            <SiWhatsapp size={36} />
          </div>
          <span className={styles.label}>WhatsApp</span>
        </a>

        <a 
          href={`https://twitter.com/intent/tweet?text=${encodedText}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.platformBtn}
        >
          <div className={`${styles.iconContainer} ${styles['bg-twitter']}`}>
            <SiX size={32} />
          </div>
          <span className={styles.label}>X</span>
        </a>

        <a 
          href={`https://www.instagram.com/`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.platformBtn}
        >
          <div className={`${styles.iconContainer} ${styles['bg-instagram']}`}>
            <SiInstagram size={34} color="white" />
          </div>
          <span className={styles.label}>Instagram</span>
        </a>

        <a 
          href={`https://www.snapchat.com/`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.platformBtn}
        >
          <div className={`${styles.iconContainer} ${styles['bg-snapchat']}`}>
            <SiSnapchat size={36} color="white" />
          </div>
          <span className={styles.label}>Snapchat</span>
        </a>
      </div>

      <div className={`${styles.feedbackToast} ${feedback ? styles.visible : ''}`}>
        <Check size={18} />
        {feedback}
      </div>
    </>
  );
}
