import type { UpcomingService } from '@/lib/types'

export const upcomingServices: ReadonlyArray<UpcomingService> = [
  {
    id: 'u1',
    carName: 'Honda PCX 160',
    plate: 'กง-0001',
    dueDate: 'นัดถัดไป: 1 พฤษภาคม 2567',
    status: 'danger',
    carType: 'motorcycle',
  },
  {
    id: 'u2',
    carName: 'Honda Civic',
    plate: 'กข-1234',
    dueDate: 'นัดถัดไป: 15 มิถุนายน 2567',
    status: 'warn',
    carType: 'sedan',
  },
  {
    id: 'u3',
    carName: 'Toyota Hilux Revo',
    plate: 'งจ-5678',
    dueDate: 'นัดถัดไป: 5 มิถุนายน 2567',
    status: 'ok',
    carType: 'pickup',
  },
]
