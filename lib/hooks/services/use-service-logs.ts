'use client'

import { useEffect, useState } from 'react'
import type { ServiceLog } from '@/lib/types'
import { api } from '@/lib/api-client'
import { adaptServiceLog, type ServiceLogResponseDto } from '@/lib/adapters/service'

export function useServiceLogs(carId: string): ReadonlyArray<ServiceLog> {
  const [logs, setLogs] = useState<ServiceLog[]>([])

  useEffect(() => {
    api
      .get<ServiceLogResponseDto[]>(`/cars/${carId}/services`)
      .then((data) => setLogs(data.map(adaptServiceLog)))
      .catch(() => {})
  }, [carId])

  return logs
}
