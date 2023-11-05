
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

export type CreateSessionFormData = {
  name?: string;
  description?: string;
};

type CreateSessionFormProps = {
  onSubmit: (data: CreateSessionFormData) => void;
};

export const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<CreateSessionFormData>();

  const handleValidFormSubmit: SubmitHandler<CreateSessionFormData> = (data: CreateSessionFormData, e) => {
    e?.preventDefault();
    console.log('+++++', data);
    onSubmit(data);
  };

  const handleInvalidFormSubmit: SubmitErrorHandler<CreateSessionFormData> = (errors, e) => {
    e?.preventDefault();
    console.warn(errors);
  }

  return (
    <form onSubmit={handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}>
      <div className='mb-4'>
        <input
          className='input input-primary w-full'
          placeholder='Session Name (optional)'
          type="text"
          {...register('name')} />
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
