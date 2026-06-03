'use client'

import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CarThumbnail } from '@/components/shared/CarThumbnail'
import { LicensePlate } from '@/components/shared/LicensePlate'
import { StatusDot } from '@/components/shared/StatusDot'
import type { UpcomingService } from '@/lib/types'

type UpcomingServiceListProps = {
  items: ReadonlyArray<UpcomingService>
  selectedId: string
  onSelect: (id: string) => void
}

export function UpcomingServiceList({ items, selectedId, onSelect }: UpcomingServiceListProps) {
  return (
    <div className="flex h-full flex-col">
      <header className="mb-4 flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold text-[#1D1D1F]">บริการที่กำลังจะถึง</h2>
      </header>
      <p className="mb-4 text-[12px] text-[#86868B]">เรียงตามความเร่งด่วน</p>

      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive = item.id === selectedId
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left transition',
                  'ring-1',
                  isActive
                    ? 'bg-white/[0.85] ring-black/[0.12]'
                    : 'bg-white/[0.4] ring-black/[0.04] hover:bg-white/[0.65] hover:ring-black/[0.06]',
                )}
              >
                <CarThumbnail type={item.carType} alt={item.carName} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[14px] font-medium text-[#1D1D1F]">
                      {item.carName}
                    </p>
                    <StatusDot status={item.status} />
                  </div>
                  <LicensePlate value={item.plate} className="mt-0.5 block" />
                  <p className="mt-0.5 text-[12px] text-[#6E6E73]">{item.dueDate}</p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <Button
        variant="ghost"
        className="mt-4 w-full rounded-[12px] bg-white/[0.5] py-2.5 text-[13px] font-medium text-[#1D1D1F] ring-1 ring-black/[0.06] hover:bg-white/[0.75] hover:text-[#1D1D1F]"
      >
        ดูรถทั้งหมด
        <ArrowRight className="size-3.5" />
      </Button>
    </div>
  )
}
