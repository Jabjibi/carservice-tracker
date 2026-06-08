'use client'

import { useEffect, useState } from 'react'
import type { Car } from '@/lib/types'
import { api } from '@/lib/api-client'
import { adaptCar, type CarResponseDto } from '@/lib/adapters/car'

export function useCars(): ReadonlyArray<Car> {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    api
      .get<CarResponseDto[]>('/cars')
      .then((data) => setCars(data.map(adaptCar)))
      .catch(() => {})
  }, [])

  return cars
}
