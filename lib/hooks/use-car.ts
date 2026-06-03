import { useMemo } from 'react'
import { cars } from '@/data/cars'
import type { Car } from '@/lib/types'

export function useCar(id: string): Car | undefined {
  return useMemo(() => cars.find((c) => c.id === id), [id])
}
