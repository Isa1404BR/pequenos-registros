import type { Session } from '@supabase/supabase-js'

import { supabase } from './supabase'

type SignUpParams = {
  name: string
  email: string
  password: string
}

type SignInParams = {
  email: string
  password: string
}

export async function signUp({ name, email, password }: SignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) throw error

  return data
}

export async function signIn({ email, password }: SignInParams) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  })

  if (error) throw error
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })

  if (error) throw error
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => callback(session))

  return subscription
}
