'use client'

import Link from 'next/link'
import { ChevronLeft, MapPin, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useCar } from '@/lib/hooks/use-car'
import { useServiceLogs } from '@/lib/hooks/use-service-logs'
import { useTrips } from '@/lib/hooks/use-trips'
import { CarThumbnail } from '@/components/shared/CarThumbnail'
import { LicensePlate } from '@/components/shared/LicensePlate'
import { SectionCard } from '@/components/shared/SectionCard'
import { StatusDot } from '@/components/shared/StatusDot'
import { Fab } from '@/components/shared/Fab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HistoryTab } from '@/components/cars/HistoryTab'
import { TripsTab } from '@/components/cars/TripsTab'
import { StatsTab } from '@/components/cars/StatsTab'
import { SettingsTab } from '@/components/cars/SettingsTab'
import type { Car } from '@/lib/types'

const STATUS_LABEL: Record<Car['nextService']['status'], string> = {
  ok: 'text-text-secondary',
  warn: 'text-text-primary',
  danger: 'text-text-primary font-semibold',
}

export function CarDetailClient({ id }: { id: string }) {
  const t = useTranslations('carDetail')
  const car = useCar(id)
  const logs = useServiceLogs(id)
  const carTrips = useTrips(id)

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-text-primary text-[15px] font-medium">ไม่พบรถคันนี้</p>
        <Link href="/mycar" className="text-text-secondary mt-2 text-[13px] underline">
          {t('back')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/mycar"
        className="text-text-secondary hover:text-text-primary mb-6 flex w-fit items-center gap-1 text-[13px] transition"
      >
        <ChevronLeft className="size-4" />
        {t('back')}
      </Link>

      <SectionCard className="mb-4 flex flex-col items-center gap-4 text-center">
        <CarThumbnail
          type={car.carType}
          alt={`${car.brand} ${car.model}`}
          className="h-36 w-full max-w-xs"
          bare
          priority
        />
        <div>
          <h1 className="text-text-primary text-[22px] font-semibold tracking-tight">
            {car.brand} {car.model}
          </h1>
          <div className="mt-1 flex items-center justify-center gap-2">
            <LicensePlate value={car.plate} />
            <span className="text-text-muted text-[12px]">·</span>
            <span className="text-text-muted text-[12px]">{car.year}</span>
            {car.color && (
              <>
                <span className="text-text-muted text-[12px]">·</span>
                <span className="text-text-muted text-[12px]">{car.color}</span>
              </>
            )}
          </div>
          {car.currentMileage !== undefined && (
            <p className="text-text-muted mt-1 text-[13px]">
              {car.currentMileage.toLocaleString('th-TH')} {t('mileage')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1.5">
          <StatusDot status={car.nextService.status} />
          <span className={cn('text-[12px]', STATUS_LABEL[car.nextService.status])}>
            {car.nextService.label}
          </span>
        </div>
      </SectionCard>

      <Tabs defaultValue="history">
        <TabsList className="mb-4 w-full justify-start overflow-x-auto">
          <TabsTrigger value="history">{t('tabs.history')}</TabsTrigger>
          <TabsTrigger value="trips">{t('tabs.trips')}</TabsTrigger>
          <TabsTrigger value="stats">{t('tabs.stats')}</TabsTrigger>
          <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <HistoryTab
            logs={logs}
            shopLabel={t('history.shop')}
            emptyLabel={t('history.empty')}
            emptyHint={t('history.emptyHint')}
          />
        </TabsContent>

        <TabsContent value="trips">
          <TripsTab
            trips={carTrips}
            totalDistanceLabel={t('trips.totalDistance')}
            tripCountLabel={t('trips.tripCount')}
            emptyLabel={t('trips.empty')}
            emptyHint={t('trips.emptyHint')}
          />
        </TabsContent>

        <TabsContent value="stats">
          <StatsTab
            logs={logs}
            totalExpenseLabel={t('stats.totalExpense')}
            avgLabel={t('stats.avgPerService')}
            countLabel={t('stats.serviceCount')}
            topLabel={t('stats.topCategories')}
          />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab t={t} />
        </TabsContent>
      </Tabs>

      <Fab.Root>
        <Fab.Trigger label={t('fab.trigger')} />
        <Fab.Menu>
          <Fab.Item
            icon={<Wrench className="size-3.5" />}
            label={t('fab.logService')}
            href={`/repair?id=${id}`}
          />
          <Fab.Item icon={<MapPin className="size-3.5" />} label={t('fab.logTrip')} />
        </Fab.Menu>
      </Fab.Root>
    </>
  )
}
