import { useQuery } from '@tanstack/react-query'

import { getMilestones } from '../services/milestone.service'

export function useMilestones(babyId: string | undefined) {
  return useQuery({
    queryKey: ['milestones', babyId],
    queryFn: () => getMilestones(babyId as string),
    enabled: !!babyId,
  })
}
