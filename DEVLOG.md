# Development Log

## 2026-06-01 — Landing page responsive pass across all breakpoints

**Issues found during audit:**

- `LandingNav`: logo at `h-20` (80px) was taller than navbar at `h-14` (56px) → overflow.
- `HeroSection`: `md:whitespace-nowrap` on the first headline span caused overflow at narrow desktop widths (~1024–1200px). Headline `clamp(44px, 3.8vw, 56px)` had a 44px floor — too large for ~360px mobiles.
- `FeaturesSection`, `DataSection`, `CtaSection`: fixed `text-[34px]` / `text-[32px]` titles too large on mobile.
- `CtaSection`: `whitespace-nowrap` on h2 guaranteed overflow on mobile.

**Changes:**

- `LandingNav.tsx`: navbar `h-14` → `h-16 md:h-20`; logo `h-20` → `h-10 md:h-14`.
- `HeroSection.tsx`: removed `md:whitespace-nowrap`; headline clamp `44px–56px` → `32px–56px` (5vw scaling); added `text-balance`; subtitle `text-[17px]` → `text-[15px] md:text-[17px]`; section padding `py-12` → `py-10 md:py-16`.
- `FeaturesSection.tsx`: title `text-[34px]` → responsive `text-[26px] sm:text-[30px] md:text-[34px]`; section `py-14` → `py-12 md:py-14`; added `text-balance` / `text-pretty`.
- `DataSection.tsx`: same title scaling + balance/pretty as Features.
- `CtaSection.tsx`: removed `whitespace-nowrap`; title responsive `text-[24px] sm:text-[28px] md:text-[32px]`; button padding/size step down on mobile (`px-6 py-3 text-sm` → `md:px-8 md:text-base`).

**Patterns applied:**

- Mobile-first sizing with `sm:` / `md:` step-ups instead of fixed pixel values.
- `text-balance` on headings, `text-pretty` on body copy — improves wrapping at all widths.
- Smaller section vertical padding on mobile to keep above-the-fold density.

**Not changed (intentional):**

- Did not add a mobile hamburger menu — nav links remain hidden below `md` per the existing design. Logo + language switcher + Sign-In CTA still fit on a 320px viewport.
- `LandingFooter` already wraps correctly.

**Files touched:**

- `components/landing/LandingNav.tsx`
- `components/landing/HeroSection.tsx`
- `components/landing/FeaturesSection.tsx`
- `components/landing/DataSection.tsx`
- `components/landing/CtaSection.tsx`

**Verification:** `npx tsc --noEmit` clean.

---

## 2026-06-01 — Replace navbar brand mark with logo image

**Change:**

- `LandingNav.tsx`: replaced the inline `<Wrench>` icon + "ServiceTracker" text with `next/image` rendering `/public/image/logo.png` (1536×1024, contains the AUTO TRACKER lockup + car silhouette).
- Sized at `h-9 w-auto` (36px tall, ~54px wide based on 3:2 ratio) — fits inside the `h-14` navbar with breathing room.
- `priority` flag set since the logo is above the fold on the landing page.
- `aria-label="AutoTracker"` on the parent `<Link>` since the image is purely decorative inside a navigable element.
- Dropped the lucide `Wrench` import (no longer used in this file).

**Files touched:**

- `components/landing/LandingNav.tsx`

**Note:** `LandingFooter.tsx` still uses the `Wrench` icon for the copyright row — left unchanged since the user only asked for the navbar.

**Verification:** `npx tsc --noEmit` clean.

---

## 2026-05-31 — Swap generic chat-bubble for LINE brand icon on login buttons

**Issue:** All "Sign in with LINE" buttons used `MessageCircle` from lucide-react (a generic chat bubble), not the actual LINE brand mark.

**Change:**

- Added `components/shared/LineIcon.tsx` — inline SVG component using `fill="currentColor"` so it inherits the parent's text color (matches the lucide-react pattern). Path data lifted from `public/image/icons/line.svg`. `aria-hidden` since the button text already labels the action.
- Replaced `<MessageCircle />` with `<LineIcon />` in the three login CTAs:
  - `LandingNav.tsx` — top-right Sign In button
  - `HeroSection.tsx` — primary green CTA
  - `CtaSection.tsx` — bottom green CTA
- Left `MessageCircle` in `FeaturesSection.tsx` (those instances are a chat-message _preview_, not a login affordance).

**Notes:**

- The source SVG hardcoded `fill="#00C300"`. Using `currentColor` instead keeps the icon white on green buttons (consistent with the design system's `--text-on-green: #FFFFFF`).
- Not using `next/image` for this — inline SVG keeps it a single React node with no extra network request, and lets `text-*` Tailwind utilities tint it.

**Files touched:**

- `components/shared/LineIcon.tsx` (new)
- `components/landing/LandingNav.tsx`
- `components/landing/HeroSection.tsx`
- `components/landing/CtaSection.tsx`

**Verification:** `npx tsc --noEmit` clean.

---

## 2026-05-31 — Landing page horizontal spacing refactor

**Issue:** Content on landing page felt too close to viewport edges at wide viewports — not enough side whitespace.

**Root cause:** All landing sections duplicated the same wrapper pattern (`mx-auto max-w-6xl` + `px-6 md:px-12 lg:px-16`) inline, and `max-w-6xl` (1152px) was too wide for the design — at 1440px viewport that leaves only 144px gap per side. Footer also drifted to `max-w-7xl` inconsistently.

**Change:**

- Added `components/shared/LandingContainer.tsx` — single source of truth for landing-page horizontal layout. Defaults to `mx-auto w-full max-w-5xl px-6 md:px-12 lg:px-16`. Accepts `className` for per-section flex/grid layout. Uses `cn()` (tailwind-merge) so consumers can override `max-w-*` when needed (e.g. CTA section keeps its narrower `max-w-4xl`).
- Refactored all 6 landing components to use `LandingContainer`:
  - `LandingNav.tsx` (kept semantic `<nav>` wrapping the container)
  - `HeroSection.tsx`
  - `FeaturesSection.tsx`
  - `DataSection.tsx`
  - `CtaSection.tsx` (overrides to `max-w-4xl`)
  - `LandingFooter.tsx` (was `max-w-7xl` — now consistent with siblings)
- Removed duplicated padding from each `<section>` (padding now lives on the container; sections keep only `bg-*` + `py-*`).

**Effect:**

- Reduced content max-width from 1152px → 1024px → more breathing room on both sides at common desktop viewports (at 1440px the side gap grows from 144px → 208px).
- Single point of change for future spacing adjustments on landing.

**Files touched:**

- `components/shared/LandingContainer.tsx` (new)
- `components/landing/LandingNav.tsx`
- `components/landing/HeroSection.tsx`
- `components/landing/FeaturesSection.tsx`
- `components/landing/DataSection.tsx`
- `components/landing/CtaSection.tsx`
- `components/landing/LandingFooter.tsx`

**Verification:** `npx tsc --noEmit` clean.
