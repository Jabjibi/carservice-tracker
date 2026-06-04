import type { Metadata } from 'next'
import { MyCarsClient } from '@/components/mycar/MyCarsClient'

export const metadata: Metadata = {
  title: 'รถของฉัน',
  description: 'รายการรถทั้งหมดของคุณ',
}

export default function MyCarPage() {
  return <MyCarsClient />
}
