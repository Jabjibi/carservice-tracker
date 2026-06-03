import { Wrench } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { LandingContainer } from '@/components/shared/LandingContainer'

export async function LandingFooter() {
  const t = await getTranslations('footer')
  const locale = await getLocale()

  const footerLinks = [
    { label: t('privacy'), href: `/${locale}/privacy` },
    { label: t('terms'), href: `/${locale}/terms` },
    { label: t('contact'), href: `/${locale}/contact` },
  ]

  return (
    <footer className="border-dark-border bg-dark-void border-t py-6">
      <LandingContainer className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white/30">
          <Wrench className="size-3.5" />
          <span className="text-xs">{t('copyright')}</span>
        </div>

        <ul className="flex items-center gap-5">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs text-white/30 transition-colors hover:text-white/60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </footer>
  )
}
