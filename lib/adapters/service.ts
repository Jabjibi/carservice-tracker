import type { ServiceLog } from '@/lib/types'

export type ServiceLogResponseDto = {
  id: string
  carId: string
  serviceType: string
  serviceDate: string
  mileageAtService: number
  cost: number
  garageName?: string
  notes?: string
  nextDueDate?: string
  nextDueMileage?: number
}

export function adaptServiceLog(dto: ServiceLogResponseDto): ServiceLog {
  return {
    id: dto.id,
    carId: dto.carId,
    date: dto.serviceDate.split('T')[0],
    type: dto.serviceType,
    mileage: dto.mileageAtService,
    cost: dto.cost,
    shop: dto.garageName,
    notes: dto.notes,
  }
}
