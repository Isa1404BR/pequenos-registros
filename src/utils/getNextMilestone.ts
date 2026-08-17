import { DEFAULT_MILESTONE_TITLES } from '../services/milestone.service'
import type { Milestone } from '../services/milestone.service'

function getDefaultOrder(title: string) {
  const index = DEFAULT_MILESTONE_TITLES.indexOf(title)
  return index === -1 ? DEFAULT_MILESTONE_TITLES.length : index
}

export function getNextMilestone(milestones: Milestone[]) {
  const unregistered = milestones.filter((milestone) => !milestone.event_date)

  return [...unregistered].sort(
    (a, b) => getDefaultOrder(a.title) - getDefaultOrder(b.title),
  )[0]
}
