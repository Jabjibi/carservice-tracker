import { expenseChart } from '@/data/expense-chart'
import type { ExpenseMonth } from '@/lib/types'

export function useExpenseChart(): ReadonlyArray<ExpenseMonth> {
  return expenseChart
}
