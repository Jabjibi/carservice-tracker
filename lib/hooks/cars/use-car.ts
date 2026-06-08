'use client'

import { useEffect, useState } from 'react'
import type { Car } from '@/lib/types'
import { api } from '@/lib/api-client'
import { adaptCar, type CarResponseDto } from '@/lib/adapters/car'

export function useCar(id: string): Car | undefined {
  const [car, setCar] = useState<Car | undefined>(undefined)

  useEffect(() => {
    api
      .get<CarResponseDto>(`/cars/${id}`)
      .then((data) => setCar(adaptCar(data)))
      .catch(() => {})
  }, [id])

  return car
}
