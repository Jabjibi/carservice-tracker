type PageGreetingProps = {
  name: string
  subtitle: string
}

function todayThai(): string {
  return new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PageGreeting({ name, subtitle }: PageGreetingProps) {
  return (
    <header className="mb-8">
      <h1 className="text-text-primary text-[36px] font-semibold tracking-tight">
        สวัสดี, {name} <span aria-hidden>👋</span>
      </h1>
      <p className="text-text-secondary mt-2 text-[14px]">
        {todayThai()} — {subtitle}
      </p>
    </header>
  )
}
