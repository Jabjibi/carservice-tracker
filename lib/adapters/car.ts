import type { Car, CarType } from '@/lib/types'

export type CarResponseDto = {
  id: string
  brand: string
  model: string
  year: number
  carType: string
  colorHex?: string
  licensePlate: string
  currentMileage?: number
}

export function adaptCar(dto: CarResponseDto): Car {
  return {
    id: dto.id,
    brand: dto.brand,
    model: dto.model,
    year: dto.year,
    plate: dto.licensePlate,
    color: dto.colorHex,
    currentMileage: dto.currentMileage,
    carType: (dto.carType?.toLowerCase() as CarType) ?? 'sedan',
    nextService: { status: 'ok', label: 'ปกติ' },
  }
}
