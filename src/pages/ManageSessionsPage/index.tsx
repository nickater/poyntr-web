import ManageSessions from '../../components/organisms/ManageSessions';
import useOwnSessionsList from '../../hooks/session/useOwnSessionList';

export const ManageSessionsPage = () => {
  const ownerId = '4051b395-4b59-40d1-952a-a4c90ddf4b4f';

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

  // type Session = {
  //   created_at: string;
  //   description: string | null;
  //   id: string;
  //   name: string | null;
  //   owner_id: string;
  //   updated_at: string;
  // }

  // const sessions: Session[] = [
  //   {
  //     created_at: "2021-06-13T14:48:10.000000Z",
  //     description: "test",
  //     id: "1",
  //     name: "test",
  //     owner_id: "1",
  //     updated_at: "2021-06-13T14:48:10.000000Z"
  //   },
  //   {
  //     created_at: "2021-06-13T14:48:10.000000Z",
  //     description: "test",
  //     id: "2",
  //     name: "test",
  //     owner_id: "1",
  //     updated_at: "2021-06-13T14:48:10.000000Z"
  //   },
  //   {
  //     created_at: "2021-06-13T14:48:10.000000Z",
  //     description: "test",
  //     id: "3",
  //     name: "test",
  //     owner_id: "1",
  //     updated_at: "2021-06-13T14:48:10.000000Z"
  //   },
  //   {
  //     created_at: "2021-06-13T14:48:10.000000Z",
  //     description: "test",
  //     id: "4",
  //     name: "test",
  //     owner_id: "1",
  //     updated_at: "2021-06-13T14:48:10.000000Z"
  //   },
  // ]


  return (
    <div>
      <ManageSessions sessions={data.data} />
    </div>
  );
}
