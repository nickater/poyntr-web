import { Link } from 'react-router-dom';
import { SessionType } from '../../../types';

interface ManageSessionsProps {
  sessions: SessionType[];
}

const ManageSessions: React.FC<ManageSessionsProps> = ({ sessions }) => {
  return (
    <div>
      <h1>Manage Sessions</h1>
      {sessions.map((session) => (
        <div key={session.id}>
          <Link to={`/session/${session.id}`}>{session.id}</Link>
          {/* Add other session properties here */}
        </div>
      ))}
    </div>
  );
};

export default ManageSessions;