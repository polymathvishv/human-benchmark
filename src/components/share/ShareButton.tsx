import { Share2 } from 'lucide-react';
import styles from './ShareButton.module.css';

interface ShareButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ShareButton({ onClick, label = "Share" }: ShareButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={styles.button}
      aria-label="Open share menu"
    >
      <Share2 size={20} className={styles.icon} />
      {label}
    </button>
  );
}
