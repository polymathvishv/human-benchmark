import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, Award, Settings, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';
import EditProfileModal from './auth/EditProfileModal';
import styles from './Header.module.css';

export default function Header() {
  const { user, profile, signOut, openAuthModal } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signOut();
    navigate('/');
  };

  const displayName = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
  const avatarGradient = profile?.avatar_color || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header className={`${styles.header} glass`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Human Benchmark Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Human Benchmark</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/leaderboard" className={styles.navLink}>
              Leaderboard
            </Link>
            <Link to="/dashboard" className={styles.navLink}>Score Card</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>

            {/* Auth Button / Profile Menu */}
            <div className={styles.authActions}>
              {user ? (
                <div className={styles.userMenuWrapper} ref={dropdownRef}>
                  <button
                    className={styles.userPill}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-label="User profile menu"
                  >
                    <div className={styles.userAvatar} style={{ background: avatarGradient }}>
                      {initial}
                    </div>
                    <span className={styles.userName}>{displayName}</span>
                    <ChevronDown size={14} style={{ opacity: 0.6 }} />
                  </button>

                  {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownHeader}>
                        <p className={styles.dropdownUserEmail}>{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        className={styles.dropdownItem}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Award size={16} />
                        <span>My Score Card</span>
                      </Link>

                      <Link
                        to="/leaderboard"
                        className={styles.dropdownItem}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Trophy size={16} />
                        <span>Global Leaderboards</span>
                      </Link>

                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsEditProfileOpen(true);
                        }}
                      >
                        <Settings size={16} />
                        <span>Edit Profile</span>
                      </button>

                      <button
                        className={`${styles.dropdownItem} ${styles.dropdownSignOut}`}
                        onClick={handleSignOut}
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={styles.loginBtn}
                  onClick={() => openAuthModal('login')}
                >
                  <User size={15} />
                  <span>Log In</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Global Auth & Profile Modals */}
      <AuthModal />
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
}
