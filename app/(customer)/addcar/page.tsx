import type { Metadata } from 'next'
import { AddCarClient } from '@/components/add-car/AddCarClient'

export const metadata: Metadata = {
  title: 'Add New Car',
  description: 'Register a new vehicle to start tracking service history',
}

export default function AddCarPage() {
  return <AddCarClient />
}
