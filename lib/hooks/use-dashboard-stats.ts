import { dashboardStats } from '@/data/dashboard-stats'
import type { DashboardStats } from '@/lib/types'

export function useDashboardStats(): DashboardStats {
  return dashboardStats
}
