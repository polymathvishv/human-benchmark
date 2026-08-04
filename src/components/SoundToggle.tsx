import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import soundService from '../services/soundService';
import styles from './SoundToggle.module.css';

interface SoundToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function SoundToggle({ className = '', showLabel = true }: SoundToggleProps) {
  const [isMuted, setIsMuted] = useState(soundService.isMuted());

  useEffect(() => {
    const unsubscribe = soundService.subscribe((muted) => {
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
    // Play a brief test blip when unmuting so user knows sound is working
    if (!muted) {
      soundService.playReactionResult();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.soundToggleBtn} ${isMuted ? styles.muted : styles.active} ${className}`}
      onClick={handleToggle}
      title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
    >
      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      {showLabel && (
        <span className={styles.label}>
          {isMuted ? 'Sound Off' : 'Sound On'}
        </span>
      )}
    </button>
  );
}
