import { cn } from '@/lib/utils'

type SectionCardProps = React.ComponentProps<'section'>

export function SectionCard({ className, ...props }: SectionCardProps) {
  return (
    <section
      className={cn(
        'rounded-[20px] bg-white/[0.6] p-6 ring-1 ring-black/[0.06] backdrop-blur-2xl',
        className,
      )}
      {...props}
    />
  )
}
