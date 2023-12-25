import { UserType } from '../types'
import { Client } from '../types/general'

export enum UserErrorType {
  NotFound = 'Not Found',
  Unknown = 'Unknown',
}
class UserError extends Error {
  constructor(public userErrorType: UserErrorType) {
    super(userErrorType)
    this.name = 'UserError'
  }
}

async function getUser(client: Client): Promise<UserType> {
  const { data, error } = await client.auth.getUser()

  if (error) {
    throw error
  }

  if (!data) {
    throw new UserError(UserErrorType.NotFound)
  }

  return data.user
}

async function updateUser(client: Client, user: Partial<UserType>): Promise<UserType> {
  const { data, error } = await client.auth.updateUser(user)

  if (error) {
    throw error
  }

  if (!data) {
    throw new UserError(UserErrorType.NotFound)
  }

  return data.user
}

async function deleteUser(client: Client, id: string): Promise<void> {
  const { error } = await client.from('user_deletion_requests').insert({ user_id: id })

  if (error) {
    throw error
  }

  return
}

export { deleteUser, getUser, updateUser }

