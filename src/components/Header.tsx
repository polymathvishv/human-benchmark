import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, ChevronDown, Award, Settings, Trophy, Swords, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';
import EditProfileModal from './auth/EditProfileModal';
import styles from './Header.module.css';

export default function Header() {
  const { user, profile, signOut, openAuthModal } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  const displayName = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
  const avatarGradient = profile?.avatar_color || 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
  const initial = displayName.charAt(0).toUpperCase();

  const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/battle', label: 'Battles', icon: <Swords size={14} /> },
    { to: '/dashboard', label: 'Score Card' },
    { to: '/science', label: 'Science' },
    { to: '/about', label: 'About' },
  ];

  return (
    <>
      <header className={`${styles.header} glass`}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="Human Benchmark Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Human Benchmark</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.navLink} ${location.pathname === link.to ? styles.navLinkActive : ''}`}
                style={link.icon ? { display: 'flex', alignItems: 'center', gap: '0.35rem' } : undefined}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {/* Desktop Auth */}
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
                      <Link to="/dashboard" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                        <Award size={16} /><span>My Score Card</span>
                      </Link>
                      <Link to="/leaderboard" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                        <Trophy size={16} /><span>Global Leaderboards</span>
                      </Link>
                      <button className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); setIsEditProfileOpen(true); }}>
                        <Settings size={16} /><span>Edit Profile</span>
                      </button>
                      <button className={`${styles.dropdownItem} ${styles.dropdownSignOut}`} onClick={handleSignOut}>
                        <LogOut size={16} /><span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button className={styles.loginBtn} onClick={() => openAuthModal('login')}>
                  <User size={15} /><span>Log In</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Right: Avatar/Login + Hamburger */}
          <div className={styles.mobileRight}>
            {user ? (
              <button
                className={styles.mobileAvatarBtn}
                onClick={() => { setIsMobileMenuOpen(false); setIsEditProfileOpen(true); }}
                aria-label="Edit profile"
              >
                <div className={styles.userAvatar} style={{ background: avatarGradient }}>
                  {initial}
                </div>
              </button>
            ) : (
              <button className={styles.loginBtn} onClick={() => openAuthModal('login')}>
                <User size={15} /><span>Log In</span>
              </button>
            )}
            <button
              className={styles.hamburger}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Human Benchmark Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Human Benchmark</span>
          </Link>
          <button className={styles.drawerClose} onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* User info row if logged in */}
        {user && (
          <div className={styles.drawerUserRow}>
            <div className={styles.userAvatar} style={{ background: avatarGradient, width: 40, height: 40, fontSize: '1.1rem' }}>
              {initial}
            </div>
            <div>
              <div className={styles.drawerUserName}>{displayName}</div>
              <div className={styles.drawerUserEmail}>{user.email}</div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.drawerNavLink} ${location.pathname === link.to ? styles.drawerNavLinkActive : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon && <span className={styles.drawerNavIcon}>{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer Auth Actions */}
        <div className={styles.drawerFooter}>
          {user ? (
            <>
              <button className={styles.drawerActionBtn} onClick={() => { setIsMobileMenuOpen(false); setIsEditProfileOpen(true); }}>
                <Settings size={16} />Edit Profile
              </button>
              <button className={`${styles.drawerActionBtn} ${styles.drawerSignOutBtn}`} onClick={handleSignOut}>
                <LogOut size={16} />Sign Out
              </button>
            </>
          ) : (
            <button className={styles.drawerLoginBtn} onClick={() => { setIsMobileMenuOpen(false); openAuthModal('login'); }}>
              <User size={16} />Log In / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Global Auth & Profile Modals */}
      <AuthModal />
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
}
