
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getSessionById, getSessionByIdDeep } from '../queries/getSession';
import useSupabase from './useSupabase';

const useSession = () => {
  const { sessionId: id } = useParams<{ sessionId: string }>()
  const client = useSupabase();
  const queryKey = ['session', id, client];

  if (!id) throw new Error('No session ID provided');


  const queryFnBare = async () => {
    return (await getSessionById(client, id)).data
  };

  const queryFnDeep = async () => {
    return getSessionByIdDeep(client, id)
  };

  const bare = useQuery({
    queryKey,
    queryFn: queryFnBare,
    enabled: !!id,
  });

  const deep = useQuery({
    queryKey,
    queryFn: queryFnDeep,
    enabled: !!id,
  });

  return { bare, deep };
};

export default useSession;
