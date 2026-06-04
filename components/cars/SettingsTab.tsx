'use client'

import { ArrowRight } from 'lucide-react'
import type { useTranslations } from 'next-intl'
import { SectionCard } from '@/components/shared/SectionCard'

type SettingsTabProps = {
  t: ReturnType<typeof useTranslations<'carDetail'>>
}

export function SettingsTab({ t }: SettingsTabProps) {
  const items = [
    { label: t('settings.editCar'), danger: false },
    { label: t('settings.notifications'), danger: false },
    { label: t('settings.deleteCar'), danger: true },
  ]

  return (
    <SectionCard className="overflow-hidden p-0">
      <div className="flex flex-col divide-y divide-black/[0.05]">
        {items.map(({ label, danger }) => (
          <button
            key={label}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-black/[0.02]"
          >
            <span className={danger ? 'text-[13px] text-red-500' : 'text-text-primary text-[13px]'}>
              {label}
            </span>
            <ArrowRight className="text-text-disabled size-4 shrink-0" />
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
