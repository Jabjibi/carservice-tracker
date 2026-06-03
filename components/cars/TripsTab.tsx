'use client'

import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionCard } from '@/components/shared/SectionCard'
import type { Trip } from '@/lib/types'

type TripsTabProps = {
  trips: ReadonlyArray<Trip>
  totalDistanceLabel: string
  tripCountLabel: string
  emptyLabel: string
  emptyHint: string
}

export function TripsTab({
  trips,
  totalDistanceLabel,
  tripCountLabel,
  emptyLabel,
  emptyHint,
}: TripsTabProps) {
  const totalKm = trips.reduce((sum, t) => sum + t.distanceKm, 0)

  return (
    <div className="flex flex-col gap-4">
      {trips.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <SectionCard className="p-4 text-center">
            <p className="text-[11px] font-medium tracking-wide text-[#AEAEB2] uppercase">
              {totalDistanceLabel}
            </p>
            <p className="mt-1 text-[20px] font-semibold text-[#1D1D1F]">
              {totalKm.toLocaleString('th-TH')}
              <span className="ml-1 text-[13px] font-normal text-[#AEAEB2]">กม.</span>
            </p>
          </SectionCard>
          <SectionCard className="p-4 text-center">
            <p className="text-[11px] font-medium tracking-wide text-[#AEAEB2] uppercase">
              {tripCountLabel}
            </p>
            <p className="mt-1 text-[20px] font-semibold text-[#1D1D1F]">{trips.length}</p>
          </SectionCard>
        </div>
      )}

      <SectionCard>
        {trips.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.05]">
              <MapPin className="size-5 text-[#AEAEB2]" />
            </span>
            <p className="mt-3 text-[14px] font-medium text-[#1D1D1F]">{emptyLabel}</p>
            <p className="mt-1 text-[12px] text-[#6E6E73]">{emptyHint}</p>
          </div>
        ) : (
          <ol className="flex flex-col">
            {trips.map((trip, index) => (
              <TripTimelineItem key={trip.id} trip={trip} isLast={index === trips.length - 1} />
            ))}
          </ol>
        )}
      </SectionCard>
    </div>
  )
}

type TripTimelineItemProps = { trip: Trip; isLast: boolean }

function TripTimelineItem({ trip, isLast }: TripTimelineItemProps) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[#AEAEB2] ring-2 ring-white ring-offset-1" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-black/[0.08]" />}
      </div>
      <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
        <p className="text-[11px] font-medium tracking-wide text-[#AEAEB2] uppercase">
          {trip.date}
        </p>
        <p className="mt-0.5 text-[14px] font-medium text-[#1D1D1F]">{trip.destination}</p>
        <p className="mt-0.5 text-[12px] text-[#AEAEB2]">
          {trip.distanceKm.toLocaleString('th-TH')} กม.
        </p>
        {trip.notes && <p className="mt-0.5 text-[12px] text-[#6E6E73]">{trip.notes}</p>}
      </div>
    </li>
  )
}
