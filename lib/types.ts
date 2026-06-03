export type CarType = 'sedan' | 'pickup' | 'van' | 'motorcycle'

export type ServiceStatus = 'ok' | 'warn' | 'danger'

export type DashboardStats = {
  totalCars: number
  servicesThisYear: number
  totalExpense: number
  upcomingCount: number
}

export type ExpenseMonth = {
  month: string
  value: number
}

export type UpcomingService = {
  id: string
  carName: string
  plate: string
  dueDate: string
  status: ServiceStatus
  carType: CarType
}

export type RecentService = {
  id: string
  date: string
  carName: string
  plate: string
  type: string
  cost: number
}
