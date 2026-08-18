import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createMilestones,
  getAllMilestones,
  getMilestoneById,
  getMilestones,
  updateMilestone,
  updateMilestoneVisibility,
} from '../services/milestone.service'

export function useMilestones(babyId: string | undefined) {
  return useQuery({
    queryKey: ['milestones', babyId],
    queryFn: () => getMilestones(babyId as string),
    enabled: !!babyId,
  })
}

export function useAllMilestones(babyId: string | undefined) {
  return useQuery({
    queryKey: ['all-milestones', babyId],
    queryFn: () => getAllMilestones(babyId as string),
    enabled: !!babyId,
  })
}

export function useMilestone(id: string | undefined) {
  return useQuery({
    queryKey: ['milestone', id],
    queryFn: () => getMilestoneById(id as string),
    enabled: !!id,
  })
}

type UpdateMilestoneInput = {
  id: string
  babyId: string
  title: string
  description: string | null
  eventDate: string
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title, description, eventDate }: UpdateMilestoneInput) =>
      updateMilestone({ id, title, description, eventDate }),
    onSuccess: (milestone, { babyId }) => {
      queryClient.setQueryData(['milestone', milestone.id], milestone)
      queryClient.invalidateQueries({ queryKey: ['milestones', babyId] })
      queryClient.invalidateQueries({ queryKey: ['all-milestones', babyId] })
    },
  })
}

type SaveMilestonesInput = {
  babyId: string
  toggles: { id: string; isHidden: boolean }[]
  newTitles: string[]
}

export function useSaveMilestones() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ babyId, toggles, newTitles }: SaveMilestonesInput) => {
      await Promise.all(
        toggles.map((toggle) =>
          updateMilestoneVisibility(toggle.id, toggle.isHidden),
        ),
      )
      await createMilestones(babyId, newTitles)
    },
    onSuccess: (_data, { babyId }) => {
      queryClient.invalidateQueries({ queryKey: ['milestones', babyId] })
      queryClient.invalidateQueries({ queryKey: ['all-milestones', babyId] })
    },
  })
}
