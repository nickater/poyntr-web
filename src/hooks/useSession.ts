import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { SessionType } from '../types';

function useSession() {
  const { sessionId: id } = useParams<{ sessionId: string }>()
  const [session, setSession] = useState<SessionType | null>(null)

  if (!id) {
    throw new Error('useSession requires a sessionId be passed in the url')
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'sessions', id), (doc) => {
      if (doc.exists()) {
        setSession({
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
          id: doc.id,
        } as SessionType)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [id])

  return { session }
}

export default useSession;
