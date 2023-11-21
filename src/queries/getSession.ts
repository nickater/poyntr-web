import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

export function getSessionById(
  client: SupabaseClient<Database>,
  id: string
) {
  return client
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single();
}

export function getSessionByIdDeep(
  client: SupabaseClient<Database>,
  id: string
) {
  return client
    .from('sessions')
    .select('*, tickets(*, votes(*))')
    .eq('id', id).single()
}

export type SessionDeep = Awaited<ReturnType<typeof getSessionByIdDeep>>;

