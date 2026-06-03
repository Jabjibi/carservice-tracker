'use server'

import { cookies } from 'next/headers'

const SUPPORTED_LOCALES = ['th', 'en'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export async function setLocale(locale: string) {
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return
  const cookieStore = await cookies()
  cookieStore.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
}
