import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthModal.module.css';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMsg(null);
      setPassword('');
    }
  }, [isAuthModalOpen, authModalMode]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) closeAuthModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (authModalMode === 'signup' && !username.trim()) {
      setErrorMsg('Please choose a username.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    if (authModalMode === 'login') {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMsg(error.message || 'Failed to sign in. Please check your credentials.');
      }
    } else {
      const { error } = await signUpWithEmail(email, password, username);
      if (error) {
        setErrorMsg(error.message || 'Failed to create account.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`${styles.overlay} ${isAuthModalOpen ? styles.isOpen : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      aria-hidden={!isAuthModalOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button
          className={styles.closeBtn}
          onClick={closeAuthModal}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <img src="/logo.png" alt="Human Benchmark" className={styles.logoImg} />
          </div>
          <h2 id="auth-modal-title" className={styles.title}>
            {authModalMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className={styles.subtitle}>
            {authModalMode === 'login'
              ? 'Sign in to save scores and track your cognitive progress'
              : 'Join to compete on leaderboards and customize your profile'}
          </p>
        </div>

        <div className={styles.tabGroup}>
          <button
            type="button"
            className={`${styles.tabBtn} ${authModalMode === 'login' ? styles.tabBtnActive : ''}`}
            onClick={() => openAuthModal('login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${authModalMode === 'signup' ? styles.tabBtnActive : ''}`}
            onClick={() => openAuthModal('signup')}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {authModalMode === 'signup' && (
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="auth-username">
                Username
              </label>
              <div className={styles.inputWrapper}>
                <User size={18} className={styles.inputIcon} />
                <input
                  id="auth-username"
                  type="text"
                  placeholder="e.g. reflex_king"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                  autoComplete="username"
                  maxLength={24}
                />
              </div>
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="auth-email">
              Email Address
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="auth-password">
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                autoComplete={authModalMode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className={styles.togglePassBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>{authModalMode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
              </>
            ) : (
              <span>{authModalMode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>

        <div className={styles.footerNote}>
          {authModalMode === 'login' ? (
            <>
              Don't have an account yet?
              <button
                type="button"
                className={styles.switchLink}
                onClick={() => openAuthModal('signup')}
              >
                Sign up free
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                type="button"
                className={styles.switchLink}
                onClick={() => openAuthModal('login')}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
