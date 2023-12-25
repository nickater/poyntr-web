import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSession } from '../../services/session';
import { SessionUpdateDto } from '../../types';
import { useSupabase } from '../useSupabase';

export const useDeleteSession = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['sessions', 'delete'],

    mutationFn: async (session: SessionUpdateDto) => {
      await updateSession(client, session);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions']
      });
    }
  })
}
