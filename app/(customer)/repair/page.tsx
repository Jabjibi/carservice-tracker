import type { Metadata } from 'next'
import { LogServiceClient } from '@/components/repair/LogServiceClient'

export const metadata: Metadata = {
  title: 'บันทึกการซ่อม',
  description: 'บันทึกประวัติการซ่อมบำรุงรถยนต์',
}

type Props = { searchParams: Promise<{ id?: string }> }

export default async function RepairPage({ searchParams }: Props) {
  const { id = '' } = await searchParams
  return <LogServiceClient id={id} />
}
