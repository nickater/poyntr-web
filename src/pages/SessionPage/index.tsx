import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loading } from '../../components/molecules/Loading';
import SessionHeader from '../../components/molecules/SessionHeader';
import { InteractiveTicket } from '../../components/molecules/Ticket/InteractiveTicket';
import { ViewTicket } from '../../components/molecules/Ticket/View';
import ManageSession from '../../components/organisms/ManageSession';
import { FIBONACCI } from '../../constants';
import { useUser } from '../../hooks/useUser';
import useData from './useData';

const SessionPage = () => {
  const { user } = useUser();
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const { data: session, isLoading, isError } = useData();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>error</div>;
  }

  const handleVote = async () => {
    toast.success('Vote submitted');
  }


  if (!session?.data?.tickets) return null;

  if (session.data.owner_id === user?.id) {
    return <ManageSession sessionId={session.data.id} />
  }

  return (
    <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:card-normal">
      <div className="card-body">
        <SessionHeader session={session.data} />
        <h2 className="card-title pt-4">Tickets</h2>
        <div>
          {
            session.data?.tickets.map((ticket, index) => (
              <div key={ticket.id + index} className='collapse bg-base-100 mb-4'>
                <input type="radio" name="my-accordion-1" checked={selectedTicketIndex === index} onChange={() => setSelectedTicketIndex(index)} />
                <div className="collapse-title text-xl font-medium">
                  {ticket.name}
                </div>
                <div className="collapse-content">
                  {
                    ticket.status === 'STARTED' ?
                      <InteractiveTicket onVote={handleVote} ticketId={ticket.id} voteOptions={FIBONACCI} />
                      :
                      <ViewTicket ticketId={ticket.id} />
                  }
                </div>
              </div>
            ))
          }
        </div>
        {/* <div className="card-actions justify-center w-full pt-4">
          <button onClick={() => refetch()} className="btn btn-primary w-full">Refetch!</button>
        </div> */}
      </div>
    </div>
  )
}

export { SessionPage };
