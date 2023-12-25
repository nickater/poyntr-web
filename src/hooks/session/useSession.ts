
import { useQuery } from '@tanstack/react-query';
import { getSessionByIdDeep } from '../../queries/getSession';
import { useSupabase } from '../useSupabase';

type UseSessionProps = {
  sessionId: string;
}
const useSession = ({ sessionId }: UseSessionProps) => {
  const client = useSupabase();

  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: async ({ queryKey }) => {
      try {
        return await getSessionByIdDeep(client, queryKey[1].toString());
      } catch (error) {
        console.error('++++++', error);
      }
    }
  })
};

export default useSession;
