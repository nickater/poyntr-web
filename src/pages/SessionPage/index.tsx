import { useState } from 'react';
import { Ticket } from '../../components/molecules/Ticket';
import useSession from '../../hooks/useSession';

const SessionPage = () => {
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);
  const { session } = useSession();

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <Error />;
  // }


  // if (isError) return <Error />;

  const handleVote = (value: string, ticketId: string) => {
    console.log(value, ticketId);
  }

  return (
    <div className="card card-compact bg-neutral text-neutral-content shadow-xl md:card-normal">
      <div className="card-body">
        <div className='flex justify-center flex-col md:flex-row md:justify-between'>
          <h2 className="card-title">{session?.name}</h2>
        </div>
        <div className="pt-2">
          <div className="card bg-base-100">
            <div className="card-body">
              <p className="">Session ID: {session?.id}</p>
              <p className="">Created by: {session?.creator?.name}</p>
              <p className="">Created: {session?.createdAt.toLocaleDateString()}</p>
              <p className="">Status: {session?.status}</p>
              <p>{session?.description}</p>
            </div>
          </div>
        </div>

        <h2 className="card-title pt-4">Tickets</h2>
        <div>
          {
            session?.tickets.map((ticket, index) => (
              <div key={ticket.id + index} className='collapse bg-base-100 mb-4'>
                <div className="collapse bg-base-100">
                  <input type="radio" name="my-accordion-1" checked={selectedTicketIndex === index} onChange={() => setSelectedTicketIndex(index)} />
                  <div className="collapse-title text-xl font-medium">
                    {ticket.name}
                  </div>
                  <div className="collapse-content">
                    <Ticket
                      voteOptions={session?.voteOptions || []}
                      {...ticket}
                      onVote={handleVote}
                      votable={session?.status === 'STARTED'}
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
