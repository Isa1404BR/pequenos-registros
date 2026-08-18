import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createMilestones,
  getAllMilestones,
  getMilestones,
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
