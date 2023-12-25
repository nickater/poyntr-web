import { useMutation as useMutationLib, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../../hooks/useSupabase';
import { VoteInsertDto } from '../../types';
import { Client } from '../../types/general';

export default function useData() {
  const { sessionId } = useParams<{ sessionId: string }>()

  const client = useSupabase();
  return useQuery({
    queryKey: ['session', { id: sessionId }],
    queryFn: async () => await client.from('sessions').select('*, tickets(*)').eq('id', sessionId!).single(),
    enabled: !!sessionId,

  })
}

export const useMutation = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const queryClient = useQueryClient()
  const client = useSupabase();

  return useMutationLib(
    {
      mutationFn: async (data: VoteInsertDto) => voteOnTicket({ client, ...data }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['session', { id: sessionId }] })
      },
    }
  )
}


type VoteOnTicketProps = VoteInsertDto & {
  client: Client;
}
export const voteOnTicket = async (props: VoteOnTicketProps) => {
  const { client, user_id, ticket_id, value } = props;
  // ensure vote doesnt already exist
  const { data: existingVote } = await client.from('votes').select('*').eq('ticket_id', ticket_id).eq('user_id', user_id).single();

  // if it does, update it
  if (existingVote) {
    return await client.from('votes').update({ value }).eq('id', existingVote.id);
  }

  // otherwise, create it
  return await client.from('votes').insert({ ticket_id, value, user_id });
}