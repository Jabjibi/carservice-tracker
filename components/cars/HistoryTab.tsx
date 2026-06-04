'use client'

import { Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { baht } from '@/lib/utils'
import { SectionCard } from '@/components/shared/SectionCard'
import type { ServiceLog } from '@/lib/types'

type HistoryTabProps = {
  logs: ReadonlyArray<ServiceLog>
  shopLabel: string
  emptyLabel: string
  emptyHint: string
}

export function HistoryTab({ logs, shopLabel, emptyLabel, emptyHint }: HistoryTabProps) {
  return (
    <SectionCard>
      {logs.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.05]">
            <Wrench className="text-text-muted size-5" />
          </span>
          <p className="text-text-primary mt-3 text-[14px] font-medium">{emptyLabel}</p>
          <p className="text-text-secondary mt-1 text-[12px]">{emptyHint}</p>
        </div>
      ) : (
        <ol className="flex flex-col">
          {logs.map((log, index) => (
            <ServiceTimelineItem
              key={log.id}
              log={log}
              isLast={index === logs.length - 1}
              shopLabel={shopLabel}
            />
          ))}
        </ol>
      )}
    </SectionCard>
  )
}

type ServiceTimelineItemProps = {
  log: ServiceLog
  isLast: boolean
  shopLabel: string
}

function ServiceTimelineItem({ log, isLast, shopLabel }: ServiceTimelineItemProps) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="bg-text-primary mt-1 size-2.5 shrink-0 rounded-full ring-2 ring-white ring-offset-1" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-black/[0.08]" />}
      </div>
      <div className={cn('flex-1 pb-6', isLast && 'pb-0')}>
        <p className="text-text-muted text-[11px] font-medium tracking-wide uppercase">
          {log.date}
        </p>
        <p className="text-text-primary mt-0.5 text-[14px] font-medium">{log.type}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <span className="text-text-primary text-[13px] font-semibold">{baht(log.cost)}</span>
          <span className="text-text-muted text-[12px]">
            {log.mileage.toLocaleString('th-TH')} กม.
          </span>
        </div>
        {log.shop && (
          <p className="text-text-secondary mt-1 text-[12px]">
            {shopLabel}: {log.shop}
          </p>
        )}
        {log.notes && <p className="text-text-secondary mt-1 text-[12px]">{log.notes}</p>}
      </div>
    </li>
  )
}
