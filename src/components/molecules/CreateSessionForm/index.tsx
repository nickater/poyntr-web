
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { SessionInsertDto } from '../../../types';

export type CreateSessionFormData = Omit<SessionInsertDto, 'owner_id'>;

type CreateSessionFormProps = {
  onValidSubmit: (data: CreateSessionFormData) => void;
  onInvalidSubmit?: (errors: FieldErrors<CreateSessionFormData>) => void;
};

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ onValidSubmit, onInvalidSubmit }) => {
  const { register, handleSubmit } = useForm<CreateSessionFormData>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleValidFormSubmit: SubmitHandler<CreateSessionFormData> = (data: CreateSessionFormData, e) => {
    e?.preventDefault();
    onValidSubmit(data);
  };

  const handleInvalidFormSubmit: SubmitErrorHandler<CreateSessionFormData> = (errors, e) => {
    e?.preventDefault();
    onInvalidSubmit?.(errors);
  }

  return (
    <form onSubmit={handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}>
      <div className='mb-4'>
        <input
          data-1p-ignore
          className='input input-primary w-full'
          placeholder='Session Name'
          type="text"
          {...register('name', { required: true })} />
      </div>
      <div className='mb-4'>
        <textarea
          className='textarea textarea-primary w-full'
          placeholder='Session Description (optional)'
          {...register('description')}
        />
      </div>
      <button className='btn btn-primary w-full' type="submit">Confirm Details</button>
    </form>
  );
};
