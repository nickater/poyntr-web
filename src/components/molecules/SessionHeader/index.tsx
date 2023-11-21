import { FC } from 'react';
import useProfile from '../../../hooks/useProfile';
import { SessionType } from '../../../types';

type SessionHeaderProps = {
  session: SessionType;
}
const SessionHeader: FC<SessionHeaderProps> = ({ session }) => {
  const { data, isLoading } = useProfile(session.owner_id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between'>
        <h2 className="card-title">{session?.name}</h2>
      </div>
      <div className="pt-2">
        <div className="card bg-base-100">
          <div className="card-body">
            <p className="">Session ID: {session?.id}</p>
            <p className="">Created by: {data?.full_name}</p>
            <p className="">Created: {session?.created_at}</p>
            <p>{session?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionHeader;