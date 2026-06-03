@AGENTS.md

# Car Service Tracker — Project Metadata

## Overview

Vehicle maintenance tracking web app for Thai users.
Design: strict monochrome (Apple × Tesla) — only exception is LINE green `#06C755` on login button.

## Tech Stack

- Next.js 16.2.6 (App Router) — read `.agents/skills/next-best-practices/` before writing any Next.js code
- React 19.2.4 — use `use()` instead of `useContext()`, no `forwardRef`
- TypeScript (strict) — read `.agents/skills/typescript-pro/`
- Tailwind CSS v4
- shadcn/ui components
- lucide-react icons

## Coding Conventions

### Before Writing Code

1. Read `.agents/skills/next-best-practices/` relevant docs
2. Read `.agents/skills/vercel-composition-patterns/AGENTS.md` for component architecture
3. Read `.agents/skills/typescript-pro/SKILL.md` for type patterns

### Component Rules (from vercel-composition-patterns)

- No boolean prop proliferation — use compound components
- Define generic context interfaces: `{ state, actions, meta }`
- Use `use()` not `useContext()` (React 19)
- No `forwardRef` (React 19 — ref is a regular prop)
- Prefer `children` composition over render props
- Explicit variants over boolean modes

### File Structure

```
app/
├── layout.tsx               # Root layout — html/body/fonts/i18n only
├── page.tsx                 # Landing page (/)
├── login/page.tsx           # Login (/login)
└── (customer)/              # Route group — pages that require sidebar
    ├── layout.tsx           # Sidebar layout (AppSidebar + SidebarInset)
    ├── dashboard/page.tsx   # Dashboard (/dashboard)
    ├── mycar/
    │   ├── page.tsx         # My Cars (/mycar)
    │   └── [id]/page.tsx    # Car Detail (/mycar/[id])
    ├── addcar/page.tsx      # Add Car (/addcar)
    └── repair/page.tsx      # Log Service (/repair?id=[carId])

components/
├── cars/            # All UI for cars feature (list + detail + tabs)
│   ├── CarCard.tsx
│   ├── CarDetailClient.tsx
│   ├── HistoryTab.tsx
│   ├── TripsTab.tsx
│   ├── StatsTab.tsx
│   └── SettingsTab.tsx
├── add-car/         # UI for add car form
│   └── AddCarClient.tsx
├── repair/          # UI for log service form
│   └── LogServiceClient.tsx
├── shared/          # Primitives reused across features
│   ├── Fab.tsx
│   ├── SectionCard.tsx
│   ├── CarThumbnail.tsx
│   └── ...
└── ui/              # shadcn/ui components (do not modify)

lib/
├── types.ts         # Shared TypeScript types
├── utils.ts         # Pure utility functions (cn, baht)
├── car-stats.ts     # Pure business logic (computeCarStats)
├── actions/         # Server Actions
│   └── locale.ts   # setLocale() — writes NEXT_LOCALE cookie
└── hooks/
    ├── use-cars.ts
    ├── use-car.ts
    ├── use-service-logs.ts
    ├── use-trips.ts
    └── ...          # All useState / useMemo logic lives here
```

### Page Rules — Pages are always thin

**Every `page.tsx` does exactly two things: export metadata + render one component.**
All UI lives in `components/[feature]/`. Never write JSX directly in a page file.

```tsx
// ✅ page.tsx — thin Server Component
import type { Metadata } from 'next'
import { MyCarClient } from '@/components/cars/MyCarClient'

export const metadata: Metadata = {
  title: 'รถของฉัน',
  description: 'รายการรถทั้งหมดของคุณ',
}

export default function MyCarPage() {
  return <MyCarClient />
}
```

```tsx
// ❌ ห้ามเขียน JSX ใน page.tsx โดยตรง
export default function MyCarPage() {
  return (
    <div className="grid ...">
      {cars.map(...)}  {/* ← logic + UI ต้องย้ายไป component */}
    </div>
  )
}
```

### Component Organization Rules

- **`components/[feature]/`** — UI ทั้งหมดของ feature นั้น ไม่มี `_components/` ใน `app/`
- **`components/shared/`** — primitive ที่ใช้ข้ามหลาย feature (Fab, SectionCard, LicensePlate ฯลฯ)
- **`components/ui/`** — shadcn/ui ห้ามแตะ

### Layout Rules

- **`app/layout.tsx`** — HTML shell เท่านั้น (`<html>`, `<body>`, fonts, `NextIntlClientProvider`)
- **`app/(customer)/layout.tsx`** — Sidebar shell สำหรับหน้าที่ login แล้วเท่านั้น
- ห้ามใส่ sidebar ใน root layout — landing และ login ต้องไม่มี sidebar

### Logic Separation

- **`lib/hooks/`** — React hook ทั้งหมด (`useState`, `useMemo`, `useCallback`, `useReducer`)
- **`lib/`** — pure utilities และ business logic (`types.ts`, `utils.ts`, `car-stats.ts`)
- **`lib/actions/`** — Server Actions (เขียน cookie, mutate data)
- ห้าม logic ใน `page.tsx` หรือ component โดยตรง

### i18n — Cookie-based (ไม่มี locale ใน URL หรือ folder)

- ไม่มี `[locale]` ใน URL หรือ file structure เลย
- `proxy.ts` — passthrough เท่านั้น ไม่ทำ routing
- `i18n/request.ts` — อ่าน locale จาก `NEXT_LOCALE` cookie โดยตรง
- สลับภาษาผ่าน `setLocale()` server action → `router.refresh()`

```ts
// i18n/request.ts
const cookieStore = await cookies()
const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'th'
```

### Next.js 16 Notes

- Proxy file: `proxy.ts` (not `middleware.ts`)
- `params` และ `searchParams` เป็น `Promise` — ต้อง `await` เสมอ
- Metadata: export จาก Server Component เท่านั้น
- Fonts: ใช้ `next/font/google` เท่านั้น (ห้ามใช้ `<link>` tag)

### Metadata Rules

#### 1. Server Components only

`metadata` / `generateMetadata` ต้อง export จาก Server Component เท่านั้น
ถ้า page มี `'use client'` ให้ย้าย client logic ไปอยู่ใน child component แทน

#### 2. Title template

Root layout ตั้ง template ไว้แล้ว — แต่ละ page ใส่แค่ title สั้นๆ:

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: { default: 'Car Service Tracker', template: '%s | Car Service Tracker' },
}

// ทุก page — ใส่แค่ title สั้นๆ template จะต่อท้ายให้เอง
export const metadata: Metadata = {
  title: 'รถของฉัน', // → "รถของฉัน | Car Service Tracker"
}
```

#### 3. Static vs Dynamic

- **Static** (`export const metadata`) — title ไม่ขึ้นกับ data
- **Dynamic** (`export async function generateMetadata`) — title มาจาก route params

```tsx
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const car = cars.find((c) => c.id === id)
  return { title: `${car?.brand} ${car?.model}` }
}
```

#### 4. Checklist — ทุก page

- [ ] `title` — สั้น อ่านรู้เรื่อง
- [ ] `description` — หนึ่งประโยค
- [ ] Export จาก Server Component เท่านั้น
- [ ] ถ้า page เป็น `'use client'` → ย้าย client logic ออกไป child component ก่อน

### Design System Tokens (Tailwind custom vars)

All CSS variables defined in `globals.css`.

**Palette ratio: White 60% / Gray 40% / Green (accent) / Black 10%**

Backgrounds (White 60%):

- `--bg-page:    #FFFFFF` — main page background
- `--bg-surface: #F5F5F7` — section / tile background (Apple parchment)
- `--bg-card:    #F0F0F2` — card surface
- `--bg-elevated:#E8E8EC` — modals, dropdowns, hover state

Gray surfaces & borders (Gray 40%):

- `--bg-muted:   #D1D1D6` — input fill, disabled surface
- `--border:     #E0E0E5` — default border
- `--border-mid: #C7C7CC` — stronger separator
- `--hairline:   rgba(0,0,0,0.06)` — subtle dividers

Typography:

- `--text-primary:   #1D1D1F` — headlines, key values (black 10% family)
- `--text-secondary: #6E6E73` — subtitles, labels (gray)
- `--text-muted:     #AEAEB2` — placeholders, hints (gray)
- `--text-disabled:  #C7C7CC` — disabled states (gray)
- `--text-on-green:  #FFFFFF` — text on green button

Interactive:

- `--btn-primary-bg:   #1D1D1F` — primary button (dark on white)
- `--btn-primary-text: #FFFFFF`
- `--btn-ghost-border: #C7C7CC`
- `--btn-ghost-text:   #6E6E73`
- `--active-indicator: #06C755` — active sidebar/tab uses green

Accent — GREEN (LINE):

- `--green: #06C755` — LINE login button + active indicators + key highlights

Status (grayscale):

- `--status-ok:     #6E6E73` dot + text (ปกติ)
- `--status-warn:   #1D1D1F` dot + text (ใกล้ถึงรอบ)
- `--status-danger: #1D1D1F` dot + text + card border black (เลยกำหนด)

Border-radius scale: tiles=0px, inputs=10px, cards=20px, buttons=12px, pills=9999px

### Font Setup (layout.tsx)

```tsx
import { Inter, Sarabun } from 'next/font/google'
// Inter: weight ['300','400','600','700'], variable '--font-inter'
// Sarabun: subsets ['thai','latin'], variable '--font-sarabun'
// JetBrains_Mono: for license plates, variable '--font-mono'
```

### Icons

Always use `lucide-react`. No other icon libraries.

### Car Images

- `/public/cars/car.png` — sedan
- `/public/cars/car-pickup.png` — pickup
- `/public/cars/car-van.png` — van
- `/public/cars/motorcycle.png` — motorcycle

### After Every Code Change

Always run in order:

```bash
npm run lint     # must pass with 0 errors
npm run format   # auto-formats all files
```

If lint fails, fix the error before committing — never suppress with `eslint-disable` unless there is a documented reason.

#### Common lint rule: `react-hooks/set-state-in-effect`

Do **not** call `setState` synchronously inside `useEffect`. Initialize state with a lazy initializer instead:

```ts
// ❌ triggers lint error
useEffect(() => {
  setState(someValue)
}, [])

// ✅ correct — lazy initializer
const [value, setValue] = useState(() => someValue)
```

#### When moving files — check all dependents

```bash
grep -rn "from '@/hooks/" app/ components/
```

`components/ui/sidebar.tsx` imports `useIsMobile` from `@/lib/hooks/use-mobile` — update this path if hooks are ever relocated.
