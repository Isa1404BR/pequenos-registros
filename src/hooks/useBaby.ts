import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createBaby,
  getBaby,
  getBabyPhotoSignedUrl,
  updateBabyPhoto,
  uploadBabyPhoto,
  type Baby,
} from '../services/baby.service'
import { createDefaultMilestones } from '../services/milestone.service'
import { useAuth } from './useAuth'

export function useBaby() {
  return useQuery({
    queryKey: ['baby'],
    queryFn: getBaby,
  })
}

type CreateBabyInput = {
  name: string
  nickname?: string
  birthDate: string
}

export function useCreateBaby() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ name, nickname, birthDate }: CreateBabyInput) => {
      if (!user) throw new Error('Usuário não autenticado.')

      const id = crypto.randomUUID()

      const baby = await createBaby({
        id,
        userId: user.id,
        name,
        nickname,
        birthDate,
        photoUrl: null,
      })

      await createDefaultMilestones(id)

      return baby
    },
    onSuccess: (baby) => {
      queryClient.setQueryData(['baby'], baby)
    },
  })
}

type UpdateBabyPhotoInput = {
  babyId: string
  photo: File
}

export function useUpdateBabyPhoto() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ babyId, photo }: UpdateBabyPhotoInput) => {
      const photoUrl = await uploadBabyPhoto(babyId, photo)
      await updateBabyPhoto(babyId, photoUrl)

      return photoUrl
    },
    onSuccess: (photoUrl) => {
      queryClient.setQueryData<Baby | null>(['baby'], (current) =>
        current ? { ...current, photo_url: photoUrl } : current,
      )
    },
  })
}

export function useBabyPhotoUrl(path: string | null | undefined) {
  return useQuery({
    queryKey: ['baby-photo-url', path],
    queryFn: () => getBabyPhotoSignedUrl(path as string),
    enabled: !!path,
  })
}
