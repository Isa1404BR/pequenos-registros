import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  deleteMilestonePhoto,
  getBabyTags,
  getMilestonePhotos,
  getPhotoSignedUrl,
  getPhotosByMilestoneIds,
  updatePhotoTags,
  uploadMilestonePhoto,
  type Photo,
} from '../services/photo.service'

export type MilestonePhoto = Photo & { url: string }

export function useMilestonePhotos(milestoneId: string | undefined) {
  return useQuery({
    queryKey: ['milestone-photos', milestoneId],
    queryFn: async () => {
      const photos = await getMilestonePhotos(milestoneId as string)

      const withUrls = await Promise.all(
        photos.map(async (photo) => ({
          ...photo,
          url: await getPhotoSignedUrl(photo.storage_path),
        })),
      )

      return withUrls as MilestonePhoto[]
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

      const withUrls = await Promise.all(
        photos.map(async (photo) => ({
          ...photo,
          url: await getPhotoSignedUrl(photo.storage_path),
        })),
      )

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
