import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Play, Car, Bell } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LandingContainer } from '@/components/shared/LandingContainer'

async function CarCardMockup() {
  const t = await getTranslations('hero.card')
  return (
    <div className="relative w-full max-w-[380px]">
      {/* Status badge — floats outside card top-right */}
      <div className="absolute -top-3 right-3 z-10 rounded-full bg-green px-3 py-1 text-xs font-semibold text-white shadow-lg">
        {t('statusOk')}
      </div>

      <Card className="w-full rounded-2xl bg-dark-void shadow-2xl ring-1 ring-dark-border">
        <CardContent className="p-4">
          {/* Car info row */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-[17px] font-semibold text-white">{t('carName')}</p>
              <p className="mt-0.5 font-mono text-xs text-white/40">{t('plate')}</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-dark-elevated">
              <Car className="size-4 text-white/70" />
            </span>
          </div>

          {/* Car image */}
          <div className="relative mb-4 h-52 overflow-hidden rounded-xl bg-dark-surface">
            <Image
              src="/image/car.png"
              alt={t('carName')}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: 'contain' }}
              className="drop-shadow-[0_8px_32px_rgba(0,0,0,0.7)]"
              priority
            />
          </div>

          {/* Stats */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-dark-elevated p-3">
              <p className="mb-1 text-[11px] text-white/40">{t('mileageLabel')}</p>
              <p className="font-mono text-sm font-semibold text-white">{t('mileageValue')}</p>
            </div>
            <div className="rounded-xl bg-dark-elevated p-3">
              <p className="mb-1 text-[11px] text-white/40">{t('serviceLabel')}</p>
              <p className="font-mono text-sm font-semibold text-green">{t('serviceValue')}</p>
            </div>
          </div>

          {/* LINE toggle row */}
          <div className="flex items-center justify-between rounded-xl bg-dark-elevated px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-green">
                <Bell className="size-3 text-white" />
              </span>
              <span className="text-xs text-white/70">{t('lineNotify')}</span>
            </div>
            <div className="flex h-5 w-9 items-center justify-end rounded-full bg-green px-0.5">
              <div className="size-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

async function SocialProof() {
  const t = await getTranslations('hero')
  const avatars = [
    { bg: 'bg-zinc-300' },
    { bg: 'bg-zinc-500' },
    { bg: 'bg-zinc-400' },
  ]
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {avatars.map((a, i) => (
          <div
            key={i}
            className={`size-8 rounded-full border-2 border-white ${a.bg} ring-1 ring-white/20`}
          />
        ))}
      </div>
      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="size-3.5 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="mt-0.5 text-xs text-zinc-500">{t('socialProof')}</p>
      </div>
    </div>
  )
}

export async function HeroSection() {
  const t = await getTranslations('hero')
  const locale = await getLocale()

  return (
    <section
      className="relative overflow-hidden bg-white py-12"
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(6,199,85,0.10) 0%, transparent 70%), #ffffff',
      }}
    >
      <LandingContainer className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-8">
        {/* Left — Copy */}
        <div className="flex w-full flex-col gap-5 md:max-w-[480px] md:shrink-0">
          <h1
            className="font-bold leading-[1.05] tracking-tight text-[#1D1D1F]"
            style={{ fontSize: 'clamp(44px, 3.8vw, 56px)' }}
          >
            <span className="md:whitespace-nowrap">{t('headline1')}</span>
            <br />
            <span className="text-green">{t('headline2')}</span>
          </h1>

          <p className="text-[17px] leading-relaxed text-pretty text-zinc-500">{t('subtitle')}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-12 gap-2 rounded-xl bg-green px-6 text-sm font-semibold text-white hover:bg-green-hover"
            >
              <Link href={`/${locale}/login`}>
                <MessageCircle className="size-4" />
                {t('ctaPrimary')}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 gap-2 rounded-xl border-zinc-200 px-6 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              {t('ctaSecondary')}
              <Play className="size-4 fill-zinc-700" />
            </Button>
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <SocialProof />
          </div>
        </div>

        {/* Right — Car card */}
        <div className="flex flex-1 justify-center md:justify-end">
          <CarCardMockup />
        </div>
      </LandingContainer>
    </section>
  )
}
