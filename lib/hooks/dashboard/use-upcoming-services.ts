'use client'

import { useEffect, useState } from 'react'
import type { UpcomingService } from '@/lib/types'
import { api } from '@/lib/api-client'
import { adaptUpcomingService, type DashboardSummaryDto } from '@/lib/adapters/dashboard'

export function useUpcomingServices() {
  const [items, setItems] = useState<UpcomingService[]>([])
  const [selectedId, setSelectedId] = useState<string>('')

  useEffect(() => {
    api
      .get<DashboardSummaryDto>('/dashboard')
      .then((data) => {
        const adapted = data.upcomingServices.map(adaptUpcomingService)
        setItems(adapted)
        if (adapted.length > 0) setSelectedId(adapted[0].id)
      })
      .catch(() => {})
  }, [])

  return { items, selectedId, select: setSelectedId }
}
