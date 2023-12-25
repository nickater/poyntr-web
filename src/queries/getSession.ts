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
  return client.from('sessions').select(`*, tickets(*, votes(*))`).eq('id', id).single()
}

export function getAllSessionsByOwnerId(
  client: SupabaseClient<Database>,
  ownerId: string
) {
  try {
    return client
      .from('sessions')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });
  } catch (error) {
    console.log('booop', error);

    console.error(error);
  }
}

export type SessionDeep = Awaited<ReturnType<typeof getSessionByIdDeep>>;

