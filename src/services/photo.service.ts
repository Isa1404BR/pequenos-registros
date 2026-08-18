import { supabase } from './supabase'

export type Photo = {
  id: string
  milestone_id: string
  storage_path: string
  tags: string[]
  created_at: string
  updated_at: string
}

export async function getMilestonePhotos(milestoneId: string) {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('milestone_id', milestoneId)
    .order('created_at', { ascending: true })

  if (error) throw error

  return data as Photo[]
}

export async function uploadMilestonePhoto(
  babyId: string,
  milestoneId: string,
  file: File,
) {
  const path = `${babyId}/${milestoneId}/${crypto.randomUUID()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(path, file)

  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from('photos')
    .insert({ milestone_id: milestoneId, storage_path: path })
    .select()
    .single()

  if (error) throw error

  return data as Photo
}

export async function getPhotosByMilestoneIds(milestoneIds: string[]) {
  if (milestoneIds.length === 0) return []

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .in('milestone_id', milestoneIds)
    .order('created_at', { ascending: true })

  if (error) throw error

  return data as Photo[]
}

export async function deleteMilestonePhoto(photo: Photo) {
  const { error: storageError } = await supabase.storage
    .from('photos')
    .remove([photo.storage_path])

  if (storageError) throw storageError

  const { error } = await supabase.from('photos').delete().eq('id', photo.id)

  if (error) throw error
}

export async function getPhotoSignedUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('photos')
    .createSignedUrl(path, 60 * 60)

  if (error) throw error

  return data.signedUrl
}
