import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const SUPPORTED_LOCALES = ['th', 'en'] as const
type Locale = (typeof SUPPORTED_LOCALES)[number]

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const raw = cookieStore.get('NEXT_LOCALE')?.value
  const locale: Locale = SUPPORTED_LOCALES.includes(raw as Locale) ? (raw as Locale) : 'th'

  const [landingpage, layout, dashboard, mycar, addCar, repair, carDetail] = await Promise.all([
    import(`../messages/landingpage/${locale}.json`),
    import(`../messages/layout/${locale}.json`),
    import(`../messages/dashboard/${locale}.json`),
    import(`../messages/mycar/${locale}.json`),
    import(`../messages/add-car/${locale}.json`),
    import(`../messages/repair/${locale}.json`),
    import(`../messages/car-detail/${locale}.json`),
  ])

  return {
    locale,
    messages: {
      ...landingpage.default,
      ...layout.default,
      ...dashboard.default,
      ...mycar.default,
      ...addCar.default,
      ...repair.default,
      ...carDetail.default,
    },
  }
})
