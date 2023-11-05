import 'firebase/firestore';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { InputSessionType, SessionType } from '../types';

const ref = collection(db, 'sessions')

export const getSessionById = async (id: string): Promise<SessionType> => {
  const result = doc(ref, id);
  const docSnap = await getDoc(result);

  if (docSnap.exists()) {
    // map the created at and updated at to a date object

    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate(),
      updatedAt: docSnap.data().updatedAt.toDate(),
      id: docSnap.id,
    } as SessionType;
  }

  throw new Error('Session not found');
};

export const createSession = async (session: InputSessionType): Promise<void> => {
  await setDoc(doc(ref), session);
};

export const updateSession = async (id: string, session: Omit<SessionType, 'id'>): Promise<void> => {
  const result = await setDoc(doc(ref, id), session);

  return result;
};

export const deleteSession = async (id: string): Promise<void> => {
  const docRef = doc(ref, id)
  const result = await deleteDoc(docRef)

  return result;
};
