import { useMemo } from 'react'
import { cars } from '@/data/cars'
import type { Car } from '@/lib/types'

export function useCars(): ReadonlyArray<Car> {
  return useMemo(() => cars, [])
}
