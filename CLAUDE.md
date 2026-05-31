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
├── layout.tsx               # Root layout + fonts + metadata
├── page.tsx                 # Landing page (/)
├── login/page.tsx           # Login (/login)
├── dashboard/page.tsx       # Dashboard (/dashboard)
├── cars/
│   ├── page.tsx             # My Cars (/cars)
│   ├── new/page.tsx         # Add Car wizard (/cars/new)
│   └── [id]/
│       ├── page.tsx         # Car Detail (/cars/[id])
│       └── service/
│           └── new/page.tsx # Add Service (/cars/[id]/service/new)
└── settings/
    └── notifications/page.tsx  # Notification Settings

components/
├── shared/          # Shared/global custom components
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── CarCard.tsx
│   ├── StatusBadge.tsx
│   └── ...
└── ui/              # shadcn/ui components (do not modify)

hooks/
├── use-cars.ts      # Car list state
├── use-car.ts       # Single car state
├── use-service.ts   # Service form state
└── ...              # All useState / useMemo logic lives here
```

### Logic Separation

- **hooks/**: all `useState`, `useMemo`, `useCallback`, `useReducer` logic
- **components/shared/**: custom UI components used across pages
- **components/ui/**: shadcn/ui primitives (do not edit)
- Pages are thin — they import hooks + shared components only

### Next.js 16 Notes

- Proxy file: `proxy.ts` (not `middleware.ts`)
- `params` and `searchParams` are `Promise` — must `await` them
- Metadata: export `metadata` or `generateMetadata` from Server Components only
- Fonts: use `next/font/google` only (no `<link>` tags)

### Metadata Pattern (every page)

```tsx
export const metadata: Metadata = {
  title: 'Page Title | Car Service Tracker',
  description: '...',
}
```

Root layout uses title template: `{ default: 'Car Service Tracker', template: '%s | Car Service Tracker' }`

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
