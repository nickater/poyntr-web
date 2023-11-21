
import { useQuery } from '@tanstack/react-query';
import { getProfileById } from '../queries/getProfile';
import { ProfileType } from '../types';
import useSupabase from './useSupabase';

const useProfile = (userId: string) => {
  const client = useSupabase();
  const queryKey = ['profile', userId];

  const queryFn = async () => {
    return getProfileById(client, userId).then(
      (result) => result.data
    );
  };

  return useQuery<ProfileType | null>({
    queryKey,
    queryFn,
    enabled: !!userId,
  });
};

export default useProfile;
