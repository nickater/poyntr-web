import { SessionInsertDto } from '../../types';


export const mapSessionFormToInputSessionType = (inputSession: SessionInsertDto): SessionInsertDto => {
  const { name, description, owner_id } = inputSession;
  return {
    name,
    description,
    owner_id,
  };
}

