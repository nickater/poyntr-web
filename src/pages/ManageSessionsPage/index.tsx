import ManageSessions from '../../components/organisms/ManageSessions';
import useOwnSessionsList from '../../hooks/session/useOwnSessionList';
import { useUser } from '../../hooks/useUser';

export const ManageSessionsPage = () => {
  const ownerId = useUser().user?.id;

  const { data, error, isLoading } = useOwnSessionsList({ ownerId });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <ManageSessions sessions={data.data} />
    </div>
  );
}
