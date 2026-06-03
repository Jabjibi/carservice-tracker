'use client'

import { BarChart, Bar } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

const chartData = [
  { month: 'Jan', expense: 900 },
  { month: 'Feb', expense: 1400 },
  { month: 'Mar', expense: 2600 },
  { month: 'Apr', expense: 3400 },
  { month: 'May', expense: 1800 },
  { month: 'Jun', expense: 3100 },
  { month: 'Jul', expense: 4700 },
]

const chartConfig = {
  expense: {
    label: 'Expense',
    color: '#06C755',
  },
} satisfies ChartConfig

export function ChartPreview() {
  return (
    <div className="bg-dark-void mt-3 rounded-xl p-3">
      <ChartContainer config={chartConfig} className="h-[56px] w-full">
        <BarChart data={chartData} barSize={10} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Bar dataKey="expense" fill="var(--color-expense)" radius={2} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                className="bg-dark-elevated border-dark-border [&_span]:text-white"
              />
            }
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
