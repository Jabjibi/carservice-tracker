'use client'

import { usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/') || '/')
  }

  return (
    <div className="border-dark-border flex items-center gap-0.5 rounded-full border px-1.5 py-1">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase transition-colors ${
            locale === currentLocale
              ? 'bg-white/10 text-white'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
