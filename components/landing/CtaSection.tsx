import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { LandingContainer } from '@/components/shared/LandingContainer'
import { LineIcon } from '@/components/shared/LineIcon'

export async function CtaSection() {
  const t = await getTranslations('cta')
  const locale = await getLocale()

  return (
    <section className="bg-dark-void py-14">
      <LandingContainer className="max-w-4xl text-center">
        <h2 className="whitespace-nowrap text-[32px] font-semibold leading-tight tracking-tight text-white">
          {t('title')}
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-white/50">{t('subtitle')}</p>
        <Button
          asChild
          className="mt-8 gap-2 rounded-full bg-green px-8 py-3 text-base font-semibold text-white hover:bg-green-hover"
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
