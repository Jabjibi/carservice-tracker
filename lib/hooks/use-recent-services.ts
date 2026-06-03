import { recentServices } from '@/data/recent-services'
import type { RecentService } from '@/lib/types'

export function useRecentServices(): ReadonlyArray<RecentService> {
  return recentServices
}
