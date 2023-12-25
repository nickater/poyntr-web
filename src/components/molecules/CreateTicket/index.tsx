import { FC } from 'react';
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { TicketInsertDto } from '../../../types';
import Card from '../Card';

type CreateTicketProps = {
  onValidSubmit: (props: TicketInsertDto) => void;
  onInvalidSubmit?: (error: FieldErrors<TicketInsertDto>) => void;

}
const CreateTicket: FC<CreateTicketProps> = (props) => {
  const { register, handleSubmit, reset, setFocus } = useForm<TicketInsertDto>({ mode: 'onBlur' });

  const handleOnValid: SubmitHandler<TicketInsertDto> = (ticket: TicketInsertDto, event) => {
    event?.preventDefault()
    props.onValidSubmit(ticket)

    reset()
  }

  const handleOnInvalid: SubmitErrorHandler<TicketInsertDto> = (errors, event) => {
    event?.preventDefault()
    props.onInvalidSubmit?.(errors)

    if (errors.url?.type === 'required') {
      setFocus('url')
    }

    if (errors.url?.type === 'pattern') {
      setFocus('url')
    }

    if (errors.name?.type === 'required') {
      setFocus('name')
    }

    if (errors.name?.type === 'minLength') {
      setFocus('name')
    }

    if (errors.description?.type === 'required') {
      setFocus('description')
    }

  }

  return (
    <Card>
      <h2 className="card-title">Add details</h2>
      <form onSubmit={handleSubmit(handleOnValid, handleOnInvalid)}>
        <div className="pt-2">
          <input
            {...register('url', { required: true, pattern: /https:\/\/.*\.com/ })}
            placeholder="Ticket URL"
            className="input input-bordered input-primary w-full"
          />
        </div>
        <div className="pt-4">
          <input
            {...register('name', { required: true, minLength: 4 })}
            placeholder="Ticket Name"
            className="input input-bordered input-primary w-full"
          />
        </div>
        <div className="pt-4">
          <textarea
            {...register('description')}
            className="textarea textarea-primary w-full"
            placeholder="Ticket Description (optional)" />
        </div>
        <div className="card-actions justify-center w-full pt-4">
          <input type="submit" className="btn btn-primary w-full" value="Add ticket" />
        </div>
      </form>
    </Card>
  );
}

export { CreateTicket };

