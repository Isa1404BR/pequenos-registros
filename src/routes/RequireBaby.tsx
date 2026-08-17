import { Navigate, Outlet } from 'react-router-dom'

import { useBaby } from '../hooks/useBaby'

export function RequireBaby() {
  const { data: baby, isLoading } = useBaby()

  if (isLoading) {
    return null
  }

  if (!baby) {
    return <Navigate to="/cadastro-bebe" replace />
  }

  return <Outlet />
}
