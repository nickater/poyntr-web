import { Link } from 'react-router-dom';
import { SessionType } from '../../../types';
import { formatDateTime } from '../../../utils/date/format';
import Card from '../../molecules/Card';

interface ManageSessionsProps {
  sessions: SessionType[];
}

const ManageSessions: React.FC<ManageSessionsProps> = ({ sessions }) => {
  return (
    <Card title="Manage Sessions">
      <div className="flex flex-col">
        {sessions.map((session) => (
          <Link
            key={session.id}
            to={`/session/${session.id}`}
            className="flex justify-between items-center p-4 border-b border-gray-300"
          >
            <span>{session.name}</span>
            <span className="text-gray-500">{formatDateTime(session.created_at)}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default ManageSessions;