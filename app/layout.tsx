import type { Metadata } from 'next'
import { Inter, Sarabun, JetBrains_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-inter',
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-sarabun',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Car Service Tracker',
    template: '%s | Car Service Tracker',
  },
  description: 'ระบบติดตามการซ่อมบำรุงรถยนต์ แจ้งเตือนผ่าน LINE',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale().catch(() => 'th')
  return (
    <html
      lang={locale}
      className={`${inter.variable} ${sarabun.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
