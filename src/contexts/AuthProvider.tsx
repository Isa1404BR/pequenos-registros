import type { Session } from '@supabase/supabase-js'
import { useEffect, useState, type ReactNode } from 'react'

import { getSession, onAuthStateChange } from '../services/auth.service'

import { AuthContext } from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      setSession(await getSession())
      setLoading(false)
    }

    void initializeAuth()

    const subscription = onAuthStateChange((session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const user = session?.user ?? null

  return (
    <AuthContext.Provider value={{ session, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
