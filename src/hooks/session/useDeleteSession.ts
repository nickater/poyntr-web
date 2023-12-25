import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../../services/session';
import { useSupabase } from '../useSupabase';

export const useDeleteSession = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['sessions', 'delete'],

    mutationFn: async (sessionId: string) => {
      await deleteSession(client, sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions']
      });
    }
  })
}
