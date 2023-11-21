import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { TicketType, VoteType } from '../../../types';
import Select from '../../atoms/Select';
import Card from '../Card';

type TicketProps = Partial<TicketType> & {
  votable: boolean;
  // voted?: boolean;
  onVote?: (value: VoteType['value'], ticketId: TicketType['id']) => void;
  voteOptions?: string[];
  // totalVotes?: number;
  // possibleVotes?: number;
}

type TicketForm = {
  value: VoteType['value'];
}

const Ticket: FC<TicketProps> = (props) => {
  const { register, handleSubmit } = useForm<TicketForm>();

  const handleValidFormSubmit: SubmitHandler<TicketForm> = (data) => {
    if (!props.id) return;

    props.onVote?.(data.value, props.id);
  }

  const handleInvalidFormSubmit: SubmitErrorHandler<TicketForm> = () => {
    console.log('invalid form');
  }

  return (
    <Card title={props.name || ''}>
      <div>
        {props.description}
      </div>
      <a target='_blank' href={props.url}>Ticket Link</a>
      <form onSubmit={handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}>
        {
          (props.votable) && (
            <div>
              <div className="pt-4">
                <Select
                  formRegister={register('value', { required: true })}
                  placeholder="Options"
                  options={props.voteOptions?.map((opt) => ({ label: opt, value: opt })) || []} />
              </div>
              <div>
                <button type='submit' className="btn btn-primary w-full mt-4">Vote</button>
              </div>
            </div>
          )
        }
      </form>
    </Card>
  );
}

export { Ticket };
