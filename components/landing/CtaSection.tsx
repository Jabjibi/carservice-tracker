import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { LandingContainer } from '@/components/shared/LandingContainer'
import { LineIcon } from '@/components/shared/LineIcon'

export async function CtaSection() {
  const t = await getTranslations('cta')
  const locale = await getLocale()

  return (
    <section className="bg-dark-void py-12 md:py-14">
      <LandingContainer className="max-w-4xl text-center">
        <h2 className="text-[24px] leading-tight font-semibold tracking-tight text-balance text-white sm:text-[28px] md:text-[32px]">
          {t('title')}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-pretty text-white/50 md:text-[17px]">
          {t('subtitle')}
        </p>
        <Button
          asChild
          className="bg-green hover:bg-green-hover mt-8 gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white md:px-8 md:text-base"
          size="lg"
        >
          <a href={`/${locale}/login`}>
            <LineIcon className="size-5" />
            {t('button')}
          </a>
        </Button>
      </LandingContainer>
    </section>
  )
}
