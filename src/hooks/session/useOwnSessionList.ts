
import { useQuery } from '@tanstack/react-query';
import { getAllSessionsByOwnerId } from '../../queries/getSession';
import { useSupabase } from '../useSupabase';

type UseOwnSessionsListProps = {
  ownerId: string;
}
const useOwnSessionsList = ({ ownerId }: UseOwnSessionsListProps) => {
  const client = useSupabase();
  // const { user } = useUser();
  // const ownerId = '4051b395-4b59-40d1-952a-a4c90ddf4b4f';

  return useQuery({
    queryKey: ['session', ownerId],
    queryFn: async ({ queryKey }) => {
      try {
        return await getAllSessionsByOwnerId(client, queryKey[1].toString());
      } catch (error) {
        console.error('++++++', error);
      }
    }
  });
};

export default useOwnSessionsList;
