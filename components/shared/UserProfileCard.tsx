import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlanBadge } from '@/components/shared/PlanBadge'

type UserProfileCardProps = {
  name: string
  plan?: 'FREE' | 'PREMIUM'
}

export function UserProfileCard({ name, plan = 'FREE' }: UserProfileCardProps) {
  const initial = name.trim().charAt(0)
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white/[0.5] px-2 py-2 ring-1 ring-black/[0.05] group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:ring-0">
      <Avatar className="size-9 shrink-0 ring-1 ring-black/[0.06]">
        <AvatarFallback className="bg-black/[0.06] text-[13px] font-semibold text-[#1D1D1F]">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
        <p className="truncate text-[13px] font-medium text-[#1D1D1F]">{name}</p>
        {plan === 'PREMIUM' && <PlanBadge plan="PREMIUM" />}
      </div>
    </div>
  )
}
