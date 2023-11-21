import { supabase } from '../supabase'
import { UserType } from '../types'

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

async function getUser(): Promise<UserType> {
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!data) {
    throw new UserError(UserErrorType.NotFound)
  }

  return data.user
}

async function updateUser(user: Partial<UserType>): Promise<UserType> {
  const { data, error } = await supabase.auth.updateUser(user)

  if (error) {
    throw error
  }

  if (!data) {
    throw new UserError(UserErrorType.NotFound)
  }

  return data.user
}

async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('user_deletion_requests').insert({ user_id: id })

  if (error) {
    throw error
  }

  return
}

export { deleteUser, getUser, updateUser }

