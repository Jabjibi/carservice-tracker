import { cn } from '@/lib/utils'
import type { ServiceStatus } from '@/lib/types'

type StatusDotProps = {
  status: ServiceStatus
  className?: string
}

const STYLES: Record<ServiceStatus, string> = {
  ok: 'bg-[#AEAEB2]',
  warn: 'bg-[#6E6E73] ring-2 ring-black/[0.06]',
  danger: 'bg-[#1D1D1F] ring-2 ring-black/[0.1]',
}

export function StatusDot({ status, className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn('inline-block size-2 rounded-full', STYLES[status], className)}
    />
  )
}
