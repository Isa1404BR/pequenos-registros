import { useQuery } from '@tanstack/react-query'

import {
  getPublicBaby,
  getPublicMilestones,
  getPublicPhotoUrl,
  getPublicPhotos,
} from '../services/publicAlbum.service'
import type { MilestonePhoto } from './usePhotos'

export function usePublicBaby(babyId: string | undefined) {
  return useQuery({
    queryKey: ['public-baby', babyId],
    queryFn: () => getPublicBaby(babyId as string),
    enabled: !!babyId,
  })
}

export function usePublicMilestones(babyId: string | undefined) {
  return useQuery({
    queryKey: ['public-milestones', babyId],
    queryFn: () => getPublicMilestones(babyId as string),
    enabled: !!babyId,
  })
}

export function usePublicAlbumPhotos(milestoneIds: string[]) {
  const key = [...milestoneIds].sort().join(',')

  return useQuery({
    queryKey: ['public-album-photos', key],
    queryFn: async () => {
      const photos = await getPublicPhotos(milestoneIds)

      const withUrls = await Promise.all(
        photos.map(async (photo) => ({
          ...photo,
          url: await getPublicPhotoUrl(photo.storage_path),
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
