import { NextIntlClientProvider } from 'next-intl'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  await params
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
