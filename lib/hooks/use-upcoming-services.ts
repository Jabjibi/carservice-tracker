'use client'

import { useState } from 'react'
import { upcomingServices } from '@/data/upcoming-services'

export function useUpcomingServices() {
  const [selectedId, setSelectedId] = useState<string>(upcomingServices[0].id)
  return {
    items: upcomingServices,
    selectedId,
    select: setSelectedId,
  }
}
