import { useCallback, useEffect } from 'react'
import { v4 } from 'uuid'
import storageService from '../services/storage'
import { setUsername as _setUsername, setUserId } from '../store/userSlice'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'

const useUser = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const checkUserId = useCallback(() => {
    const userId = storageService.getItem('userId')

    if (userId) {
      dispatch(setUserId(userId))
    }

    if (!userId) {
      const userId = v4()
      storageService.setItem('userId', userId)

      dispatch(setUserId(userId))
    }
  }, [dispatch])

  const checkUsername = useCallback(() => {
    const username = storageService.getItem('username')

    if (username) {
      dispatch(_setUsername(username))
      return true
    }
    return false

  }, [dispatch])

  const setUsername = useCallback((username: string) => {
    storageService.setItem('username', username)
    dispatch(_setUsername(username))
    checkUserId()
  }, [checkUserId, dispatch])

  const clearUserId = useCallback(() => {
    storageService.removeItem('userId')
    dispatch(setUserId(null))
  }, [dispatch])

  const clearUsername = useCallback(() => {
    storageService.removeItem('username')
    dispatch(_setUsername(null))
  }, [dispatch])

  const setNewUserId = useCallback(() => {
    const userId = v4()
    storageService.setItem('userId', userId)

    dispatch(setUserId(userId))
  }, [dispatch])

  const clearUser = useCallback(() => {
    clearUserId()
    clearUsername()
  }, [clearUserId, clearUsername])

  useEffect(() => {
    checkUserId()
    checkUsername()
  }, [checkUserId, checkUsername])

  return { user, setNewUserId, setUsername, clearUser, checkUsername }
}

export { useUser }
