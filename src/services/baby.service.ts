import type { Baby } from '../types'

import { PHOTOS_BUCKET, createPhotoSignedUrl, run, runStorage } from './client'
import { supabase } from './supabase'

export function getBaby() {
  return run<Baby | null>(
    supabase.from('babies').select('*').maybeSingle(),
    'getBaby',
  )
}

type CreateBabyParams = {
  id: string
  userId: string
  name: string
  nickname?: string
  birthDate: string
  photoUrl?: string | null
}

export function createBaby({
  id,
  userId,
  name,
  nickname,
  birthDate,
  photoUrl,
}: CreateBabyParams) {
  return run<Baby>(
    supabase
      .from('babies')
      .insert({
        id,
        user_id: userId,
        name,
        nickname: nickname || null,
        birth_date: birthDate,
        photo_url: photoUrl ?? null,
      })
      .select()
      .single(),
    'createBaby',
  )
}

export async function uploadBabyPhoto(babyId: string, file: File) {
  const path = `${babyId}/profile/${file.name}`

  await runStorage(
    supabase.storage.from(PHOTOS_BUCKET).upload(path, file, { upsert: true }),
    'uploadBabyPhoto',
  )

  return path
}

export async function updateBabyPhoto(babyId: string, photoUrl: string) {
  await run(
    supabase.from('babies').update({ photo_url: photoUrl }).eq('id', babyId),
    'updateBabyPhoto',
  )
}

export function getBabyPhotoSignedUrl(path: string) {
  return createPhotoSignedUrl(path)
}
