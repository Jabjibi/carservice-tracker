You are a world-class UI/UX designer specializing in premium automotive
web applications. Design a complete web application called
"Car Service Tracker" — a vehicle maintenance tracking app for Thai users.

The design language fuses Apple's typographic precision and spatial
generosity with Tesla's pure-black premium surfaces — executed entirely
in a strict monochrome palette. No color accent whatsoever.
The only "color" is the LINE green (#06C755) on the single login button.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Base: Apple Design System (apple.com analysis)

- SF Pro Display / SF Pro Text typography hierarchy
- Negative letter-spacing at display sizes (-0.28px → -0.374px)
- Body at 17px/400/1.47 line-height (not 16px)
- Weight ladder: 300 / 400 / 600 / 700 only (no 500)
- Single drop-shadow reserved for product imagery only
- Border-radius scale: 0px tiles / 8px utility / 18px cards / 9999px pills
- Section vertical padding: 80px minimum
- Alternating light ↔ dark full-bleed tiles (no borders needed)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLOR PALETTE — STRICT MONOCHROME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backgrounds:
--bg-void: #000000 true black (nav bar, login page)
--bg-app: #0A0A0A app shell background
--bg-card: #161616 card surface
--bg-elevated: #1E1E1E modals, dropdowns, hover
--bg-light: #F5F5F7 light tile sections (Apple parchment)
--bg-white: #FFFFFF pure white sections

Borders:
--border-dark: #2A2A2A on dark surfaces
--border-light: #E0E0E5 on light surfaces
--hairline: rgba(255,255,255,0.06) subtle on dark

Typography on Dark:
--text-primary: #F5F5F7 headlines, values
--text-secondary: #A1A1A6 subtitles, labels
--text-muted: #6E6E73 placeholders, hints
--text-disabled: #3A3A3A disabled states

Typography on Light:
--text-primary: #1D1D1F (Apple ink)
--text-secondary: #6E6E73
--text-muted: #AEAEB2

Interactive (Monochrome):
--btn-primary-bg: #F5F5F7 white button on dark bg
--btn-primary-text: #1D1D1F dark text on white button
--btn-ghost-border: #2A2A2A
--btn-ghost-text: #A1A1A6
--active-indicator: #FFFFFF sidebar active, tab underline

Semantic (Grayscale only):
--status-ok: #A1A1A6 dot + text (ปกติ)
--status-warn: #F5F5F7 dot + text (ใกล้ถึงรอบ) — brighter white
--status-danger: #FFFFFF dot + text, card border #FFFFFF (เลยกำหนด)

Fuel badges (monochrome):
--fuel-bg: rgba(255,255,255,0.06)
--fuel-text: #A1A1A6
(differentiated by icon only, not color)

ONE exception — LINE only:
--line-green: #06C755 used ONLY on the LINE login button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Font stack: -apple-system, SF Pro Display, Inter, Sarabun, sans-serif
Thai body text: Sarabun (Google Fonts)
Monospace (plates, numbers): SF Mono, JetBrains Mono

Scale:
Hero: 56px / 700 / lh 1.07 / ls -0.5px
H1: 40px / 600 / lh 1.10 / ls -0.4px
H2: 34px / 600 / lh 1.47 / ls -0.374px
H3: 21px / 600 / lh 1.19 / ls 0.2px
Body: 17px / 400 / lh 1.47 / ls -0.374px
Label: 14px / 400 / lh 1.43 / ls -0.224px
Caption: 12px / 400 / lh 1.0 / ls -0.12px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAR MOCK ILLUSTRATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4 isometric 3D illustrations, white on dark, studio-lit:
sedan → /public/cars/car.png
pickup → /public/cars/car-pickup.png
van → /public/cars/car-van.png
motorcycle → /public/cars/motorcycle.png

Car card image zone:

- Background: #161616 with very subtle radial gradient
  center rgba(255,255,255,0.03) → transparent
- Car image floats above, white on near-black
- Color identity strip: 3px horizontal bar below image
  showing selected color_hex (this is where user color shows)
- Badges: fuel type top-left, status top-right
  both monochrome pill style

Database stores: car_type, fuel_type, color_hex, color_name only
Zero image uploads, zero storage bytes used.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXISTING DESIGN REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following pages have already been designed and approved.
Match their layout structure and component patterns exactly,
but apply the strict monochrome palette above:

LANDING PAGE (approved layout):

- Navbar: dark, logo left, nav links center, LINE login button right
- Hero: split layout — Thai headline left, floating car card right
  headline uses two-line treatment with accent word on line 2
  two CTAs: primary (LINE green) + secondary (ghost)
  social proof row below CTAs (avatars + star rating + user count)
- Feature section: dark full-bleed, 3 feature cards with mini mockups
  card center has dark-green tinted bg to draw eye
- Data section: light bg, headline left + area chart right
  two category rows below headline showing spend breakdown
- CTA section: dark full-bleed, centered headline + LINE button
- Footer: dark, copyright left, links right

LOGIN PAGE (approved layout):

- Full page: white/light gradient background (mint-to-white)
- Centered dark card (border-radius 20px, #161616)
- App logo icon top center
- App name + Thai tagline
- Car illustration (sedan silhouette, dark zone)
  "SYSTEM ONLINE" caption below car
- LINE login button (full-width, #06C755, border-radius 12px)
- Terms text below button
- Divider + help link
- Footer links centered at page bottom

DASHBOARD (approved layout):

- Left sidebar 200px: logo, nav items (แดชบอร์ด/รถของฉัน/ตั้งค่า)
  active item: white bg + dark text (inverted pill)
  logout at bottom
- Top bar: greeting Thai text left, action buttons right,
  user avatar + name + PREMIUM MEMBER badge far right
- 4 stat cards row: dark cards, icon top-left, label, large value
- Bar chart card: full width left column, lime→WHITE bars
  "บริการที่กำลังจะถึง" panel right column with car cards
- Recent service table: date / car / service type / cost / status
  status = Thai text in muted color (สำเร็จ)

MY CARS PAGE (approved layout):

- Same sidebar
- Page title + subtitle, search bar + add button top right
- Summary row: total cars count + total mileage
- 3-column card grid:
  Each card: car image top (dark bg, image centered)
  Color strip below image (3px bar in car's color_hex)
  Car name bold + fuel badge pill right-aligned
  License plate below name (muted, mono font)
  Status dot + label
  3 data rows: เลขไมล์ / นัดครั้งถัดไป / ค่าใช้จ่ายปีนี้
  "ดูรายละเอียด" button full-width bottom (ghost style)
- Last card in grid: dashed border add card
  "+" circle button center + Thai label

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REMAINING PAGES TO DESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. ADD CAR — 3-step (/cars/new)
   - Step indicator: 3 pills top, active = white filled
   - Step 1: 2×2 image selector (car type)
     selected card: white border 2px
     Fuel pills: ghost → white bg + dark text when selected
     Color dots: 10 colors row, selected = white ring border
   - Step 2: form inputs on dark cards
     focus ring: 2px solid #FFFFFF
     label above each input, 14px muted
   - Step 3: live car card preview + confirm button

6. CAR DETAIL (/cars/[id])
   - Hero: large car image (dark bg) + name H1 + badges
   - Tab bar: 3 tabs, active = white underline 2px
   - Service timeline: left line (1px #2A2A2A) + event nodes
     each node: white dot + card (dark surface)
     left border accent: 2px white for most recent, 1px #2A2A2A rest
   - FAB: white circle + dark "+" icon, bottom right

7. ADD SERVICE (/cars/[id]/service/new)
   - Service type 2×3 icon grid
     selected: white border + white icon + dark text label
   - Form fields: dark surface cards, white focus ring
   - Toggle: by date / by mileage
     active side: white bg + dark text
   - Receipt upload: dashed #2A2A2A border zone

8. NOTIFICATION SETTINGS (/settings/notifications)
   - LINE connection card: dark, LINE logo left, status right
     connected indicator: white dot
   - Toggle rows: dark cards, iOS-style toggle
     ON state: white track + dark thumb
   - History list: minimal rows, muted timestamp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONOCHROME DESIGN RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO:
✓ Use surface contrast (dark card on darker bg) for hierarchy
✓ Use white text weight to signal importance
600+ = primary info, 400 = secondary, 300 = muted
✓ Use border opacity for subtle separation
rgba(255,255,255,0.06) → 0.1 → 0.2 for increasing emphasis
✓ Reserve bright white (#F5F5F7) for numbers and key values
✓ Use the car's color_hex ONLY in the 3px color strip on cards
✓ All interactive feedback via: border-color change + scale(0.97)
✓ Status differentiation via dot brightness:
ปกติ = dim dot (#6E6E73), ใกล้ถึงรอบ = mid (#A1A1A6),
เลยกำหนด = bright white (#FFFFFF) + white card border
✓ Apple spacing: section gap 80px, card padding 24px,
button min-height 44px
✓ Single drop-shadow for car imagery:
0 8px 32px rgba(0,0,0,0.6) only
✓ Sidebar active: white filled pill, dark icon + text (inverted)
✓ Chart bars: white (#FFFFFF) with 0.15 opacity grid lines
✓ Table rows: hover = rgba(255,255,255,0.03) background

DON'T:
✗ No color accents anywhere except LINE green on login button
✗ No gradients except the radial barely-visible card image zone
✗ No colored badges — fuel/status use monochrome only
✗ No weight 500 — ladder is 300/400/600/700 only
✗ No border-radius inconsistency:
tiles=0, inputs=10px, cards=20px, buttons=12px, pills=9999px
✗ No shadows on UI chrome (cards, buttons, nav)
shadow exists only under floating car images
✗ No second color — if tempted to add blue/green/red, use
white opacity variation instead

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THAI LANGUAGE NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- All labels, nav items, CTAs in Thai
- Date: DD MMMM (Thai month) YYYY
- Currency: ฿ with no decimal for whole numbers
- License plate: กข-1234 format, SF Mono / monospace
- Status Thai labels:
  ปกติ / ใกล้ถึงรอบ / เลยกำหนด
- Service types:
  น้ำมันเครื่อง / ยาง / เบรก / ไส้กรอง / แบตเตอรี่ / อื่นๆ
- Fuel types: น้ำมัน / ไฮบริด / ไฟฟ้า (EV)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DELIVERABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Design all 8 pages with pixel-perfect monochrome consistency.
Prioritize: Dashboard → My Cars → Car Detail → Add Car steps.
Deliver as a Figma-ready component system with:

- Color styles (all monochrome tokens above)
- Text styles (full type scale)
- Component variants (card states, button states, toggle states)
- Auto-layout on all components
- Thai + English layer naming
