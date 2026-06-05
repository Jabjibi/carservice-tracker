import { cn } from '@/lib/utils'

type GlassStripProps = {
  children: React.ReactNode
  className?: string
}

export function GlassStrip({ children, className }: GlassStripProps) {
  return (
    <div
      className={cn(
        'absolute inset-x-0 bottom-0 rounded-t-[18px]',
        'bg-black/[0.45] backdrop-blur-xl',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
        'p-4 pt-3',
        className,
      )}
    >
      {children}
    </div>
  )
}
