import { FC } from 'react';
import { useVoteOnTicket } from '../../../../hooks/ticket/useVoteOnTicket';
import { ViewVotes } from '../View';

type InteractiveProps = {
  ticketId: string;
}
export const InteractiveVote: FC<InteractiveProps> = ({ ticketId }) => {
  const { mutateAsync } = useVoteOnTicket();

  const castVote = async (value: string) => {
    await mutateAsync({ ticketId, value });
  }
  return (
    <div>
      <ViewVotes ticketId={ticketId} />
      <div>
        {/* cast vote */}

      </div>
    </div>
  );
};

