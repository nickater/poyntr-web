import { useState } from 'react';
import { Loading } from '../../components/molecules/Loading';
import SessionHeader from '../../components/molecules/SessionHeader';
import { Ticket } from '../../components/molecules/Ticket';
import { FIBONACCI } from '../../constants';
import useSession from '../../hooks/useSession';
import useTicket from '../../hooks/useTicket';
import { useUser } from '../../hooks/useUser';
import { TicketType, VoteInsertDto, VoteType } from '../../types';

const SessionPage = () => {
  const { user } = useUser();
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const { deep: { data: session, isLoading } } = useSession();
  const { updateTicket } = useTicket();


  if (isLoading) {
    return <Loading />;
  }

  // if (isError) {
  //   return <Error />;
  // }


  // if (isError) return <Error />;

  const handleVote = async (value: VoteType['value'], ticketId: TicketType['id']) => {
    if (!user) return;

    if (!user.id) return;
    if (!user.user_metadata.user_name) return;
    if (!session) return;

    const vote: VoteInsertDto = {
      value,
      user_id: user.id,
      ticket_id: ticketId,
    }
    updateTicket(ticketId, vote);
  }


  console.log(session?.data?.tickets);

  if (!session?.data?.tickets) return null;

  return (
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
                    <Ticket
                      voteOptions={FIBONACCI}
                      {...ticket}
                      onVote={handleVote}
                      votable={ticket.status === 'STARTED'}
                    />
                  </div>
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
