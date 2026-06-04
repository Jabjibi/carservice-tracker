import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  unit?: string
  hint?: string
  icon: LucideIcon
}

export function StatCard({ label, value, unit, hint, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-[20px] bg-white/[0.6] p-5 ring-1 ring-black/[0.06] backdrop-blur-2xl transition hover:bg-white/[0.75]">
      <div className="flex items-start justify-between">
        <span className="text-text-secondary text-[13px] font-medium">{label}</span>
        <span className="text-text-primary flex size-8 items-center justify-center rounded-full bg-black/[0.04] ring-1 ring-black/[0.04]">
          <Icon className="size-4" />
        </span>
      </div>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-text-primary text-[32px] leading-none font-semibold tracking-tight">
          {value}
        </span>
        {unit && <span className="text-text-secondary text-[15px] font-medium">{unit}</span>}
      </div>
      {hint && <p className="text-text-secondary mt-3 text-[12px]">{hint}</p>}
    </div>
  )
}
