import { FC } from 'react';
import { Ticket } from '..';

type ManageTicketProps = {
  ticketId: string;
}
const ManageTicket: FC<ManageTicketProps> = ({ ticketId }) => {

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tickets</h2>
      <Ticket
        id={ticketId}
        votable={false}
        showChart
      />
    </div>
  );
};

export default ManageTicket;
