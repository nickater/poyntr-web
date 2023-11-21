import { useMutation } from '@tanstack/react-query';
import { createSession } from '../services/session';
import { SessionInsertDto } from '../types';
import useSupabase from './useSupabase';

export const useCreateSession = () => {
  const supabase = useSupabase();
  const create = useMutation({
    mutationKey: ['sessions', 'create'],

    mutationFn: async (session: SessionInsertDto) => {
      await createSession(supabase, session);
    }
  })

  return { create }
}
