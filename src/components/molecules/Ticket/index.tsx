import { FC, memo } from 'react';
import { useTicketRealtime } from '../../../hooks/ticket/useTicketRealtime';
import { TicketType, VoteType } from '../../../types';
import Card from '../Card';
import { ViewVotes } from '../ViewVotes';

export type BaseTicketProps = {
  id: TicketType['id'];
  votable: boolean;
  onVote?: (ticketId: TicketType['id'], value: VoteType['value']) => void;
  voteOptions?: string[];
  showChart?: boolean;
  // totalVotes?: number;
  // possibleVotes?: number;
}

const Ticket: FC<BaseTicketProps> = memo((props) => {

  const [ticketData, votesData] = useTicketRealtime({ ticketId: props.id });
  const { data: ticket } = ticketData;
  const { data: votes, error: votesError } = votesData;

  if (!ticket) return null;
  if (votesError) return null;
  if (!votes) return null;

  return (
    <Card title={ticket.name || ''}>
      <div className='flex flex-row justify-between'>
        <div>
          <div>
            <p>{ticket.description}</p>
          </div>
          <a target='_blank' href={ticket.url}>Ticket Link</a>
          {
            votes?.length > 0 && (
              <ViewVotes ticketId={ticket.id} />
            )
          }
        </div>

      </div>

    </Card>
  );
});

export { Ticket };
