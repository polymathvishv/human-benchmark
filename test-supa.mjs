import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
const supabaseUrl = envFile.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const supabaseKey = envFile.match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1].trim();

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const selectWithCountry = `
    id,
    user_id,
    game_id,
    score,
    created_at,
    profiles (
      username,
      avatar_color,
      country_code
    )
  `;

  const selectWithoutCountry = `
    id,
    user_id,
    game_id,
    score,
    created_at,
    profiles (
      username,
      avatar_color
    )
  `;

  let query = supabase.from('scores').select(selectWithCountry).limit(1);
  let { data, error } = await query;
  
  if (error && error.code === '42703') {
    console.log("Fallback triggered!");
    query = supabase.from('scores').select(selectWithoutCountry).limit(1);
    const retryResult = await query;
    data = retryResult.data;
    error = retryResult.error;
  }

  console.log("Error:", error);
  console.log("Data length:", data?.length);
}
test();
