import type { Metadata } from 'next'
import { AddCarClient } from '@/components/add-car/AddCarClient'

export const metadata: Metadata = {
  title: 'เพิ่มรถใหม่',
  description: 'ลงทะเบียนรถเพื่อเริ่มติดตามประวัติการซ่อมบำรุง',
}

export default function AddCarPage() {
  return <AddCarClient />
}
