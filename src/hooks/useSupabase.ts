import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing env vars SUPABASE_PROJECT_URL and SUPABASE_ANON_KEY');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

function useSupabase() {
  return useMemo(() => createClient<Database>(supabaseUrl, supabaseKey), []);
}

export default useSupabase;
