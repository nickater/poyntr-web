import { FC } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { InputTicketType } from '../../../types';
import Card from '../Card';

type CreateTicketProps = {
  onCreateTicketSubmit: (props: InputTicketType) => void;
}
const CreateTicket: FC<CreateTicketProps> = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<InputTicketType>({ mode: 'onBlur' });

  const handleOnValid: SubmitHandler<InputTicketType> = (ticket: InputTicketType, event) => {
    event?.preventDefault()
    props.onCreateTicketSubmit(ticket)
  }

  const handleOnInvalid: SubmitErrorHandler<InputTicketType> = (errors, event) => {
    event?.preventDefault()
    console.warn(errors)
  }

  return (
    <Card>
      <h2 className="card-title">Add details</h2>
      <form onSubmit={handleSubmit(handleOnValid, handleOnInvalid)}>
        <div className="pt-2">
          <input
            type="url"
            {...register('url', { required: true, pattern: /https:\/\/.*\.com/ })}
            placeholder="https://www.jira..."
            className="input input-bordered input-primary w-full"
          />
          {
            errors.url?.type === 'required' && <div className="text-red-500 pt-2">Ticket URL is required</div>
          }
          {
            errors.url?.type === 'pattern' && <div className="text-red-500 pt-2">Ticket URL must be a valid URL</div>
          }
        </div>
        <div className="pt-4">
          <textarea
            {...register('description')}
            className="textarea textarea-primary w-full"
            placeholder="Description" />
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input type="submit" className="btn btn-primary w-full" value="Create!" />
        </div>
      </form>
    </Card>
  );
}

export { CreateTicket };

