import { useMemo } from 'react'
import { trips } from '@/data/trips'
import type { Trip } from '@/lib/types'

export function useTrips(carId: string): ReadonlyArray<Trip> {
  return useMemo(() => trips.filter((t) => t.carId === carId), [carId])
}
