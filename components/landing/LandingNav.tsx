import Link from 'next/link'
import { MessageCircle, Wrench } from 'lucide-react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { LandingContainer } from '@/components/shared/LandingContainer'

export async function LandingNav() {
  const t = await getTranslations('nav')
  const locale = await getLocale()

  const navLinks = [
    { label: t('features'), href: '#features' },
    { label: t('analytics'), href: '#data' },
    { label: t('pricing'), href: '#pricing' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border bg-dark-void">
      <nav>
        <LandingContainer className="flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-dark-card">
            <Wrench className="size-3.5 text-white" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">ServiceTracker</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn('text-sm text-white/60 transition-colors hover:text-white', 'font-thai')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: language switcher + CTA */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={locale} />
          <Button
            asChild
            className="gap-2 rounded-full bg-green px-4 text-sm font-semibold text-white hover:bg-green-hover"
            size="sm"
          >
            <Link href="/login">
              <MessageCircle className="size-4" />
              {t('login')}
            </Link>
          </Button>
        </div>
      </LandingContainer>
      </nav>
    </header>
  )
}
