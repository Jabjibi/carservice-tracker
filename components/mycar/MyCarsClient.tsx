'use client'

import Link from 'next/link'
import { Car, Plus, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { CarCard } from '@/components/cars/CarCard'
import { Fab } from '@/components/shared/Fab'
import { Button } from '@/components/ui/button'
import { useCars } from '@/lib/hooks/use-cars'

export function MyCarsClient() {
  const t = useTranslations('cars')
  const cars = useCars()

  return (
    <>
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold tracking-tight text-[#1D1D1F]">{t('title')}</h1>
          <p className="mt-1 text-[14px] text-[#6E6E73]">
            {cars.length > 0 ? t('subtitle', { count: cars.length }) : t('subtitleEmpty')}
          </p>
        </div>
        <Button
          asChild
          className="mt-1 h-10 shrink-0 gap-2 rounded-[12px] bg-[#1D1D1F] px-4 text-[13px] font-semibold text-white hover:bg-[#1D1D1F]/90"
        >
          <Link href="/addcar">
            <Plus className="size-4" />
            {t('fab.addCar')}
          </Link>
        </Button>
      </header>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[20px] bg-white/[0.6] py-20 ring-1 ring-black/[0.06] backdrop-blur-2xl">
          <span className="flex size-14 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.05]">
            <Car className="size-6 text-[#AEAEB2]" />
          </span>
          <p className="mt-4 text-[15px] font-medium text-[#1D1D1F]">{t('empty.title')}</p>
          <p className="mt-1 text-[13px] text-[#6E6E73]">{t('empty.subtitle')}</p>
          <Button
            asChild
            className="mt-6 h-10 gap-2 rounded-[12px] bg-[#1D1D1F] px-5 text-[13px] font-semibold text-white hover:bg-[#1D1D1F]/90"
          >
            <Link href="/addcar">
              <Plus className="size-4" />
              {t('fab.addCar')}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} logServiceLabel={t('fab.logService')} />
          ))}
        </div>
      )}

      <Fab.Root>
        <Fab.Trigger label={t('fab.trigger')} />
        <Fab.Menu>
          <Fab.Item icon={<Plus className="size-3.5" />} label={t('fab.addCar')} href="/addcar" />
          <Fab.Item
            icon={<Wrench className="size-3.5" />}
            label={t('fab.logService')}
            href="/repair"
          />
        </Fab.Menu>
      </Fab.Root>
    </>
  )
}
