import { useState, useRef } from 'react';
import { SiWhatsapp, SiSnapchat, SiX, SiInstagram } from 'react-icons/si';
import { Copy, Download, Check, Loader2, Sparkles } from 'lucide-react';
import { FaLink } from 'react-icons/fa6';
import {
  captureElementAsBlob,
  copyImageBlobToClipboard,
  downloadImageBlob,
  canShareFileNative,
  shareNativeImage
} from '../../services/imageShareService';
import { copyToClipboard } from '../../services/clipboardService';
import styles from './ImageShareActions.module.css';

interface ImageShareActionsProps {
  cardRef: React.RefObject<HTMLElement | null>;
  fileName?: string;
  invitationText: string;
  shareUrl: string;
}

export default function ImageShareActions({
  cardRef,
  fileName = 'human-benchmark-score.png',
  invitationText,
  shareUrl,
}: ImageShareActionsProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [guideMessage, setGuideMessage] = useState<string | null>(null);
  const cachedBlobRef = useRef<Blob | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const getBlob = async (): Promise<Blob> => {
    if (cachedBlobRef.current) {
      return cachedBlobRef.current;
    }
    if (!cardRef.current) {
      throw new Error('Share card element not found in DOM');
    }
    const blob = await captureElementAsBlob(cardRef.current, 2.5);
    cachedBlobRef.current = blob;
    return blob;
  };

  const handleCopyImage = async () => {
    setLoadingAction('copy-img');
    try {
      const blob = await getBlob();
      const success = await copyImageBlobToClipboard(blob);
      if (success) {
        showFeedback('📸 Score card image copied to clipboard! Paste anywhere.');
      } else {
        // Fallback: download the image if direct clipboard image write is not supported
        downloadImageBlob(blob, fileName);
        showFeedback('💾 Image saved to device!');
      }
    } catch (err) {
      console.error(err);
      showFeedback('❌ Could not generate image. Please try again.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSaveImage = async () => {
    setLoadingAction('save-img');
    try {
      const blob = await getBlob();
      downloadImageBlob(blob, fileName);
      showFeedback('💾 Score card image saved to your device!');
    } catch (err) {
      console.error(err);
      showFeedback('❌ Could not save image.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleWhatsApp = async () => {
    setLoadingAction('whatsapp');
    try {
      const blob = await getBlob();
      const file = new File([blob], fileName, { type: 'image/png' });

      // On mobile devices supporting Web Share with files, invoke native drawer (supports direct image attach)
      if (canShareFileNative(file)) {
        await shareNativeImage(file, 'Human Benchmark Score', invitationText, shareUrl);
      } else {
        // Desktop / standard flow: copy image to clipboard & open WhatsApp with invitation text
        await copyImageBlobToClipboard(blob);
        const encodedText = encodeURIComponent(invitationText);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank', 'noopener,noreferrer');
        showFeedback('📸 Score card copied! Paste it in WhatsApp alongside your message.');
      }
    } catch (err) {
      console.error(err);
      const encodedText = encodeURIComponent(invitationText);
      window.open(`https://wa.me/?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleTwitter = async () => {
    setLoadingAction('twitter');
    try {
      const blob = await getBlob();
      await copyImageBlobToClipboard(blob);
      const encodedText = encodeURIComponent(invitationText);
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'noopener,noreferrer');
      showFeedback('📸 Score card image copied! Paste it into your Tweet.');
    } catch (err) {
      console.error(err);
      const encodedText = encodeURIComponent(invitationText);
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'noopener,noreferrer');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleInstagram = async () => {
    setLoadingAction('instagram');
    try {
      const blob = await getBlob();
      const file = new File([blob], fileName, { type: 'image/png' });

      // Try native share if on mobile (offers 1-tap Instagram Story)
      let sharedNatively = false;
      if (canShareFileNative(file)) {
        sharedNatively = await shareNativeImage(file, 'My Benchmark Score', invitationText, shareUrl);
      }

      if (!sharedNatively) {
        // Automatically download the PNG image to user's gallery / camera roll
        downloadImageBlob(blob, fileName);
        await copyImageBlobToClipboard(blob);
        setGuideMessage('Image saved to Photos! Open Instagram → tap "+" → share to your Story.');
        showFeedback('📸 Image saved! Ready to post on your Instagram Story.');
        
        // Open Instagram after brief delay
        setTimeout(() => {
          window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSnapchat = async () => {
    setLoadingAction('snapchat');
    try {
      const blob = await getBlob();
      const file = new File([blob], fileName, { type: 'image/png' });

      let sharedNatively = false;
      if (canShareFileNative(file)) {
        sharedNatively = await shareNativeImage(file, 'My Benchmark Score', invitationText, shareUrl);
      }

      if (!sharedNatively) {
        downloadImageBlob(blob, fileName);
        await copyImageBlobToClipboard(blob);
        setGuideMessage('Image saved to Photos! Open Snapchat → create Snap from Camera Roll.');
        showFeedback('📸 Image saved! Ready to share on Snapchat.');
        
        setTimeout(() => {
          window.open('https://www.snapchat.com/', '_blank', 'noopener,noreferrer');
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      window.open('https://www.snapchat.com/', '_blank', 'noopener,noreferrer');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) showFeedback('🔗 Site link copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      {guideMessage && (
        <div className={styles.storyGuide}>
          <Sparkles size={16} color="#60a5fa" />
          <span className={styles.storyGuideText}>{guideMessage}</span>
        </div>
      )}

      <div className={styles.actionsGrid}>
        {/* 1. Copy Image */}
        <button
          className={styles.platformBtn}
          onClick={handleCopyImage}
          disabled={loadingAction !== null}
          title="Copy high-res image to clipboard"
        >
          <div className={`${styles.iconContainer} ${styles['bg-copy-img']}`}>
            {loadingAction === 'copy-img' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <Copy size={22} />
            )}
          </div>
          <span className={styles.label}>Copy Image</span>
        </button>

        {/* 2. Save Image */}
        <button
          className={styles.platformBtn}
          onClick={handleSaveImage}
          disabled={loadingAction !== null}
          title="Download PNG image"
        >
          <div className={`${styles.iconContainer} ${styles['bg-save-img']}`}>
            {loadingAction === 'save-img' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <Download size={22} />
            )}
          </div>
          <span className={styles.label}>Save Image</span>
        </button>

        {/* 3. WhatsApp (Image + Invitation) */}
        <button
          className={styles.platformBtn}
          onClick={handleWhatsApp}
          disabled={loadingAction !== null}
          title="Share image & invite on WhatsApp"
        >
          <div className={`${styles.iconContainer} ${styles['bg-whatsapp']}`}>
            {loadingAction === 'whatsapp' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <SiWhatsapp size={24} />
            )}
          </div>
          <span className={styles.label}>WhatsApp</span>
        </button>

        {/* 4. Instagram Story */}
        <button
          className={styles.platformBtn}
          onClick={handleInstagram}
          disabled={loadingAction !== null}
          title="Share scorecard to Instagram Story"
        >
          <div className={`${styles.iconContainer} ${styles['bg-instagram']}`}>
            {loadingAction === 'instagram' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <SiInstagram size={22} color="white" />
            )}
          </div>
          <span className={styles.label}>Instagram</span>
        </button>

        {/* 5. Snapchat Story */}
        <button
          className={styles.platformBtn}
          onClick={handleSnapchat}
          disabled={loadingAction !== null}
          title="Share scorecard on Snapchat"
        >
          <div className={`${styles.iconContainer} ${styles['bg-snapchat']}`}>
            {loadingAction === 'snapchat' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <SiSnapchat size={24} color="black" />
            )}
          </div>
          <span className={styles.label}>Snapchat</span>
        </button>

        {/* 6. X (Twitter) */}
        <button
          className={styles.platformBtn}
          onClick={handleTwitter}
          disabled={loadingAction !== null}
          title="Share scorecard on X"
        >
          <div className={`${styles.iconContainer} ${styles['bg-twitter']}`}>
            {loadingAction === 'twitter' ? (
              <Loader2 size={22} className={styles.spinner} />
            ) : (
              <SiX size={20} />
            )}
          </div>
          <span className={styles.label}>X</span>
        </button>
      </div>

      {/* Secondary Action: Copy Link */}
      <button
        className={styles.platformBtn}
        onClick={handleCopyLink}
        style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', padding: '0.65rem' }}
      >
        <FaLink size={14} />
        <span className={styles.label} style={{ fontSize: '0.85rem' }}>Copy Site Link</span>
      </button>

      {/* Toast Feedback */}
      <div className={`${styles.feedbackToast} ${feedback ? styles.visible : ''}`}>
        <Check size={18} style={{ color: '#4ade80' }} />
        <span>{feedback}</span>
      </div>
    </div>
  );
}
