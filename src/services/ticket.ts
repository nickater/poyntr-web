import firebase from 'firebase/compat/app';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { InputTicketType, SessionType, TicketType } from '../types';


// Create a new ticket for a given session
async function createTicket(sessionId: string, ticket: InputTicketType): Promise<void> {
  const sessionRef = doc(db, 'sessions', sessionId)
  await updateDoc(sessionRef, {
    tickets: arrayUnion({
      ...ticket,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  });
}


// Update a ticket for a given session
async function updateTicket(sessionId: string, ticketId: string, updatedTicket: Partial<TicketType>): Promise<void> {
  const sessionRef = doc(db, 'sessions', sessionId)
  const sessionDoc = await getDoc(sessionRef);

  if (!sessionDoc.exists()) {
    throw new Error('Session not found');
  }

  const sessionData = sessionDoc.data() as SessionType;

  const updatedTickets = sessionData.tickets.map((ticket) => {
    if (ticket.id === ticketId) {
      return {
        ...updatedTicket,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
    }

    return ticket;
  });

  return await updateDoc(sessionRef, {
    tickets: updatedTickets,
  });
}

// Delete a ticket for a given session
async function deleteTicket(sessionId: string, ticketId: string): Promise<void> {
  const sessionRef = doc(db, 'sessions', sessionId)
  const sessionDoc = await getDoc(sessionRef);

  if (!sessionDoc.exists()) {
    throw new Error('Session not found');
  }

  const sessionData = sessionDoc.data() as SessionType;

  const updatedTickets = sessionData.tickets.filter((ticket) => ticket.id !== ticketId);

  return await updateDoc(sessionRef, {
    tickets: updatedTickets,
  });
}

export { createTicket, deleteTicket, updateTicket, voteOnTicket };

