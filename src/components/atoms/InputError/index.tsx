import { FC } from 'react';

type InputErrorProps = {
  message: string
}
const InputError: FC<InputErrorProps> = ({ message }) => {
  return (
    <div className="text-xs text-error py-2">
      {message}
    </div>
  );
}

export default InputError;