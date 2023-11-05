import { useMutation } from '@tanstack/react-query';
import { createSession } from '../services/session';
import { InputSessionType } from '../types';

export const useCreateSession = () => {
  const create = useMutation({
    mutationKey: ['sessions', 'create'],

    mutationFn: async (session: InputSessionType) => {
      await createSession(session);
    }
  })

  return { create }
}
