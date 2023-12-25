import { FC } from 'react';
import { useTicketRealtime } from '../../../../hooks/ticket/useTicketRealtime';
import { TicketType } from '../../../../types';

type ManagedVoteProps = {
  ticketId: TicketType['id'];
}
export const ManagedVote: FC<ManagedVoteProps> = ({ ticketId }) => {
  const [ticketData, voteData] = useTicketRealtime({ ticketId });
  return (
    <div>

    </div>
  );
}
