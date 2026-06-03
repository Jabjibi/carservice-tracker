export type CarType = 'sedan' | 'pickup' | 'van' | 'motorcycle'

export type Car = {
  id: string
  brand: string
  model: string
  year: number
  plate: string
  color?: string
  currentMileage?: number
  carType: CarType
  nextService: {
    status: ServiceStatus
    label: string
  }
}

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

export type ServiceLog = {
  id: string
  carId: string
  date: string
  type: string
  mileage: number
  cost: number
  shop?: string
  notes?: string
}

export type Trip = {
  id: string
  carId: string
  date: string
  destination: string
  distanceKm: number
  notes?: string
}
