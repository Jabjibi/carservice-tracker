import { Wrench, Fuel } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent } from '@/components/ui/card'
import { LandingContainer } from '@/components/shared/LandingContainer'

const monthLabels = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.']
const dataPoints = [900, 1400, 2600, 3400, 1800, 3100, 4700]

function LineChart() {
  const width = 320
  const height = 110
  const padX = 8
  const padY = 8
  const chartW = width - padX * 2
  const chartH = height - padY * 2
  const maxVal = 5000

  const pts = dataPoints.map((v, i) => ({
    x: padX + (i / (dataPoints.length - 1)) * chartW,
    y: padY + chartH - (v / maxVal) * chartH,
  }))

  const pathD = pts.reduce(
    (acc, p, i) =>
      i === 0
        ? `M ${p.x} ${p.y}`
        : `${acc} C ${pts[i - 1].x + 20} ${pts[i - 1].y}, ${p.x - 20} ${p.y}, ${p.x} ${p.y}`,
    '',
  )

  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06C755" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06C755" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padX}
          y1={padY + t * chartH}
          x2={width - padX}
          y2={padY + t * chartH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={pathD} fill="none" stroke="#06C755" strokeWidth="2" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#06C755" />
      ))}
    </svg>
  )
}

export async function DataSection() {
  const t = await getTranslations('data')

  const expenses = [
    {
      icon: Wrench,
      label: t('expense1Label'),
      percent: t('expense1Percent'),
      amount: t('expense1Amount'),
    },
    {
      icon: Fuel,
      label: t('expense2Label'),
      percent: t('expense2Percent'),
      amount: t('expense2Amount'),
    },
  ]

  return (
    <section id="data" className="bg-white py-12 md:py-14">
      <LandingContainer className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
        {/* Left */}
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <h2 className="text-text-primary text-[26px] leading-tight font-semibold tracking-tight text-balance sm:text-[30px] md:text-[34px]">
              {t('title1')}
              <br />
              {t('title2')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-pretty text-zinc-500 md:text-[15px]">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-2">
            {expenses.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.label}
                  className="bg-surface rounded-2xl border-0 shadow-none ring-0"
                >
                  <CardContent className="flex items-center gap-3 p-3.5">
                    <div className="bg-green/10 flex size-9 items-center justify-center rounded-xl">
                      <Icon className="text-green size-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-zinc-400">{item.percent}</p>
                    </div>
                    <span className="text-text-primary font-mono text-sm font-semibold">
                      {item.amount}
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Right — chart */}
        <div className="flex-[1.4]">
          <Card className="bg-dark-void ring-dark-border rounded-2xl border-0 ring-1">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{t('chartTitle')}</p>
                <span className="bg-dark-elevated rounded-full px-3 py-1 text-xs text-white/60">
                  {t('chartPeriod')}
                </span>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col justify-between pb-5 text-right">
                  {[5000, 4000, 3000, 2000, 1000, 0].map((v) => (
                    <span key={v} className="text-[10px] text-white/30">
                      {v.toLocaleString()}
                    </span>
                  ))}
                </div>
                <div className="flex-1">
                  <LineChart />
                  <div className="mt-1 flex justify-between">
                    {monthLabels.map((m) => (
                      <span key={m} className="text-[10px] text-white/30">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </LandingContainer>
    </section>
  )
}
