
import { SupabaseClient } from '@supabase/supabase-js';
import { TicketInsertDto, TicketUpdateDto } from '../types';


// Create a new ticket for a given session
async function createTicket(client: SupabaseClient, ticket: TicketInsertDto): Promise<void> {
  const result = await client.from('tickets').insert(ticket);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

export const createTickets = async (client: SupabaseClient, tickets: TicketInsertDto[]) => {
  const initializedTickets = tickets.map(ticket => {
    return {
      ...ticket,
      status: 'CREATED',
    }
  });

  const result = await client.from('tickets').insert(initializedTickets);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}


// Update a ticket for a given session
async function updateTicket(client: SupabaseClient, sessionId: string, userId: string, updatedTicket: TicketUpdateDto): Promise<void> {
  const result = await client.from('tickets').update(updatedTicket).match({ session_id: sessionId, user_id: userId });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

// Delete a ticket for a given session
async function deleteTicket(client: SupabaseClient, sessionId: string, ticketId: string): Promise<void> {
  const result = await client.from('tickets').delete().match({ session_id: sessionId, id: ticketId });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

export { createTicket, deleteTicket, updateTicket };

