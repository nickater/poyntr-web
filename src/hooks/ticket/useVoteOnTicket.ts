import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVoteOnTicket, hasVoted, updateVoteOnTicket } from '../../services/ticket';
import { VoteInsertDto } from '../../types';
import { useSupabase } from '../useSupabase';

export const useVoteOnTicket = () => {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const hasUserVoted = async (ticketId: string, userId: string) => {
    const result = await hasVoted(client, ticketId, userId);

    return result;
  }

  const voteManager = async (ticketId: string, userId: string, value: number) => {
    const voteId = await hasUserVoted(ticketId, userId);
    console.log('voteId', voteId);
    if (voteId) {
      await updateVoteOnTicket({ client, voteId, value });
    } else {
      await createVoteOnTicket({ client, ticketId, userId, value });
    }
  }

  return useMutation(
    {
      mutationFn: async ({ ticket_id, user_id, value }: VoteInsertDto) => await voteManager(ticket_id, user_id, value),
      onSuccess: () => {
        console.log('onSuccess');

        queryClient.invalidateQueries()
      },
      onError: (error) => {
        console.log('onError', error);
      }
    }
  )
}