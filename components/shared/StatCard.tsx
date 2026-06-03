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
        <span className="text-[13px] font-medium text-[#6E6E73]">{label}</span>
        <span className="flex size-8 items-center justify-center rounded-full bg-black/[0.04] text-[#1D1D1F] ring-1 ring-black/[0.04]">
          <Icon className="size-4" />
        </span>
      </div>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-[32px] font-semibold leading-none tracking-tight text-[#1D1D1F]">
          {value}
        </span>
        {unit && (
          <span className="text-[15px] font-medium text-[#6E6E73]">{unit}</span>
        )}
      </div>
      {hint && (
        <p className="mt-3 text-[12px] text-[#86868B]">{hint}</p>
      )}
    </div>
  )
}
