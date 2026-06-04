import Link from 'next/link'
import { ChevronRight, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CarThumbnail } from '@/components/shared/CarThumbnail'
import { LicensePlate } from '@/components/shared/LicensePlate'
import { StatusDot } from '@/components/shared/StatusDot'
import type { Car } from '@/lib/types'

type CarCardProps = {
  car: Car
  logServiceLabel: string
}

const STATUS_LABEL: Record<Car['nextService']['status'], string> = {
  ok: 'text-[#6E6E73]',
  warn: 'text-[#1D1D1F]',
  danger: 'text-[#1D1D1F] font-semibold',
}

export function CarCard({ car, logServiceLabel }: CarCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-[20px] bg-white/[0.6] ring-1 ring-black/[0.06] backdrop-blur-2xl',
        'transition hover:bg-white/[0.8] hover:ring-black/[0.1]',
        car.nextService.status === 'danger' && 'ring-black/[0.12]',
      )}
    >
      {/* Main clickable area — navigates to car detail */}
      <Link href={`/mycar/${car.id}`} className="group flex flex-col gap-4 p-5 pb-4">
        <div className="relative flex items-start justify-center">
          <CarThumbnail
            type={car.carType}
            alt={`${car.brand} ${car.model}`}
            className="h-24 w-full"
            bare
          />
          <ChevronRight className="absolute top-0 right-0 size-4 shrink-0 text-[#C7C7CC] transition group-hover:text-[#6E6E73]" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-[16px] leading-tight font-semibold text-[#1D1D1F]">
            {car.brand} {car.model}
          </p>
          <div className="flex items-center gap-2">
            <LicensePlate value={car.plate} />
            <span className="text-[12px] text-[#AEAEB2]">·</span>
            <span className="text-[12px] text-[#AEAEB2]">{car.year}</span>
          </div>
          {car.currentMileage !== undefined && (
            <p className="text-[12px] text-[#AEAEB2]">
              {car.currentMileage.toLocaleString('th-TH')} กม.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-black/[0.05] pt-3">
          <StatusDot status={car.nextService.status} />
          <p className={cn('text-[12px]', STATUS_LABEL[car.nextService.status])}>
            {car.nextService.label}
          </p>
        </div>
      </Link>

      {/* Action row */}
      <div className="border-t border-black/[0.05] px-5 pt-3 pb-4">
        <Link
          href={`/repair?id=${car.id}`}
          className={cn(
            'flex w-full items-center justify-center gap-1.5 rounded-[10px] py-2',
            'bg-black/[0.03] text-[13px] font-medium text-[#6E6E73] ring-1 ring-black/[0.06]',
            'transition hover:bg-black/[0.06] hover:text-[#1D1D1F]',
          )}
        >
          <Wrench className="size-3.5" />
          {logServiceLabel}
        </Link>
      </div>
    </div>
  )
}
