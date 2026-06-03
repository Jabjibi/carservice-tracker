import type { ServiceLog } from '@/lib/types'

export type CarStats = {
  total: number
  avg: number
  count: number
  topTypes: Array<{ type: string; cost: number; share: number }>
}

export function computeCarStats(logs: ReadonlyArray<ServiceLog>): CarStats {
  const count = logs.length
  const total = logs.reduce((sum, l) => sum + l.cost, 0)
  const avg = count > 0 ? Math.round(total / count) : 0

  const byType = logs.reduce<Record<string, number>>((acc, l) => {
    acc[l.type] = (acc[l.type] ?? 0) + l.cost
    return acc
  }, {})

  const maxCost = Math.max(...Object.values(byType), 1)

  const topTypes = Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type, cost]) => ({ type, cost, share: cost / maxCost }))

  return { total, avg, count, topTypes }
}
