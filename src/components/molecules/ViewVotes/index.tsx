import { FC } from 'react';
import { useTicketRealtime } from '../../../hooks/ticket/useTicketRealtime';
import { TicketType } from '../../../types';
import { PieChart } from '../Charts/Pie';

type ViewVotesProps = {
  ticketId: TicketType['id'];
}
export const ViewVotes: FC<ViewVotesProps> = ({ ticketId }) => {

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

  const mapVotesToChart = votes.reduce((acc, vote) => {
    if (!acc[vote.value]) {
      acc[vote.value] = 0;
    }
    acc[vote.value] += 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h1>View Votes</h1>
      <div>
        {
          votes?.map((vote) => (
            <div key={vote.id}>
              <div>
                {vote.user_id}
              </div>
              props.showChart && (
              <div className=''>
                <PieChart votes={mapVotesToChart} />
              </div>
              )
            </div>
          ))
        }
      </div>
    </div>
  )
}
