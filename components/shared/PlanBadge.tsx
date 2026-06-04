import { Badge } from '@/components/ui/badge'

type PlanBadgeProps = {
  plan: 'FREE' | 'PREMIUM'
}

export function PlanBadge({ plan }: PlanBadgeProps) {
  if (plan === 'PREMIUM') {
    return (
      <Badge className="text-text-primary mt-0.5 h-auto rounded-full bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.08em] uppercase ring-1 ring-black/[0.04] hover:bg-black/[0.06]">
        Premium
      </Badge>
    )
  }
  return (
    <Badge className="text-text-secondary mt-0.5 h-auto rounded-full bg-black/[0.04] px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.08em] uppercase hover:bg-black/[0.04]">
      Free
    </Badge>
  )
}
