import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type IconBoxProps = {
  icon: LucideIcon
  className?: string
}

export function IconBox({ icon: Icon, className }: IconBoxProps) {
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-[10px] backdrop-blur-md',
        'bg-black/[0.48] ring-1 ring-white/[0.08]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]',
        className,
      )}
    >
      <Icon className="size-4 text-white/75" />
    </div>
  )
}
