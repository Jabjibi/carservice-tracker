import type { Car } from '@/lib/types'

export const cars: ReadonlyArray<Car> = [
  {
    id: 'c1',
    brand: 'Honda',
    model: 'Civic',
    year: 2021,
    plate: 'กข-1234',
    color: 'ขาว',
    currentMileage: 48500,
    carType: 'sedan',
    nextService: { status: 'warn', label: 'เปลี่ยนน้ำมันเครื่อง ใน 1,500 กม.' },
  },
  {
    id: 'c2',
    brand: 'Toyota',
    model: 'Hilux Revo',
    year: 2019,
    plate: 'งจ-5678',
    color: 'เทา',
    currentMileage: 92000,
    carType: 'pickup',
    nextService: { status: 'ok', label: 'ถัดไป: 5 มิถุนายน 2567' },
  },
  {
    id: 'c3',
    brand: 'Honda',
    model: 'PCX 160',
    year: 2023,
    plate: 'กง-0001',
    currentMileage: 12300,
    carType: 'motorcycle',
    nextService: { status: 'danger', label: 'เลยกำหนด! ตรวจสอบด่วน' },
  },
]
