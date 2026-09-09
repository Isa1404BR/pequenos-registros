import type { Baby, Milestone, Photo } from '../types'

import { supabase } from './supabase'

export async function getPublicBaby(babyId: string) {
  const { data, error } = await supabase.rpc('get_public_baby', {
    p_baby_id: babyId,
  })

  if (error) throw error

  return (data?.[0] as Baby | undefined) ?? null
}

export async function getPublicMilestones(babyId: string) {
  const { data, error } = await supabase.rpc('get_public_milestones', {
    p_baby_id: babyId,
  })

  if (error) throw error

  return (data ?? []) as Milestone[]
}

export async function getPublicPhotos(milestoneIds: string[]) {
  if (milestoneIds.length === 0) return []

  const { data, error } = await supabase.rpc('get_public_photos', {
    p_milestone_ids: milestoneIds,
  })

  if (error) throw error

  return (data ?? []) as Photo[]
}

export async function getPublicPhotoUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('photos')
    .createSignedUrl(path, 60 * 60)

  if (error) throw error

  return data.signedUrl
}

export async function getPublicPhotoDownloadUrl(
  path: string,
  filename: string,
) {
  const { data, error } = await supabase.storage
    .from('photos')
    .createSignedUrl(path, 60 * 60, { download: filename })

  if (error) throw error

  return data.signedUrl
}
