import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar_color: string;
  country_code: string | null;
  country_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
}
