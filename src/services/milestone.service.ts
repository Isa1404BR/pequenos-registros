import { supabase } from './supabase'

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
