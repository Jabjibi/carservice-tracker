import type { Metadata } from 'next'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export const metadata: Metadata = {
  title: 'แดชบอร์ด',
  description: 'ภาพรวมการบำรุงรักษารถของคุณ',
}

export default function DashboardPage() {
  return <DashboardClient />
}
