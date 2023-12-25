import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing env vars SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY');
}

let client: ReturnType<typeof createClient<Database>> | undefined;

export function useSupabase() {
  if (client) {
    return client;
  }

  client = createClient<Database>(
    supabaseUrl,
    supabaseKey,
  );

  return client;
}