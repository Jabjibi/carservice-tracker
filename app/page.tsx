import type { Metadata } from 'next'
import { LandingContent } from '@/components/landing/LandingContent'

export const metadata: Metadata = {
  title: 'Car Service Tracker',
  description: 'ระบบติดตามการซ่อมบำรุงรถยนต์ พร้อมแจ้งเตือนผ่าน LINE',
}

export default function LandingPage() {
  return <LandingContent />
}
