import { FC, useRef } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FIBONACCI } from '../../../constants';
import { TicketType } from '../../../types';
import Select from '../../atoms/Select';
import Card from '../Card';

type TicketProps = TicketType & {
  votable: boolean;
  voted?: boolean;
  onVote?: (value: string, ticketId: string) => void;
  voteOptions?: string[];
  totalVotes?: number;
  possibleVotes?: number;
}

type TicketForm = {
  value: string;
}

const Ticket: FC<TicketProps> = (props) => {
  const userVote = useRef<string | undefined>(undefined);
  const { register, handleSubmit } = useForm<TicketForm>();
  const onVote = (value: string) => {
    userVote.current = value;
  }

  const handleValidFormSubmit: SubmitHandler<TicketForm> = (data) => {
    onVote(data.value);
  }

  const handleInvalidFormSubmit: SubmitErrorHandler<TicketForm> = () => {
    console.log('invalid form');
  }

  return (
    <Card title={props.name}>
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
                  options={props.voteOptions || FIBONACCI} />
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
