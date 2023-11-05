import { FC } from 'react';
import Card from '../Card';

type ErrorProps = {
  message?: string
}
const Error: FC<ErrorProps> = ({ message } = { message: 'Error!' }) => {
  return (
    <Card title={message} />
  );
}

export { Error };
