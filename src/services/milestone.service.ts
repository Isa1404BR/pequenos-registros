import type { Milestone } from '../types'

import { run } from './client'
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

  await run(
    supabase.from('baby_milestones').insert(rows),
    'createDefaultMilestones',
  )
}

export function getMilestones(babyId: string) {
  return run<Milestone[]>(
    supabase
      .from('baby_milestones')
      .select('*')
      .eq('baby_id', babyId)
      .eq('is_hidden', false),
    'getMilestones',
  )
}

export function getAllMilestones(babyId: string) {
  return run<Milestone[]>(
    supabase
      .from('baby_milestones')
      .select('*')
      .eq('baby_id', babyId)
      .order('created_at', { ascending: true }),
    'getAllMilestones',
  )
}

export async function updateMilestoneVisibility(id: string, isHidden: boolean) {
  await run(
    supabase
      .from('baby_milestones')
      .update({ is_hidden: isHidden })
      .eq('id', id),
    'updateMilestoneVisibility',
  )
}

export async function createMilestones(babyId: string, titles: string[]) {
  if (titles.length === 0) return

  const rows = titles.map((title) => ({ baby_id: babyId, title }))

  await run(supabase.from('baby_milestones').insert(rows), 'createMilestones')
}

export function getMilestoneById(id: string) {
  return run<Milestone>(
    supabase.from('baby_milestones').select('*').eq('id', id).single(),
    'getMilestoneById',
  )
}

type UpdateMilestoneParams = {
  id: string
  title: string
  description: string | null
  eventDate: string
}

export function updateMilestone({
  id,
  title,
  description,
  eventDate,
}: UpdateMilestoneParams) {
  return run<Milestone>(
    supabase
      .from('baby_milestones')
      .update({ title, description, event_date: eventDate })
      .eq('id', id)
      .select()
      .single(),
    'updateMilestone',
  )
}
