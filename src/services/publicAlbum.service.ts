import type { Baby, Milestone, Photo } from '../types'

import { createPhotoSignedUrl, run } from './client'
import { supabase } from './supabase'

export async function getPublicBaby(babyId: string) {
  const rows = await run<Baby[]>(
    supabase.rpc('get_public_baby', { p_baby_id: babyId }),
    'getPublicBaby',
  )

  return rows[0] ?? null
}

export function getPublicMilestones(babyId: string) {
  return run<Milestone[]>(
    supabase.rpc('get_public_milestones', { p_baby_id: babyId }),
    'getPublicMilestones',
  )
}

export async function getPublicPhotos(milestoneIds: string[]) {
  if (milestoneIds.length === 0) return []

  return run<Photo[]>(
    supabase
      .rpc('get_public_photos', { p_milestone_ids: milestoneIds })
      .returns<Photo[]>(),
    'getPublicPhotos',
  )
}

export function getPublicPhotoUrl(path: string) {
  return createPhotoSignedUrl(path)
}

export function getPublicPhotoDownloadUrl(path: string, filename: string) {
  return createPhotoSignedUrl(path, { download: filename })
}
