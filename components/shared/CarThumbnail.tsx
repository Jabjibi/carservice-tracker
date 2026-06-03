import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { CarType } from '@/lib/types'

const SRC: Record<CarType, string> = {
  sedan: '/image/car.png',
  pickup: '/image/car-pickup.png',
  van: '/image/car-van.png',
  motorcycle: '/image/motorcycle.png',
}

type CarThumbnailProps = {
  type: CarType
  alt?: string
  className?: string
}

export function CarThumbnail({ type, alt = '', className }: CarThumbnailProps) {
  return (
    <div
      className={cn(
        'relative size-12 shrink-0 overflow-hidden rounded-[12px] bg-black/[0.04] ring-1 ring-black/[0.05]',
        className,
      )}
    >
      <Image
        src={SRC[type]}
        alt={alt}
        fill
        sizes="48px"
        className="object-contain p-1.5"
      />
    </div>
  )
}
