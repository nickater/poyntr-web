import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTickets } from '../../services/ticket';
import { TicketInsertDto } from '../../types';
import { useSupabase } from '../useSupabase';

export const useCreateTickets = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['tickets', 'create'],

    mutationFn: async (tickets: TicketInsertDto[]) => {
      await createTickets(client, tickets);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tickets']
      });
    }
  })
}
