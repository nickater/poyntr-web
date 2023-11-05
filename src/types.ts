export type SessionType = {
  id: string;
  name?: string;
  description?: string;
  creator?: User;
  createdAt: Date;
  updatedAt: Date;
  status: 'CREATED' | 'STARTED' | 'FINISHED';

  tickets: TicketType[];
  users: User[];
  voteOptions: string[];
};

export type InputSessionType = Omit<SessionType, 'id' | 'createdAt' | 'updatedAt'>;

export type TicketType = {
  id: string;
  name?: string;
  description?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  votes: VoteType[];
};

export type InputTicketType = Omit<TicketType, 'id' | 'createdAt' | 'updatedAt' | 'votes'>;

export type User = {
  id: string;
  name: string;
  email?: string;
};

export type InputUserType = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type VoteType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  value: number;
};

export type InputVoteType = Omit<VoteType, 'id' | 'createdAt' | 'updatedAt'>;