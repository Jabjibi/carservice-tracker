import { cn } from '@/lib/utils'
import type { ServiceStatus } from '@/lib/types'

type StatusDotProps = {
  status: ServiceStatus
  className?: string
}

const STYLES: Record<ServiceStatus, string> = {
  ok: 'bg-green',
  warn: 'bg-[#FF9F0A] ring-2 ring-[#FF9F0A]/[0.25]',
  danger: 'bg-[#FF3B30] ring-2 ring-[#FF3B30]/[0.25]',
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn('inline-block size-2 rounded-full', STYLES[status], className)}
    />
  )
}
