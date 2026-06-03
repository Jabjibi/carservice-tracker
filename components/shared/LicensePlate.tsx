import { cn } from '@/lib/utils'

type LicensePlateProps = {
  value: string
  className?: string
}

export function LicensePlate({ value, className }: LicensePlateProps) {
  return (
    <span className={cn('font-mono text-[12px] tracking-tight text-[#86868B]', className)}>
      {value}
    </span>
  )
}
