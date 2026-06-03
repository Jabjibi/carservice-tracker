'use client'

import { useRouter } from 'next/navigation'
import { setLocale } from '@/lib/actions/locale'

const LOCALES = ['th', 'en'] as const

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()

  async function switchLocale(newLocale: string) {
    await setLocale(newLocale)
    router.refresh()
  }

  return (
    <div className="border-dark-border flex items-center gap-0.5 rounded-full border px-1.5 py-1">
      {LOCALES.map((locale) => (
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
