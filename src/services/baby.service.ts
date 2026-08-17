import { supabase } from './supabase'

export type Baby = {
  id: string
  user_id: string
  name: string
  nickname: string | null
  birth_date: string
  photo_url: string | null
  shared_with: string[]
  created_at: string
  updated_at: string
}

export async function getBaby() {
  const { data, error } = await supabase
    .from('babies')
    .select('*')
    .maybeSingle()

  if (error) throw error

  return data as Baby | null
}

type CreateBabyParams = {
  id: string
  userId: string
  name: string
  nickname?: string
  birthDate: string
  photoUrl?: string | null
}

export async function createBaby({
  id,
  userId,
  name,
  nickname,
  birthDate,
  photoUrl,
}: CreateBabyParams) {
  const { data, error } = await supabase
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
    .single()

  if (error) throw error

  return data as Baby
}

export async function uploadBabyPhoto(babyId: string, file: File) {
  const path = `${babyId}/profile/${file.name}`

  const { error } = await supabase.storage.from('photos').upload(path, file, {
    upsert: true,
  })

  if (error) throw error

  return path
}

export async function updateBabyPhoto(babyId: string, photoUrl: string) {
  const { error } = await supabase
    .from('babies')
    .update({ photo_url: photoUrl })
    .eq('id', babyId)

  if (error) throw error
}

export async function getBabyPhotoSignedUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('photos')
    .createSignedUrl(path, 60 * 60)

  if (error) throw error

  return data.signedUrl
}
