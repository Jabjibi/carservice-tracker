import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CarThumbnail } from '@/components/shared/CarThumbnail'
import { LicensePlate } from '@/components/shared/LicensePlate'
import { StatusDot } from '@/components/shared/StatusDot'
import type { Car } from '@/lib/types'

type CarCardProps = {
  car: Car
  priority?: boolean
}

const STATUS_LABEL: Record<Car['nextService']['status'], string> = {
  ok: 'text-text-secondary',
  warn: 'text-text-primary',
  danger: 'text-text-primary font-semibold',
}

export function CarCard({ car, priority = false }: CarCardProps) {
  return (
    <Link
      href={`/mycar/${car.id}`}
      className={cn(
        'group flex flex-col gap-4 rounded-[20px] bg-white/[0.6] p-5 ring-1 ring-black/[0.06]',
        'backdrop-blur-2xl transition hover:bg-white/[0.8] hover:ring-black/[0.1]',
        car.nextService.status === 'danger' && 'ring-black/[0.12]',
      )}
    >
      <div className="relative flex items-start justify-center">
        <CarThumbnail
          type={car.carType}
          alt={`${car.brand} ${car.model}`}
          className="h-24 w-full"
          bare
          priority={priority}
        />
        <ChevronRight className="text-text-disabled group-hover:text-text-secondary absolute top-0 right-0 size-4 shrink-0 transition" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-text-primary text-[16px] leading-tight font-semibold">
          {car.brand} {car.model}
        </p>
        <div className="flex items-center gap-2">
          <LicensePlate value={car.plate} />
          <span className="text-text-muted text-[12px]">·</span>
          <span className="text-text-muted text-[12px]">{car.year}</span>
        </div>
        {car.currentMileage !== undefined && (
          <p className="text-text-muted text-[12px]">
            {car.currentMileage.toLocaleString('th-TH')} กม.
          </p>
        )}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-black/[0.05] pt-3">
        <StatusDot status={car.nextService.status} />
        <p className={cn('text-[12px]', STATUS_LABEL[car.nextService.status])}>
          {car.nextService.label}
        </p>
      </div>
    </Link>
  )
}
