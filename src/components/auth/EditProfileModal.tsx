import React, { useState, useEffect } from 'react';
import { X, User, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './EditProfileModal.module.css';

const AVATAR_PALETTES = [
  { name: 'Sapphire Blue', gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' },
  { name: 'Emerald Mint', gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' },
  { name: 'Sunset Amber', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
  { name: 'Royal Purple', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
  { name: 'Neon Cyber', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { name: 'Ruby Crimson', gradient: 'linear-gradient(135deg, #e11d48 0%, #f97316 100%)' },
];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { profile, updateProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_PALETTES[0].gradient);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setAvatarColor(profile.avatar_color || AVATAR_PALETTES[0].gradient);
      setErrorMsg(null);
    }
  }, [profile, isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Username cannot be empty.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    const { error } = await updateProfile({
      username: username.trim(),
      avatar_color: avatarColor,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Failed to update profile.');
    } else {
      onClose();
    }
  };

  const initial = username.trim() ? username.trim().charAt(0).toUpperCase() : 'U';

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
          <X size={18} />
        </button>

        <div className={styles.header}>
          <h2 id="edit-profile-title" className={styles.title}>
            Customize Profile
          </h2>
          <p className={styles.subtitle}>Update your display username and avatar theme.</p>
        </div>

        <div className={styles.previewSection}>
          <div className={styles.avatarPreview} style={{ background: avatarColor }}>
            {initial}
          </div>
        </div>

        {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="edit-username">
              Display Username
            </label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                id="edit-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                maxLength={24}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Avatar Color Palette</label>
            <div className={styles.colorGrid}>
              {AVATAR_PALETTES.map((pal) => (
                <button
                  type="button"
                  key={pal.name}
                  title={pal.name}
                  className={`${styles.colorSwatch} ${
                    avatarColor === pal.gradient ? styles.colorSwatchActive : ''
                  }`}
                  style={{ background: pal.gradient }}
                  onClick={() => setAvatarColor(pal.gradient)}
                >
                  {avatarColor === pal.gradient && <Check size={16} color="white" />}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
