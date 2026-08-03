import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string;
  avatar_color: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
}
