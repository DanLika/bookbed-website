# BookBed Website - Development Guide

Ovaj fajl sadrži dokumentaciju za BookBed marketing website.

## Project Overview

BookBed je SaaS platforma za upravljanje rezervacijama za vlasnike smještaja. Ovaj website je marketing/prezentacijski sajt koji prikazuje proizvod.

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **i18n:** react-i18next (EN/BS)
- **Routing:** React Router DOM

## Folder Structure

```
bookbed-website/
├── public/
│   ├── images/
│   │   ├── hero/               # Hero section images
│   │   │   ├── hero-dark.avif  # Light theme mockup
│   │   │   └── hero-light.avif # Dark theme mockup
│   │   ├── bookbed/            # BookBed screenshots & mockups
│   │   │   ├── bookbed-mockup.avif
│   │   │   ├── bookbed-dashboard.png
│   │   │   ├── bookbed-calendar.png
│   │   │   └── bookbed-widget.png
│   │   └── tech/               # Tech stack icons
│   │       ├── flutter.avif
│   │       ├── firebase.avif
│   │       ├── stripe.avif
│   │       └── resend.avif
│   └── locales/
│       ├── en/translation.json
│       └── bs/translation.json
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FinalCTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Logo.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── DemoPage.tsx
│   │   ├── WidgetPage.tsx
│   │   └── ContactPage.tsx
│   └── utils/
│       ├── typography.ts
│       └── spacing.ts
└── CLAUDE.md
```

---

## Typography System (CSS Clamp)

Koristimo CSS `clamp()` za fluid auto-sizing tipografije. Ovo osigurava da tekst uvijek stane u maksimalno 2 reda na svim veličinama ekrana.

**Lokacija:** `src/utils/typography.ts`

```typescript
export const typography = {
  // Hero title - fluid scaling
  // min: 26px, preferred: 5vw, max: 56px
  h1: 'text-[clamp(1.625rem,5vw,3.5rem)]',

  // Section titles
  // min: 24px, preferred: 4vw, max: 48px
  h2: 'text-[clamp(1.5rem,4vw,3rem)]',

  // Subsection titles
  // min: 18px, preferred: 2.5vw, max: 28px
  h3: 'text-[clamp(1.125rem,2.5vw,1.75rem)]',

  // Hero subtitle - fluid scaling for max 2 lines
  // min: 14px, preferred: 2vw, max: 20px
  subtitle: 'text-[clamp(0.875rem,2vw,1.25rem)]',

  // Body text
  // min: 14px, preferred: 1.5vw, max: 18px
  body: 'text-[clamp(0.875rem,1.5vw,1.125rem)]',
}

// Container widths
export const containers = {
  hero: 'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',
  section: 'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',
}
```

**Upotreba:**
```tsx
import { typography, containers } from '../utils/typography'

<h1 className={`${typography.h1} font-bold`}>Title</h1>
<p className={typography.subtitle}>Subtitle</p>
<div className={`${containers.hero} mx-auto`}>Content</div>
```

---

## Spacing System

**Lokacija:** `src/utils/spacing.ts`

```typescript
// Section spacing - responsive padding
export const getSectionSpacing = () =>
  'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28'

// Compact spacing for smaller sections
export const getCompactSpacing = () =>
  'py-8 sm:py-10 md:py-12 lg:py-16'

// Container classes
export const getContainerClasses = () =>
  'max-w-7xl mx-auto'
```

---

## Background Colors - Consistent Gradient System

Sve sekcije koriste konzistentan gradient sistem za smooth transitions između sekcija.

### Light Theme Flow:
```
Hero:           from-slate-100 to-white
Trust:          from-white to-gray-50
Features:       from-gray-50 to-white
ScreenshotGallery: from-white to-gray-50
Pricing:        from-gray-50 to-white
Testimonials:   bg-gray-50
CTA:            Purple gradient
Footer:         from-zinc-900 to-zinc-950
```

### Dark Theme Flow:
```
Hero:           from-zinc-950 to-zinc-900
Trust:          from-zinc-900 to-zinc-950
Features:       from-zinc-950 to-zinc-900
ScreenshotGallery: from-zinc-900 to-zinc-950
Pricing:        from-zinc-950 to-zinc-900
Testimonials:   bg-zinc-950
CTA:            Purple gradient
Footer:         from-zinc-950 to-black
```

### Implementation:
```tsx
// Hero section
className="bg-gradient-to-br from-slate-100 to-white dark:from-zinc-950 dark:to-zinc-900"

// Trust section
className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950"

// Features section
className="bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900"

// ScreenshotGallery section
className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950"

// Pricing section
className="bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900"

// Footer
className="bg-gradient-to-b from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black"
```

### Dot Pattern Background
Sve stranice koriste subtle dot pattern:
```tsx
<div
  className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
  style={{
    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
    backgroundSize: '32px 32px'
  }}
/>
```

---

## Hero Section - Mockup Scaling

Mockup u hero sekciji je skaliran da bude veći na mobilnim uređajima:

```tsx
<img
  src="/images/hero/hero-dark.avif"
  alt="BookBed Dashboard"
  className="relative w-[120%] sm:w-[110%] md:w-full max-w-none h-auto block dark:hidden"
/>
<img
  src="/images/hero/hero-light.avif"
  alt="BookBed Dashboard"
  className="relative w-[120%] sm:w-[110%] md:w-full max-w-none h-auto hidden dark:block"
/>
```

**Breakpoints:**
- Mobile: 120% širine (veći mockup)
- Tablet (sm): 110% širine
- Desktop (md+): 100% širine

**Floating Cards:**
- Skriveni na mobile (`hidden lg:block`)
- Prikazuju se samo na lg+ breakpointu

---

## ScreenshotGallery Section - CircularGallery

ScreenshotGallery koristi WebGL-based CircularGallery komponentu sa theme-aware slikama.

### Gallery Images Organization

**Lokacija:** `/public/images/gallery/`

Svaki mockup ima 2 varijante (light i dark) za theme-aware prikaz:
- **Light mockup** (bijela pozadina) → prikazuje se u **dark mode**
- **Dark mockup** (tamna pozadina) → prikazuje se u **light mode**

**Dostupni mockupi:**
```
dashboard-dark.avif / dashboard-light.avif
bookings-dark.avif / bookings-light.avif
calendar-dark.avif / calendar-light.avif
ical-dark.avif / ical-light.avif
unit-hub-basic-dark.avif / unit-hub-basic-light.avif
unit-hub-widget-dark.avif / unit-hub-widget-light.avif
```

### Theme Detection

```tsx
const [isDark, setIsDark] = useState(false)

useEffect(() => {
  const checkDarkMode = () => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }
  checkDarkMode()

  const observer = new MutationObserver(checkDarkMode)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  return () => observer.disconnect()
}, [])

const galleryItems = galleryData.map(item => ({
  image: isDark ? item.dark : item.light,
  text: item.text,
}))
```

### CircularGallery Configuration

**Settings:**
```tsx
<CircularGallery
  items={galleryItems}
  bend={1}                    // Curvature amount (0 = flat, higher = more curved)
  textColor="#6B4CE6"         // Primary purple color
  borderRadius={0.08}         // Rounded corners
  font="bold 24px Figtree, sans-serif"
  scrollSpeed={0.5}           // Lower = slower scrolling
  scrollEase={0.15}           // Smoothness of scroll (0.05 = very smooth)
/>
```

**Container Heights (Responsive):**
```tsx
<div className="relative w-full h-[600px] sm:h-[700px] md:h-[800px]">
```

### i18n Keys

```json
"gallery": {
  "title": "See It In Action",
  "subtitle": "Beautiful, intuitive interface designed for property owners",
  "dashboard": { "title": "Dashboard" },
  "bookings": { "title": "Bookings" },
  "calendar": { "title": "Calendar" },
  "ical": { "title": "iCal Sync" },
  "unitHubBasic": { "title": "Unit Hub" },
  "unitHubWidget": { "title": "Widget Settings" }
}
```

---

## Tech Icons Implementation

### Available Icons

| Technology | Path | Notes |
|------------|------|-------|
| Flutter | `/images/tech/flutter.avif` | Blue bird logo |
| Firebase | `/images/tech/firebase.avif` | Yellow/orange flame |
| Stripe | `/images/tech/stripe.avif` | Purple "S" logo |
| Resend | `/images/tech/resend.avif` | **Dark icon - needs brightness fix** |
| iCal | Inline SVG (`ICalIcon` component) | Custom calendar icon |

### Dark Mode Visibility Fix

```tsx
const DARK_ICONS = ['resend']

const needsBrightness = DARK_ICONS.includes(tech.name.toLowerCase())

<img
  src={tech.icon}
  alt={tech.name}
  className={`w-6 h-6 object-contain ${needsBrightness ? 'dark:brightness-[1.8] dark:contrast-[1.1]' : ''}`}
/>
```

### iCal Custom SVG Icon

```tsx
const ICalIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" className="stroke-primary" strokeWidth="2" />
    <path d="M3 10H21" className="stroke-primary" strokeWidth="2" />
    <path d="M8 2V6" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 2V6" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="15" r="1.5" className="fill-primary" />
    <circle cx="12" cy="15" r="1.5" className="fill-primary" />
    <circle cx="16" cy="15" r="1.5" className="fill-primary" />
  </svg>
)
```

---

## Design System

### Colors (Tailwind Config)

```typescript
// PRIMARY - Purple
primary: '#6B4CE6'
primaryDark: '#5B3DD6'
primaryLight: '#9B86F3'

// STATE COLORS
stateSuccess: '#10B981'  // Emerald for positive states
stateError: '#EF4444'    // Red ONLY for errors

// BACKGROUNDS
Light: slate-100, white, gray-50
Dark: zinc-950, zinc-900, zinc-800

// TEXT
textPrimary: '#2D3748'
textSecondary: '#4A5568'
textTertiary: '#718096'
```

### Color Semantics (IMPORTANT)

- **Crvena/Coral** - SAMO za error stanja, NIKADA za pozitivne elemente
- **Zelena/Emerald** - Za success stanja i pozitivne badges
- **Purple** - Primary akcije, CTA dugmad, highlights

```tsx
// CORRECT - Success badge
className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"

// WRONG - Don't use coral/red for positive things
// className="bg-secondary/10 text-secondary" ❌
```

---

## Animation Patterns

### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
>
```

### Staggered Children
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.key}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
  >
```

### Hover Scale
```tsx
<motion.div whileHover={{ scale: 1.05, y: -2 }}>
```

---

## Pages

### HomePage
- HeroSection (gradient + mockup + floating cards)
- TrustSection (tech stack logos)
- FeaturesSection (MagicBento grid with 6 features)
- ScreenshotGallery (CircularGallery with theme-aware mockups)
- PricingSection (3 tier pricing)
- TestimonialsSection (customer reviews)
- FinalCTASection (purple gradient CTA)
- Footer

### DemoPage (`/demo`)
- Video demos with YouTube embeds
- Loading spinner for video
- Zig-zag layout

### WidgetPage (`/widget`)
- Widget mode selector (full, calendar, inquiry)
- Embed code generator
- Browser mockup preview

### ContactPage (`/contact`)
- Contact form (mailto)
- Email/App link cards
- Response time card

---

## i18n Keys Structure

```json
{
  "hero": {
    "title": "Manage All Your Bookings in One Place",
    "subtitle": "The complete booking management platform...",
    "watchDemo": "Watch Demo"
  },
  "nav": {
    "home": "Home",
    "demo": "Demo",
    "widget": "Widget",
    "contact": "Contact"
  },
  "features": {
    "title": "Everything You Need",
    "subtitle": "Powerful features...",
    "calendar": { "title": "...", "desc": "..." },
    "widget": { "title": "...", "desc": "..." },
    "analytics": { "title": "...", "desc": "..." },
    "payments": { "title": "...", "desc": "..." },
    "emails": { "title": "...", "desc": "..." },
    "ical": { "title": "...", "desc": "..." }
  },
  "trust": {
    "title": "Built with modern technologies"
  },
  "footer": {
    "description": "...",
    "navigation": "Navigation",
    "contact": "Contact",
    "copyright": "...",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service"
  }
}
```

---

## Required Images

### Hero Section
| Image | Size | Description |
|-------|------|-------------|
| `hero-dark.avif` | 1920x1080+ | Dashboard mockup for light theme |
| `hero-light.avif` | 1920x1080+ | Dashboard mockup for dark theme |

### Features Section
| Image | Size | Description |
|-------|------|-------------|
| `bookbed-calendar.png` | 1200x750 | Calendar feature screenshot |
| `bookbed-widget.png` | 1200x750 | Widget preview |
| `bookbed-dashboard.png` | 1200x750 | Analytics dashboard |

### Tech Icons
| Icon | Size | Format |
|------|------|--------|
| flutter.avif | 64x64 | AVIF |
| firebase.avif | 64x64 | AVIF |
| stripe.avif | 64x64 | AVIF |
| resend.avif | 64x64 | AVIF |

---

## Deployment

### Firebase Hosting

- **Domain:** bookbed.io
- **Project ID:** rab-booking-248fc
- **Site ID:** bookbed-website

**Hosting URLs:**
- https://bookbed-website.web.app
- https://bookbed.io

**Domene:**
| Domena | Svrha |
|--------|-------|
| bookbed.io | Marketing website |
| app.bookbed.io | Owner dashboard |
| view.bookbed.io | Booking widget |

**Deploy:**
```bash
npm run build && firebase deploy --only hosting
```

### GitHub Repository

- **URL:** https://github.com/DanLika/bookbed-website
- **Branch:** main

---

**Last Updated:** 2025-12-20
