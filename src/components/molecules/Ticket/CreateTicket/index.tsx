import { useCallback } from 'react';
import { TicketInsertDto } from '../../../../types';
import Card from '../../Card';

type NewTicketProps = {
  ticket: TicketInsertDto;
  onUpdate: (ticket: TicketInsertDto) => void;
  onDelete: (ticket: TicketInsertDto) => void;
}
const NewTicket: React.FC<NewTicketProps> = ({ ticket, onDelete, onUpdate }) => {

  const handleUpdate = useCallback(() => {
    onUpdate(ticket)
  }, [ticket, onUpdate])

  const handleDelete = useCallback(() => {
    onDelete(ticket)
  }, [ticket, onDelete])

  return (
    <Card title={ticket.name || ''}>
      <div className='flex flex-col justify-between'>
        <div>
          <div>
            <p>{ticket.description}</p>
          </div>
          <a target='_blank' href={ticket.url}>Ticket Link</a>
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input onClick={handleUpdate} type="button" className="btn btn-primary w-full" value="Edit" />
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input onClick={handleDelete} type="button" className="btn btn-danger w-full" value="Delete" />
        </div>
      </div>

    </Card>
  );
}

export default NewTicket;