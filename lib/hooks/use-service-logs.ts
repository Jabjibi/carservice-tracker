import { useMemo } from 'react'
import { serviceLogs } from '@/data/service-logs'
import type { ServiceLog } from '@/lib/types'

export function useServiceLogs(carId: string): ReadonlyArray<ServiceLog> {
  return useMemo(() => serviceLogs.filter((l) => l.carId === carId), [carId])
}
