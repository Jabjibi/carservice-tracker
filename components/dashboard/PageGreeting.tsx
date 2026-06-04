type PageGreetingProps = {
  name: string
  date: string
  subtitle: string
}

export function PageGreeting({ name, date, subtitle }: PageGreetingProps) {
  return (
    <header className="mb-8">
      <h1 className="text-text-primary text-[36px] font-semibold tracking-tight">
        สวัสดี, {name} <span aria-hidden>👋</span>
      </h1>
      <p className="text-text-secondary mt-2 text-[14px]">
        {date} — {subtitle}
      </p>
    </header>
  )
}
