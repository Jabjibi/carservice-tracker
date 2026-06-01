import { ClipboardList, MessageCircle, PieChart } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui/card'
import { LandingContainer } from '@/components/shared/LandingContainer'
import { ChartPreview } from './ChartPreview'

async function HistoryPreview() {
  const t = await getTranslations('features.history')
  return (
    <div className="mt-3 space-y-2 rounded-xl bg-dark-void p-3">
      {([t('item1'), t('item2')] as string[]).map((label) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-xs text-white/50">{label}</span>
          <span className="font-mono text-xs font-semibold text-white">
            {label === t('item1') ? '฿1,500' : '฿400'}
          </span>
        </div>
      ))}
    </div>
  )
}

async function LineNotifyPreview() {
  const t = await getTranslations('features.line')
  return (
    <div className="mt-3 rounded-xl bg-dark-void p-3">
      <div className="flex items-start gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green">
          <MessageCircle className="size-3.5 text-white" />
        </div>
        <div className="rounded-xl rounded-tl-none bg-white/10 px-3 py-2">
          <p className="text-[11px] leading-relaxed text-white/80">{t('mockMessage')}</p>
        </div>
      </div>
    </div>
  )
}


function FeatureCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="h-full rounded-2xl border-0 bg-dark-card ring-1 ring-dark-border">
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-dark-elevated">
          <Icon className="size-4 text-white/70" />
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-white">{title}</h3>
        <p className="flex-1 text-[13px] leading-relaxed text-white/60">{description}</p>
        {children}
      </CardContent>
    </Card>
  )
}

export async function FeaturesSection() {
  const t = await getTranslations('features')

  return (
    <section id="features" className="bg-dark-void py-12 md:py-14">
      <LandingContainer>
        <div className="mb-8 text-center">
          <h2 className="text-balance text-[26px] font-semibold tracking-tight text-white sm:text-[30px] md:text-[34px]">
            {t('title')}
          </h2>
          <p className="mt-2 text-pretty text-sm text-white/50 md:text-[15px]">{t('subtitle')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={ClipboardList}
            title={t('history.title')}
            description={t('history.description')}
          >
            <HistoryPreview />
          </FeatureCard>

          <FeatureCard
            icon={MessageCircle}
            title={t('line.title')}
            description={t('line.description')}
          >
            <LineNotifyPreview />
          </FeatureCard>

          <FeatureCard
            icon={PieChart}
            title={t('analytics.title')}
            description={t('analytics.description')}
          >
            <ChartPreview />
          </FeatureCard>
        </div>
      </LandingContainer>
    </section>
  )
}
