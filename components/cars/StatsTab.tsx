'use client'

import { baht } from '@/lib/utils'
import { computeCarStats } from '@/lib/car-stats'
import { SectionCard } from '@/components/shared/SectionCard'
import type { ServiceLog } from '@/lib/types'

type StatsTabProps = {
  logs: ReadonlyArray<ServiceLog>
  totalExpenseLabel: string
  avgLabel: string
  countLabel: string
  topLabel: string
}

export function StatsTab({
  logs,
  totalExpenseLabel,
  avgLabel,
  countLabel,
  topLabel,
}: StatsTabProps) {
  const { total, avg, count, topTypes } = computeCarStats(logs)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        <SectionCard className="p-4 text-center">
          <p className="text-[10px] font-medium tracking-wide text-[#AEAEB2] uppercase">
            {totalExpenseLabel}
          </p>
          <p className="mt-1 text-[16px] font-semibold text-[#1D1D1F]">{baht(total)}</p>
        </SectionCard>
        <SectionCard className="p-4 text-center">
          <p className="text-[10px] font-medium tracking-wide text-[#AEAEB2] uppercase">
            {avgLabel}
          </p>
          <p className="mt-1 text-[16px] font-semibold text-[#1D1D1F]">{baht(avg)}</p>
        </SectionCard>
        <SectionCard className="p-4 text-center">
          <p className="text-[10px] font-medium tracking-wide text-[#AEAEB2] uppercase">
            {countLabel}
          </p>
          <p className="mt-1 text-[16px] font-semibold text-[#1D1D1F]">{count}</p>
        </SectionCard>
      </div>

      {topTypes.length > 0 && (
        <SectionCard>
          <p className="mb-4 text-[13px] font-semibold text-[#1D1D1F]">{topLabel}</p>
          <div className="flex flex-col gap-3">
            {topTypes.map(({ type, cost, share }) => (
              <div key={type}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#1D1D1F]">{type}</span>
                  <span className="text-[13px] font-semibold text-[#1D1D1F]">{baht(cost)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div
                    className="h-full rounded-full bg-[#1D1D1F]"
                    style={{ width: `${share * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  )
}
