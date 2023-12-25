import { FC } from 'react';
import { Ticket } from '..';
import { useTicketRealtime } from '../../../../hooks/ticket/useTicketRealtime';
import { TicketType } from '../../../../types';

type ViewTicketProps = {
  ticketId: TicketType['id'];
}
export const ViewTicket: FC<ViewTicketProps> = ({ ticketId }) => {
  const [ticketData, voteData] = useTicketRealtime({ ticketId });
  const { data: ticket, isLoading: ticketIsLoading } = ticketData;
  const { data: votes, isLoading: voteIsLoading } = voteData;

  if (ticketIsLoading || voteIsLoading) {
    return <div>Loading...</div>;
  }

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  if (!Array.isArray(votes)) {
    return <div>Votes not found</div>;
  }

  return (
    <Ticket
      {...ticket}
      votable={false}
    />
  );
}
