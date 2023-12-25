import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSession } from '../../services/session';
import { SessionInsertDto } from '../../types';
import { useSupabase } from '../useSupabase';

export const useCreateSession = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['sessions', 'create'],

    mutationFn: async (session: SessionInsertDto) => {
      await createSession(client, session);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions']
      });
    }
  })
}
