import type { Metadata } from 'next'
import { cars } from '@/data/cars'
import { CarDetailClient } from '@/components/cars/CarDetailClient'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const car = cars.find((c) => c.id === id)
  if (!car) return { title: 'Car not found' }
  return {
    title: `${car.brand} ${car.model}`,
    description: `Service history for ${car.brand} ${car.model} (${car.plate})`,
  }
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params
  return <CarDetailClient id={id} />
}
