import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  deleteMilestonePhoto,
  getBabyTags,
  getMilestonePhotos,
  getPhotoSignedUrl,
  getPhotosByMilestoneIds,
  updatePhotoTags,
  uploadMilestonePhoto,
  uploadMilestoneVideo,
  type Photo,
} from '../services/photo.service'

export type MilestonePhoto = Photo & { url: string; posterUrl: string | null }

export async function withMediaUrls(photo: Photo): Promise<MilestonePhoto> {
  return {
    ...photo,
    url: await getPhotoSignedUrl(photo.storage_path),
    posterUrl: photo.poster_path ? await getPhotoSignedUrl(photo.poster_path) : null,
  }
}

export function useMilestonePhotos(milestoneId: string | undefined) {
  return useQuery({
    queryKey: ['milestone-photos', milestoneId],
    queryFn: async () => {
      const photos = await getMilestonePhotos(milestoneId as string)

      return Promise.all(photos.map(withMediaUrls))
    },
    enabled: !!milestoneId,
  })
}

export function useAlbumPhotos(milestoneIds: string[]) {
  const key = [...milestoneIds].sort().join(',')

  return useQuery({
    queryKey: ['album-photos', key],
    queryFn: async () => {
      const photos = await getPhotosByMilestoneIds(milestoneIds)

      const withUrls = await Promise.all(photos.map(withMediaUrls))

      const photosByMilestone = new Map<string, MilestonePhoto[]>()
      withUrls.forEach((photo) => {
        const current = photosByMilestone.get(photo.milestone_id) ?? []
        current.push(photo)
        photosByMilestone.set(photo.milestone_id, current)
      })

      return photosByMilestone
    },
    enabled: milestoneIds.length > 0,
  })
}

type UploadMilestonePhotoInput = {
  babyId: string
  milestoneId: string
  file: File
  tags?: string[]
}

export function useUploadMilestonePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ babyId, milestoneId, file, tags }: UploadMilestonePhotoInput) =>
      uploadMilestonePhoto(babyId, milestoneId, file, tags),
    onSuccess: (_photo, { milestoneId, babyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['milestone-photos', milestoneId],
      })
      queryClient.invalidateQueries({ queryKey: ['baby-tags', babyId] })
    },
  })
}

type UploadMilestoneVideoInput = {
  babyId: string
  milestoneId: string
  file: File
  poster: Blob | null
  tags?: string[]
}

export function useUploadMilestoneVideo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ babyId, milestoneId, file, poster, tags }: UploadMilestoneVideoInput) =>
      uploadMilestoneVideo(babyId, milestoneId, file, poster, tags),
    onSuccess: (_photo, { milestoneId, babyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['milestone-photos', milestoneId],
      })
      queryClient.invalidateQueries({ queryKey: ['baby-tags', babyId] })
    },
  })
}

type UpdatePhotoTagsInput = {
  photoId: string
  tags: string[]
  milestoneId: string
  babyId: string
}

export function useUpdatePhotoTags() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ photoId, tags }: UpdatePhotoTagsInput) =>
      updatePhotoTags(photoId, tags),
    onSuccess: (_photo, { milestoneId, babyId }) => {
      queryClient.invalidateQueries({
        queryKey: ['milestone-photos', milestoneId],
      })
      queryClient.invalidateQueries({ queryKey: ['baby-tags', babyId] })
    },
  })
}

export function useBabyTags(babyId: string | undefined) {
  return useQuery({
    queryKey: ['baby-tags', babyId],
    queryFn: () => getBabyTags(babyId as string),
    enabled: !!babyId,
  })
}

export function useDeleteMilestonePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (photo: Photo) => deleteMilestonePhoto(photo),
    onSuccess: (_data, photo) => {
      queryClient.invalidateQueries({
        queryKey: ['milestone-photos', photo.milestone_id],
      })
    },
  })
}
