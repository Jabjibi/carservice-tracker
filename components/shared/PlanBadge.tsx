import { Badge } from '@/components/ui/badge'

type PlanBadgeProps = {
  plan: 'FREE' | 'PREMIUM'
}

export function PlanBadge({ plan }: PlanBadgeProps) {
  if (plan === 'PREMIUM') {
    return (
      <Badge className="mt-0.5 h-auto rounded-full bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#1D1D1F] ring-1 ring-black/[0.04] hover:bg-black/[0.06]">
        Premium
      </Badge>
    )
  }
  return (
    <Badge className="mt-0.5 h-auto rounded-full bg-black/[0.04] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#6E6E73] hover:bg-black/[0.04]">
      Free
    </Badge>
  )
}
