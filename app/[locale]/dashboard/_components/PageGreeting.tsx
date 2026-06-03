type PageGreetingProps = {
  name: string
  date: string
  subtitle: string
}

export function PageGreeting({ name, date, subtitle }: PageGreetingProps) {
  return (
    <header className="mb-8">
      <h1 className="text-[36px] font-semibold tracking-tight text-[#1D1D1F]">
        สวัสดี, {name} <span aria-hidden>👋</span>
      </h1>
      <p className="mt-2 text-[14px] text-[#6E6E73]">
        {date} — {subtitle}
      </p>
    </header>
  )
}
