import { supabase } from './supabase'

export type Milestone = {
  id: string
  baby_id: string
  title: string
  description: string | null
  event_date: string | null
  is_hidden: boolean
  created_at: string
  updated_at: string
}

export const DEFAULT_MILESTONE_TITLES = [
  'Teste de gravidez',
  'Primeiro ultrassom',
  'Chá revelação',
  'Nascimento',
  'Primeiro banho',
  'Primeiro sorriso',
  'Primeiro dentinho',
  'Primeiros passos',
  'Primeira palavra',
  'Primeiro aniversário',
]

export async function createDefaultMilestones(babyId: string) {
  const rows = DEFAULT_MILESTONE_TITLES.map((title) => ({
    baby_id: babyId,
    title,
  }))

  const { error } = await supabase.from('baby_milestones').insert(rows)

  if (error) throw error
}

export async function getMilestones(babyId: string) {
  const { data, error } = await supabase
    .from('baby_milestones')
    .select('*')
    .eq('baby_id', babyId)
    .eq('is_hidden', false)

  if (error) throw error

  return data as Milestone[]
}

export async function getAllMilestones(babyId: string) {
  const { data, error } = await supabase
    .from('baby_milestones')
    .select('*')
    .eq('baby_id', babyId)
    .order('created_at', { ascending: true })

  if (error) throw error

  return data as Milestone[]
}

export async function updateMilestoneVisibility(id: string, isHidden: boolean) {
  const { error } = await supabase
    .from('baby_milestones')
    .update({ is_hidden: isHidden })
    .eq('id', id)

  if (error) throw error
}

export async function createMilestones(babyId: string, titles: string[]) {
  if (titles.length === 0) return

  const rows = titles.map((title) => ({ baby_id: babyId, title }))
  const { error } = await supabase.from('baby_milestones').insert(rows)

  if (error) throw error
}
