
import { TicketInsertDto, TicketUpdateDto } from '../types';
import { Client } from '../types/general';


// Create a new ticket for a given session
async function createTicket(client: Client, ticket: TicketInsertDto): Promise<void> {
  const result = await client.from('tickets').insert(ticket);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

export const createTickets = async (client: Client, tickets: TicketInsertDto[]) => {
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
async function updateTicket(client: Client, sessionId: string, userId: string, updatedTicket: TicketUpdateDto): Promise<void> {
  const result = await client.from('tickets').update(updatedTicket).match({ session_id: sessionId, user_id: userId });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

// Delete a ticket for a given session
async function deleteTicket(client: Client, sessionId: string, ticketId: string): Promise<void> {
  const result = await client.from('tickets').delete().match({ session_id: sessionId, id: ticketId });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

type VoteOnTicketBaseProps = {
  client: Client;
  value: number;
}

type CreateVoteOnTicketProps = VoteOnTicketBaseProps & {
  ticketId: string;
  userId: string;
}

type UpdateVoteOnTicketProps = VoteOnTicketBaseProps & {
  voteId: string;
}

async function updateVoteOnTicket(props: UpdateVoteOnTicketProps): Promise<void> {
  const { client, value, voteId } = props;
  const result = await client.from('votes').update({ value }).match({ id: voteId });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

async function createVoteOnTicket(props: CreateVoteOnTicketProps): Promise<void> {
  const { client, ticketId, userId, value } = props;
  const result = await client.from('votes').insert({ ticket_id: ticketId, user_id: userId, value });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return;
}

async function hasVoted(client: Client, ticketId: string, userId: string): Promise<string> {
  const { data: vote } = await client.from('votes').select('*').eq('ticket_id', ticketId).eq('user_id', userId).single();

  if (!vote) {
    return '';
  }

  return vote.id;
}

export { createTicket, createVoteOnTicket, deleteTicket, hasVoted, updateTicket, updateVoteOnTicket };

