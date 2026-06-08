import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PlanBadge } from '@/components/shared/PlanBadge'

type UserProfileCardProps = {
  name: string
  avatarUrl?: string | null
  plan?: 'FREE' | 'PREMIUM'
  logoutAction?: () => Promise<void>
}

export function UserProfileCard({
  name,
  avatarUrl,
  plan = 'FREE',
  logoutAction,
}: UserProfileCardProps) {
  const initial = name.trim().charAt(0)
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-white/[0.5] px-2 py-2 ring-1 ring-black/[0.05] group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:ring-0">
      <Avatar className="size-9 shrink-0 ring-1 ring-black/[0.06]">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} referrerPolicy="no-referrer" />}
        <AvatarFallback className="text-text-primary bg-black/[0.06] text-[13px] font-semibold">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
        <p className="text-text-primary truncate text-[13px] font-medium">{name}</p>
        {plan === 'PREMIUM' && <PlanBadge plan="PREMIUM" />}
      </div>
      {logoutAction && (
        <form action={logoutAction} className="group-data-[collapsible=icon]:hidden">
          <button
            type="submit"
            className="text-text-disabled hover:text-text-secondary flex size-7 shrink-0 items-center justify-center rounded-[8px] transition hover:bg-black/[0.06]"
            aria-label="ออกจากระบบ"
          >
            <LogOut className="size-3.5" />
          </button>
        </form>
      )}
    </div>
  )
}
