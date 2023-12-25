import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '../useSupabase';


type UseTicketProps = {
  sessionId: string;
};
const useTickets = (props: UseTicketProps) => {
  const { sessionId } = props;

  const client = useSupabase();
  return useQuery({
    queryKey: ['tickets', { id: sessionId }],
    queryFn: async () => await client.from('tickets').select('*').eq('session_id', sessionId),
    enabled: !!sessionId,
  })
};

export default useTickets;
