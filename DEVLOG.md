# Development Log

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
