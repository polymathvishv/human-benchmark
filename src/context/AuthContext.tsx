import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { syncLocalAndCloudScores } from '../services/scoreService';
import { detectCountry } from '../services/geoService';
import type { UserProfile } from '../types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSyncingScores: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<{ error: Error | null; user: User | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  updateProfile: (updates: { username?: string; avatar_color?: string }) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  syncScores: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncingScores, setIsSyncingScores] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist yet (e.g. trigger hasn't fired or manual insert needed)
        console.warn('Profile fetch note:', error.message);
        return null;
      }
      return data as UserProfile;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  /**
   * If a user's profile has no country set, detect it via IP geolocation
   * and silently update their profile in the background.
   */
  const backfillCountryIfMissing = useCallback(async (userId: string, currentProfile: UserProfile | null) => {
    if (!currentProfile || currentProfile.country_code) return;

    try {
      const geo = await detectCountry();
      if (geo) {
        await supabase
          .from('profiles')
          .update({
            country_code: geo.country_code,
            country_name: geo.country_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);
      }
    } catch (err) {
      console.warn('Country backfill failed (non-critical):', err);
    }
  }, []);

  const syncScores = useCallback(async () => {
    const currentUserId = user?.id || session?.user?.id;
    if (!currentUserId) return;

    setIsSyncingScores(true);
    try {
      await syncLocalAndCloudScores(currentUserId);
    } catch (err) {
      console.error('Error in syncScores:', err);
    } finally {
      setIsSyncingScores(false);
    }
  }, [user?.id, session?.user?.id]);

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      const userProfile = await fetchProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    }
  }, [user?.id, fetchProfile]);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).then(p => {
          setProfile(p);
          backfillCountryIfMissing(session.user.id, p);
        });
        syncLocalAndCloudScores(session.user.id);
      }
      setIsLoading(false);
    });

    // Auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const p = await fetchProfile(session.user.id);
        setProfile(p);
        backfillCountryIfMissing(session.user.id, p);
        syncLocalAndCloudScores(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, backfillCountryIfMissing]);

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      closeAuthModal();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      if (error) throw error;

      // If user profile is not immediately created by trigger (e.g. trigger not installed yet), ensure fallback
      if (data.user) {
        // Detect country in parallel (non-blocking)
        const geoPromise = detectCountry();

        const existing = await fetchProfile(data.user.id);
        if (!existing) {
          const geo = await geoPromise;
          await supabase.from('profiles').insert({
            id: data.user.id,
            username: username.trim() || `User_${data.user.id.slice(0, 6)}`,
            email: email.trim(),
            avatar_color: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            country_code: geo?.country_code || null,
            country_name: geo?.country_name || null,
          });
          const newProfile = await fetchProfile(data.user.id);
          setProfile(newProfile);
        }
      }

      closeAuthModal();
      return { error: null, user: data.user };
    } catch (err: any) {
      return { error: err, user: null };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setProfile(null);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const updateProfile = async (updates: { username?: string; avatar_color?: string }) => {
    if (!user) return { error: new Error('User not logged in') };

    try {
      const payload = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...payload });

      if (error) throw error;

      await refreshProfile();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isSyncingScores,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateProfile,
        refreshProfile,
        syncScores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
