'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { ExpenseMonth } from '@/lib/types'

type ExpenseBarChartProps = {
  data: ReadonlyArray<ExpenseMonth>
}

const config = {
  value: {
    label: '฿',
    color: '#1D1D1F',
  },
} satisfies ChartConfig

export function ExpenseBarChart({ data }: ExpenseBarChartProps) {
  return (
    <ChartContainer config={config} className="h-[260px] w-full">
      <BarChart
        accessibilityLayer
        data={[...data]}
        margin={{ top: 12, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid
          vertical={false}
          stroke="rgba(0,0,0,0.06)"
          strokeDasharray="3 3"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#6E6E73', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#86868B', fontSize: 11 }}
          tickFormatter={(v) => (v === 0 ? '' : `${v / 1000}k`)}
        />
        <ChartTooltip
          cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={[8, 8, 4, 4]}
          maxBarSize={48}
        />
      </BarChart>
    </ChartContainer>
  )
}
