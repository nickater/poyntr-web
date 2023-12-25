import { FC } from 'react';
import { useTicketRealtime } from '../../../../hooks/ticket/useTicketRealtime';
import { useUser } from '../../../../hooks/useUser';
import { TicketType } from '../../../../types';
import { PieChart } from '../../Charts/Pie';

type ViewVotesProps = {
  ticketId: TicketType['id'];
  showGraph?: boolean;
  showMyVote?: boolean;
}
export const ViewVotes: FC<ViewVotesProps> = ({ ticketId, showGraph = true, showMyVote = true }) => {

  const [ticketData, voteData] = useTicketRealtime({ ticketId });
  const { data: ticket, isLoading: ticketIsLoading } = ticketData;
  const { data: votes, isLoading: voteIsLoading } = voteData;
  const { user } = useUser();

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

  const myVote = votes.find((vote) => user && vote.user_id === user.id);

  return (
    <div>
      {
        showMyVote && myVote && (
          <div>
            Your vote: {myVote.value}
          </div>
        )
      }
      {
        showGraph && (
          <div className=''>
            <PieChart votes={mapVotesToChart} />
          </div>
        )
      }
    </div>
  )
}
