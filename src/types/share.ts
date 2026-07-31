import type { ReactNode } from 'react';

export type ShareTheme = 'classic' | 'dark' | 'gradient';

export interface ShareConfig {
  gameId: string;
  gameName: string;
  score: string | number;
  unit: string;
  isLowerBetter?: boolean;
  percentile?: number; // Optional until backend is ready
  icon?: ReactNode; // For the preview card
}

export interface SharePlatform {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  action: (config: ShareConfig) => Promise<boolean>;
}
