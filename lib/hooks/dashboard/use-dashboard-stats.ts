'use client'

import { useEffect, useState } from 'react'
import type { DashboardStats } from '@/lib/types'
import { api } from '@/lib/api-client'
import { adaptDashboardStats, type DashboardSummaryDto } from '@/lib/adapters/dashboard'

const DEFAULT: DashboardStats = {
  totalCars: 0,
  servicesThisYear: 0,
  totalExpense: 0,
  upcomingCount: 0,
}

export function useDashboardStats(): DashboardStats {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT)

  useEffect(() => {
    api
      .get<DashboardSummaryDto>('/dashboard')
      .then((data) => setStats(adaptDashboardStats(data)))
      .catch(() => {})
  }, [])

  return stats
}
