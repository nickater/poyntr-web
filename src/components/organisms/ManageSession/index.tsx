import { FC, useState } from 'react';
import { FIBONACCI } from '../../../constants';
import useSession from '../../../hooks/session/useSession';
import SessionHeader from '../../molecules/SessionHeader';
import { InteractiveTicket } from '../../molecules/Ticket/InteractiveTicket';

type ManageSessionProps = {
  sessionId: string;
}
const ManageSession: FC<ManageSessionProps> = ({ sessionId }) => {
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const { data: session, isLoading, isError } = useSession({ sessionId });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !session?.data) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1 className="text-center text-2xl pb-4">Session Manager</h1>
      <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:card-normal">
        <div className="card-body">
          <SessionHeader session={session.data} />
          <h2 className="card-title pt-4">Tickets</h2>
          <div>
            {
              session.data?.tickets.map((ticket, index) => (
                <div key={ticket.id + index} className='collapse bg-base-100 mb-4'>
                  <div className="collapse bg-base-100">
                    <input type="radio" name="my-accordion-1" checked={selectedTicketIndex === index} onChange={() => setSelectedTicketIndex(index)} />
                    <div className="collapse-title text-xl font-medium">
                      {ticket.name}
                    </div>
                    <div className="collapse-content">
                      <InteractiveTicket
                        isManager
                        ticketId={ticket.id}
                        voteOptions={FIBONACCI}

                        {...ticket}
                      />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>

  );
}

export default ManageSession;