'use client'

import { useEffect, useState } from 'react'
import type { DashboardStats, UpcomingService } from '@/lib/types'
import { api } from '@/lib/api-client'
import {
  adaptDashboardStats,
  adaptUpcomingService,
  type DashboardSummaryDto,
} from '@/lib/adapters/dashboard'

const DEFAULT_STATS: DashboardStats = {
  totalCars: 0,
  servicesThisYear: 0,
  totalExpense: 0,
  upcomingCount: 0,
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS)
  const [upcoming, setUpcoming] = useState<UpcomingService[]>([])
  const [selectedId, setSelectedId] = useState<string>('')

  useEffect(() => {
    api
      .get<DashboardSummaryDto>('/dashboard')
      .then((data) => {
        setStats(adaptDashboardStats(data))
        const adapted = data.upcomingServices.map(adaptUpcomingService)
        setUpcoming(adapted)
        if (adapted.length > 0) setSelectedId(adapted[0].id)
      })
      .catch(() => {})
  }, [])

  return { stats, upcoming, selectedId, select: setSelectedId }
}
