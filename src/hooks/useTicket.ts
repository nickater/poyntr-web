
import { useCallback, useEffect, useState } from 'react';
import { TicketType } from '../types';
import useSupabase from './useSupabase';

const useTicket = () => {
  const supabase = useSupabase();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const fetchTickets = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('tickets').select('*');
      if (error) {
        throw error;
      }
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }, [supabase]);

  const createTicket = useCallback(async (ticket: TicketType) => {
    try {
      const { data, error } = await supabase.from('tickets').insert(ticket).select('*').single();
      if (error) {
        throw error;
      }
      if (!data) {
        throw new Error('No data returned from Supabase');
      }

      setTickets((prevTickets) => [...prevTickets, data]);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  }, [supabase]);

  const updateTicket = useCallback(async (id: string, ticket: Partial<TicketType>) => {
    try {
      const { data, error } = await supabase.from('tickets').update(ticket).eq('id', id).select('*').single();
      if (error) {
        throw error;
      }
      setTickets((prevTickets) =>
        prevTickets.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  }, [supabase]);

  const deleteTicket = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from('tickets').delete().eq('id', id);
      if (error) {
        throw error;
      }
      setTickets((prevTickets) => prevTickets.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    createTicket,
    updateTicket,
    deleteTicket,
  };
};

export default useTicket;
