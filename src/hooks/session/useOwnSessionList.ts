
import { useQuery } from '@tanstack/react-query';
import { getAllSessionsByOwnerId } from '../../queries/getSession';
import { useSupabase } from '../useSupabase';

type UseOwnSessionsListProps = {
  ownerId?: string;
}
const useOwnSessionsList = ({ ownerId }: UseOwnSessionsListProps) => {
  const client = useSupabase();

  return useQuery({
    enabled: !!ownerId,
    queryKey: ['session', ownerId],
    queryFn: async ({ queryKey }) => {
      try {
        //TODO: don't force queryKey[1] to be a string
        return await getAllSessionsByOwnerId(client, queryKey[1]!.toString());
      } catch (error) {
        console.error('++++++', error);
      }
    }
  });
};

export default useOwnSessionsList;
