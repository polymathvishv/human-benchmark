import { useState } from 'react';
import { Trophy, Save, TrendingUp, UserPlus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './SignUpPromptBanner.module.css';

/**
 * A non-intrusive inline banner shown to guest (non-logged-in) users
 * on the game result screen. Encourages them to create an account
 * to save scores permanently and appear on leaderboards.
 *
 * Dismissed state is persisted per session so it doesn't nag on every game.
 */

const SESSION_DISMISS_KEY = 'hb-signup-prompt-dismissed';

export default function SignUpPromptBanner() {
  const { user, isLoading, openAuthModal } = useAuth();

  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_DISMISS_KEY) === '1';
  });

  // Don't show if user is logged in, still loading auth, or dismissed
  if (user || isLoading || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_DISMISS_KEY, '1');
  };

  return (
    <div className={styles.banner}>
      <button
        className={styles.dismissBtn}
        onClick={handleDismiss}
        aria-label="Dismiss sign-up prompt"
      >
        <X size={14} />
      </button>

      <div className={styles.bannerContent}>
        <div className={styles.iconBubble}>
          <Trophy size={22} />
        </div>

        <div className={styles.textBlock}>
          <div className={styles.bannerTitle}>
            Save your score &amp; climb the leaderboard
          </div>
          <p className={styles.bannerDesc}>
            Your result is only saved on this device. Create a free account to keep it forever and compete globally.
          </p>

          <div className={styles.perks}>
            <span className={styles.perk}>
              <Save size={12} className={styles.perkIcon} />
              Permanent scores
            </span>
            <span className={styles.perk}>
              <TrendingUp size={12} className={styles.perkIcon} />
              Global leaderboards
            </span>
            <span className={styles.perk}>
              <UserPlus size={12} className={styles.perkIcon} />
              Free forever
            </span>
          </div>

          <div className={styles.bannerActions}>
            <button
              className={styles.signUpBtn}
              onClick={() => openAuthModal('signup')}
            >
              <UserPlus size={15} />
              Create Free Account
            </button>
            <button
              className={styles.loginLink}
              onClick={() => openAuthModal('login')}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
