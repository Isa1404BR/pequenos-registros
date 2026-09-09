import type { Photo } from '../types'

import { PHOTOS_BUCKET, createPhotoSignedUrl, run, runStorage } from './client'
import { supabase } from './supabase'

export function getMilestonePhotos(milestoneId: string) {
  return run<Photo[]>(
    supabase
      .from('photos')
      .select('*')
      .eq('milestone_id', milestoneId)
      .order('created_at', { ascending: true })
      .returns<Photo[]>(),
    'getMilestonePhotos',
  )
}

export async function uploadMilestonePhoto(
  babyId: string,
  milestoneId: string,
  file: File,
  tags: string[] = [],
) {
  const path = `${babyId}/${milestoneId}/${crypto.randomUUID()}-${file.name}`

  await runStorage(
    supabase.storage.from(PHOTOS_BUCKET).upload(path, file),
    'uploadMilestonePhoto/storage',
  )

  return run<Photo>(
    supabase
      .from('photos')
      .insert({ milestone_id: milestoneId, storage_path: path, tags })
      .select()
      .single()
      .returns<Photo>(),
    'uploadMilestonePhoto',
  )
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

  await runStorage(
    supabase.storage
      .from(PHOTOS_BUCKET)
      .upload(videoPath, file, { contentType: file.type }),
    'uploadMilestoneVideo/video',
  )

  if (poster && posterPath) {
    await runStorage(
      supabase.storage
        .from(PHOTOS_BUCKET)
        .upload(posterPath, poster, { contentType: 'image/jpeg' }),
      'uploadMilestoneVideo/poster',
    )
  }

  return run<Photo>(
    supabase
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
      .returns<Photo>(),
    'uploadMilestoneVideo',
  )
}

export function updatePhotoTags(photoId: string, tags: string[]) {
  return run<Photo>(
    supabase
      .from('photos')
      .update({ tags })
      .eq('id', photoId)
      .select()
      .single()
      .returns<Photo>(),
    'updatePhotoTags',
  )
}

export async function getBabyTags(babyId: string) {
  const rows = await run<{ tags: string[] }[]>(
    supabase
      .from('photos')
      .select('tags, baby_milestones!inner(baby_id)')
      .eq('baby_milestones.baby_id', babyId)
      .returns<{ tags: string[] }[]>(),
    'getBabyTags',
  )

  const tags = new Set<string>()
  rows.forEach((row) => row.tags.forEach((tag) => tags.add(tag)))

  return [...tags].sort((a, b) => a.localeCompare(b))
}

export async function getPhotosByMilestoneIds(milestoneIds: string[]) {
  if (milestoneIds.length === 0) return []

  return run<Photo[]>(
    supabase
      .from('photos')
      .select('*')
      .in('milestone_id', milestoneIds)
      .order('created_at', { ascending: true })
      .returns<Photo[]>(),
    'getPhotosByMilestoneIds',
  )
}

export async function deleteMilestonePhoto(photo: Photo) {
  const paths = [photo.storage_path]
  if (photo.poster_path) paths.push(photo.poster_path)

  await runStorage(
    supabase.storage.from(PHOTOS_BUCKET).remove(paths),
    'deleteMilestonePhoto/storage',
  )

  await run(
    supabase.from('photos').delete().eq('id', photo.id),
    'deleteMilestonePhoto',
  )
}

export function getPhotoSignedUrl(path: string) {
  return createPhotoSignedUrl(path)
}
