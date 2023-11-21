import { SupabaseClient } from '@supabase/supabase-js';

export function getProfileById(
  client: SupabaseClient,
  id: string
) {
  return client
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
}
