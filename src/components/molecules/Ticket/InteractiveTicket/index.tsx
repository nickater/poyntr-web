import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useTicketRealtime } from '../../../../hooks/ticket/useTicketRealtime';
import { useVoteOnTicket } from '../../../../hooks/ticket/useVoteOnTicket';
import { useUser } from '../../../../hooks/useUser';
import { TicketType, VoteType } from '../../../../types';
import Select from '../../../atoms/Select';
import { ViewTicket } from '../View';


type InteractiveTicketProps = & {
  ticketId: TicketType['id'];
  onVote?: () => void;
  voteOptions?: string[];
  isManager?: boolean;
}

type TicketForm = {
  value: VoteType['value'];
}

export const InteractiveTicket: FC<InteractiveTicketProps> = ({ ticketId, onVote, voteOptions, isManager }) => {

  const [ticketData, votesData] = useTicketRealtime({ ticketId });
  const { data: ticket } = ticketData
  const { data: votes } = votesData;
  const { handleSubmit, register } = useForm<TicketForm>();

  const { mutate: voteOnTicket } = useVoteOnTicket();
  const { user } = useUser();

  const handleValidFormSubmit: SubmitHandler<TicketForm> = (data, event) => {
    event?.preventDefault();
    if (!ticketId) return;
    if (!user?.id) return;

    voteOnTicket({ ticket_id: ticketId, value: data.value, user_id: user?.id });
    onVote?.();
  }

  const handleInvalidFormSubmit: SubmitErrorHandler<TicketForm> = (errors, event) => {
    event?.preventDefault();
    console.log('invalid form', errors);
  }

  if (!user) return null;

  return (
    <div>
      {
        votes?.some((vote) => vote.user_id === user?.id) && (
          <div>
            Your vote: {votes?.find((vote) => vote.user_id === user?.id)?.value}
          </div>
        )
      }
      {
        isManager ? (
          <ViewTicket ticketId={ticketId} />
        ) : (
          <form onSubmit={handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}>
            <div>
              <div className="pt-4">
                <Select
                  formRegister={register('value', { required: true, value: votes?.find((vote) => vote.user_id === user?.id)?.value })}
                  placeholder="Options"
                  options={voteOptions?.map((opt) => ({ label: opt, value: opt })) || []} />
              </div>
              <div>
                <button type='submit' className="btn btn-primary w-full mt-4">Vote</button>
              </div>
            </div>
          </form>
        )
      }
    </div>
  );
}

