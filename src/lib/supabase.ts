import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yvziyskbcovltajgzmsv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2eml5c2tiY292bHRhamd6bXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODA0MTUsImV4cCI6MjEwMTI1NjQxNX0.6k2WbI4Cy6lLeuG89-LplY8RlbKKK1EnQ1aiGIovCfw';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
