import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  deleteMilestonePhoto,
  getMilestonePhotos,
  getPhotoSignedUrl,
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

type UploadMilestonePhotoInput = {
  babyId: string
  milestoneId: string
  file: File
}

export function useUploadMilestonePhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ babyId, milestoneId, file }: UploadMilestonePhotoInput) =>
      uploadMilestonePhoto(babyId, milestoneId, file),
    onSuccess: (_photo, { milestoneId }) => {
      queryClient.invalidateQueries({
        queryKey: ['milestone-photos', milestoneId],
      })
    },
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
