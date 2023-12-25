import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSupabase } from '../useSupabase';

type UseTicketRealtimeProps = {
  ticketId: string;
}
export const useTicketRealtime = (props: UseTicketRealtimeProps) => {
  const client = useSupabase();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialize = async () => {
      const { data: ticket, error } = await client
        .from('tickets')
        .select('*')
        .eq('id', props.ticketId)
        .single();

      if (error) {
        console.error(error);
        return;
      }


      const { data: votes, error: votesError } = await client
        .from('votes')
        .select('*')
        .eq('ticket_id', props.ticketId);

      if (votesError) {
        console.error(votesError);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['ticket', props.ticketId] });
      queryClient.invalidateQueries({ queryKey: ['votes', props.ticketId] });

      queryClient.setQueryData(['tickets', props.ticketId], ticket);
      queryClient.setQueryData(['votes', props.ticketId], votes || []);
    }

    if (!client) {
      return;
    }

    const voteSubscription = client
      .channel('votes_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
          filter: `ticket_id=eq.${props.ticketId}`
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['votes', props.ticketId] });
          queryClient.setQueryData(['votes', props.ticketId], [payload.new] || []);
        }
      )
      .subscribe()

    initialize();

    return () => {
      voteSubscription.unsubscribe();
    }

  }, [client, props.ticketId, queryClient]);

  return useQueries({
    queries: [
      {
        queryKey: ['ticket', props.ticketId],
        queryFn: async () => {
          const { data: ticket, error } = await client
            .from('tickets')
            .select('*')
            .eq('id', props.ticketId)
            .single();

          if (error) {
            console.error(error);
            return;
          }

          return ticket;
        }
      },
      {
        queryKey: ['votes', props.ticketId],
        placeholderData: [],
        queryFn: async () => {
          const { data: votes, error } = await client
            .from('votes')
            .select('*')
            .eq('ticket_id', props.ticketId);

          if (error) {
            console.error(error);
            return [];
          }

          return votes;
        }
      }
    ]
  }
  )
}
