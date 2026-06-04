import { useState } from 'react'
import type { CarType } from '@/lib/types'

export const CAR_TYPES: CarType[] = ['sedan', 'pickup', 'van', 'motorcycle']

export function useAddCarForm() {
  const [carType, setCarType] = useState<CarType>('sedan')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [plate, setPlate] = useState('')
  const [color, setColor] = useState('')
  const [mileage, setMileage] = useState('')

  return {
    state: { carType, brand, model, year, plate, color, mileage },
    actions: { setCarType, setBrand, setModel, setYear, setPlate, setColor, setMileage },
  }
}
