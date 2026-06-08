'use client'

import { Car, Clock, Wallet, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Fab } from '@/components/shared/Fab'
import { SectionCard } from '@/components/shared/SectionCard'
import { StatCard } from '@/components/shared/StatCard'
import { useDashboard } from '@/lib/hooks/dashboard/use-dashboard'
import { useUser } from '@/lib/hooks/use-user'
import { useExpenseChart } from '@/lib/hooks/dashboard/use-expense-chart'
import { useRecentServices } from '@/lib/hooks/dashboard/use-recent-services'
import { baht } from '@/lib/utils'
import { ExpenseBarChart } from './ExpenseBarChart'
import { PageGreeting } from './PageGreeting'
import { RecentServicesTable } from './RecentServicesTable'
import { UpcomingServiceList } from './UpcomingServiceList'

export function DashboardClient() {
  const t = useTranslations('dashboard')
  const { stats, upcoming, selectedId, select } = useDashboard()
  const user = useUser()
  const chart = useExpenseChart()
  const recent = useRecentServices()

  return (
    <>
      <PageGreeting name={user?.displayName ?? '...'} subtitle={t('greetingSubtitle')} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t('stats.totalCars')}
          value={String(stats.totalCars)}
          unit={t('stats.totalCarsUnit')}
          hint={t('stats.totalCarsHint')}
          icon={Car}
        />
        <StatCard
          label={t('stats.servicesThisYear')}
          value={String(stats.servicesThisYear)}
          unit={t('stats.servicesThisYearUnit')}
          hint={t('stats.servicesThisYearHint')}
          icon={Wrench}
        />
        <StatCard
          label={t('stats.totalExpense')}
          value={baht(stats.totalExpense)}
          hint={t('stats.totalExpenseHint')}
          icon={Wallet}
        />
        <StatCard
          label={t('stats.upcomingCount')}
          value={String(stats.upcomingCount)}
          unit={t('stats.upcomingCountUnit')}
          hint={t('stats.upcomingCountHint')}
          icon={Clock}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <SectionCard className="xl:col-span-2">
          <header className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-text-primary text-[15px] font-semibold">{t('chartTitle')}</h2>
              <p className="text-text-secondary mt-1 text-[12px]">{t('chartSubtitle')}</p>
            </div>
            <span className="text-text-secondary rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium ring-1 ring-black/[0.05]">
              {t('chartRange')}
            </span>
          </header>
          <ExpenseBarChart data={chart} />
        </SectionCard>

        <SectionCard>
          <UpcomingServiceList items={upcoming} selectedId={selectedId} onSelect={select} />
        </SectionCard>
      </div>

      <div className="mt-6">
        <SectionCard>
          <RecentServicesTable items={recent} />
        </SectionCard>
      </div>

      <Fab.Root>
        <Fab.Trigger label={t('fab.trigger')} />
        <Fab.Menu>
          <Fab.Item icon={<Wrench className="size-3.5" />} label={t('fab.logService')} />
          <Fab.Item icon={<Car className="size-3.5" />} label={t('fab.addCar')} />
        </Fab.Menu>
      </Fab.Root>
    </>
  )
}
