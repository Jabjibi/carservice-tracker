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
          <h1 className="text-text-primary text-[32px] font-semibold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-text-secondary mt-1 text-[14px]">
            {cars.length > 0 ? t('subtitle', { count: cars.length }) : t('subtitleEmpty')}
          </p>
        </div>
        <div className="mt-1 flex shrink-0 gap-2">
          <Button
            asChild
            variant="outline"
            className="text-text-secondary hover:text-text-primary h-10 gap-2 rounded-[12px] border-black/[0.1] px-4 text-[13px] font-semibold hover:bg-black/[0.03]"
          >
            <Link href="/repair">
              <Wrench className="size-4" />
              {t('fab.logService')}
            </Link>
          </Button>
          <Button
            asChild
            className="bg-text-primary hover:bg-text-primary/90 h-10 gap-2 rounded-[12px] px-4 text-[13px] font-semibold text-white"
          >
            <Link href="/addcar">
              <Plus className="size-4" />
              {t('fab.addCar')}
            </Link>
          </Button>
        </div>
      </header>

      {cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[20px] bg-white/[0.6] py-20 ring-1 ring-black/[0.06] backdrop-blur-2xl">
          <span className="flex size-14 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.05]">
            <Car className="text-text-muted size-6" />
          </span>
          <p className="text-text-primary mt-4 text-[15px] font-medium">{t('empty.title')}</p>
          <p className="text-text-secondary mt-1 text-[13px]">{t('empty.subtitle')}</p>
          <Button
            asChild
            className="bg-text-primary hover:bg-text-primary/90 mt-6 h-10 gap-2 rounded-[12px] px-5 text-[13px] font-semibold text-white"
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
            <CarCard key={car.id} car={car} />
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
