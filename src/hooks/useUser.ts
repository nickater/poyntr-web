import { useEffect, useState } from 'react'

import { Session } from '@supabase/supabase-js'
import { UserType } from '../types'
import { useSupabase } from './useSupabase'

export const useUser = () => {
  const client = useSupabase()
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<null | UserType>(null)

  useEffect(() => {
    setIsLoading(true)
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [client.auth])

  const loginWithGithub = async () => {
    setIsLoading(true)
    const result = await client.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: 'http://localhost:5173' } })

    if (result.error) {
      console.log(result.error)
    }
    setIsLoading(false)
    return result
  }

  const logout = async () => {
    const result = await client.auth.signOut()

    if (result.error) {
      console.log(result.error)
    }

    return result
  }

  return { session, user, loginWithGithub, logout, isLoading }
}



