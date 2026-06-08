import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { LineIcon } from '@/components/shared/LineIcon'

export const metadata: Metadata = {
  title: 'เข้าสู่ระบบ',
  description: 'เชื่อมต่อบัญชี LINE เพื่อเริ่มติดตามการซ่อมบำรุงรถยนต์ของคุณ',
}

export default async function LoginPage() {
  const t = await getTranslations('login')
  const locale = await getLocale()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5F7] px-6">
      <div className="w-full max-w-sm">
        <div className="bg-dark-void relative overflow-hidden rounded-[20px] shadow-sm ring-1 ring-white/[0.08]">
          {/* Logo — top-left */}
          <div className="absolute top-4 left-4 z-10">
            <Link href={`/${locale}`} aria-label="Car Service Tracker">
              <Image
                src="/image/logo.png"
                alt="Car Service Tracker"
                width={100}
                height={60}
                priority
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Car image — centered */}
          <div className="relative h-44 w-full pt-70">
            <Image
              src="/image/car-front.png"
              alt="Car"
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
              priority
            />
          </div>

          {/* Content */}
          <div className="px-8 pt-0 pb-8">
            {/* Heading */}
            <div className="mb-7 text-center">
              <h1 className="text-[22px] font-semibold tracking-tight text-white">
                {t('tagline')}
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-white/50">{t('subtitle')}</p>
            </div>

            {/* LINE login button */}
            <Button
              asChild
              className="h-13 w-full gap-2.5 rounded-[12px] bg-[#06C755] text-[15px] font-semibold text-white hover:bg-[#05b04a] active:scale-[0.98]"
            >
              <a href="/api/auth/line">
                <LineIcon className="size-5" />
                {t('cta')}
              </a>
            </Button>

            {/* Terms */}
            <p className="mt-5 text-center text-[11px] leading-relaxed text-white/25">
              {t('termsPrefix')}{' '}
              <Link
                href={`/${locale}#`}
                className="underline underline-offset-2 hover:text-white/50"
              >
                {t('termsLink')}
              </Link>{' '}
              {t('and')}{' '}
              <Link
                href={`/${locale}#`}
                className="underline underline-offset-2 hover:text-white/50"
              >
                {t('privacyLink')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
