import { useState, useCallback } from 'react';
import type { ShareTheme } from '../types/share';

export function useShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ShareTheme>('classic');

  const openShare = useCallback(() => setIsOpen(true), []);
  const closeShare = useCallback(() => setIsOpen(false), []);
  const toggleTheme = useCallback((newTheme: ShareTheme) => setTheme(newTheme), []);

  return {
    isOpen,
    theme,
    openShare,
    closeShare,
    toggleTheme,
  };
}
