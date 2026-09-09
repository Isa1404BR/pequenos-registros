import { supabase } from './supabase'

export type MediaType = 'photo' | 'video'

export type Photo = {
  id: string
  milestone_id: string
  storage_path: string
  media_type: MediaType
  poster_path: string | null
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
  tags: string[] = [],
) {
  const path = `${babyId}/${milestoneId}/${crypto.randomUUID()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(path, file)

  if (uploadError) throw uploadError

  const { data, error } = await supabase
    .from('photos')
    .insert({ milestone_id: milestoneId, storage_path: path, tags })
    .select()
    .single()

  if (error) throw error

  return data as Photo
}

export async function uploadMilestoneVideo(
  babyId: string,
  milestoneId: string,
  file: File,
  poster: Blob | null,
  tags: string[] = [],
) {
  const baseDir = `${babyId}/${milestoneId}/${crypto.randomUUID()}`
  const videoPath = `${baseDir}-${file.name}`
  const posterPath = poster ? `${baseDir}-poster.jpg` : null

  const { error: videoError } = await supabase.storage
    .from('photos')
    .upload(videoPath, file, { contentType: file.type })

  if (videoError) throw videoError

  if (poster && posterPath) {
    const { error: posterError } = await supabase.storage
      .from('photos')
      .upload(posterPath, poster, { contentType: 'image/jpeg' })

    if (posterError) throw posterError
  }

  const { data, error } = await supabase
    .from('photos')
    .insert({
      milestone_id: milestoneId,
      storage_path: videoPath,
      poster_path: posterPath,
      media_type: 'video',
      tags,
    })
    .select()
    .single()

  if (error) throw error

  return data as Photo
}

export async function updatePhotoTags(photoId: string, tags: string[]) {
  const { data, error } = await supabase
    .from('photos')
    .update({ tags })
    .eq('id', photoId)
    .select()
    .single()

  if (error) throw error

  return data as Photo
}

export async function getBabyTags(babyId: string) {
  const { data, error } = await supabase
    .from('photos')
    .select('tags, baby_milestones!inner(baby_id)')
    .eq('baby_milestones.baby_id', babyId)

  if (error) throw error

  const tags = new Set<string>()
  ;(data as { tags: string[] }[]).forEach((row) => {
    row.tags.forEach((tag) => tags.add(tag))
  })

  return [...tags].sort((a, b) => a.localeCompare(b))
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
  const paths = [photo.storage_path]
  if (photo.poster_path) paths.push(photo.poster_path)

  const { error: storageError } = await supabase.storage.from('photos').remove(paths)

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
