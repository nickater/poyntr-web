import { SupabaseClient } from '@supabase/supabase-js';
import { Err, Ok, Result } from 'ts-results';
import { SessionInsertDto, SessionType } from '../types';

export const getSessionById = async (client: SupabaseClient, id: string) => {
  const result = await client.from('sessions').select('*, tickets(*, votes(*))').eq('id', id).single()
  const owner = (await client.auth.getUser(result.data?.owner_id || '')).data

  if (result.error) {
    throw new Error(result.error.message)
  }
  return {
    ...result.data,
    owner,
  }
}

export const createSession = async (client: SupabaseClient, session: SessionInsertDto): Promise<Result<string, Error>> => {
  try {
    const result = await client.from('sessions').insert(session).select('id').single();
    if (result.error) {
      throw result.error;
    }

    if (result.data) {
      return Ok(result.data.id);
    }

    throw new Error('Could not create session');
  } catch (error) {
    return Err(new Error('Could not create session'));
  }
};

export const updateSession = async (client: SupabaseClient, id: string, session: Omit<SessionType, 'id'>): Promise<void> => {
  const result = await client.from('sessions').update(session).eq('id', id).single();
  if (result.error) {
    throw result.error;
  }
};

export const deleteSession = async (client: SupabaseClient, id: string): Promise<void> => {
  const result = await client.from('sessions').delete().eq('id', id);
  if (result.error) {
    throw result.error;
  }
};

export type FullSessionType = Awaited<ReturnType<typeof getSessionById>>;