import type { DashboardStats, ServiceStatus, UpcomingService } from '@/lib/types'

export type UpcomingServiceDto = {
  serviceLogId: string
  carBrand: string
  carModel: string
  serviceType: string
  nextDueDate: string
  daysRemaining: number
}

export type DashboardSummaryDto = {
  totalCars: number
  totalServiceLogs: number
  totalCost: number
  upcomingServices: UpcomingServiceDto[]
}

export function adaptDashboardStats(dto: DashboardSummaryDto): DashboardStats {
  return {
    totalCars: dto.totalCars,
    servicesThisYear: dto.totalServiceLogs,
    totalExpense: dto.totalCost,
    upcomingCount: dto.upcomingServices.length,
  }
}

export function adaptUpcomingService(dto: UpcomingServiceDto): UpcomingService {
  const status: ServiceStatus =
    dto.daysRemaining < 0 ? 'danger' : dto.daysRemaining <= 30 ? 'warn' : 'ok'

  return {
    id: dto.serviceLogId,
    carName: `${dto.carBrand} ${dto.carModel}`,
    plate: '',
    dueDate: formatThaiShortDate(dto.nextDueDate),
    status,
    carType: 'sedan',
  }
}

function formatThaiShortDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}
