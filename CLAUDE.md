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

**IMPORTANT:** Koriste se exact Tailwind hex values za seamless prelaze:
- `white` = `#FFFFFF`
- `gray-50` = `#F9FAFB`
- `zinc-900` = `#18181B`
- `zinc-950` = `#09090B`

### Light Theme Flow:
```
Hero:              from-slate-100 to-white (bottom: #FFFFFF)
Trust:             from-white to-gray-50 (top: #FFFFFF, bottom: #F9FAFB)
Features:          from-gray-50 to-white (top: #F9FAFB, bottom: #FFFFFF)
ScreenshotGallery: bg-white (solid #FFFFFF) ← SEAMLESS with Features!
Pricing:           from-white to-gray-50 (top: #FFFFFF, bottom: #F9FAFB) ← SEAMLESS with Gallery!
Testimonials:      bg-gray-50
CTA:               Purple gradient
Footer:            from-zinc-900 to-zinc-950
```

### Dark Theme Flow:
```
Hero:              from-zinc-950 to-zinc-900 (bottom: #18181B)
Trust:             from-zinc-900 to-zinc-950 (top: #18181B, bottom: #09090B)
Features:          from-zinc-950 to-zinc-900 (top: #09090B, bottom: #18181B)
ScreenshotGallery: bg-zinc-900 (solid #18181B) ← SEAMLESS with Features!
Pricing:           from-zinc-900 to-zinc-950 (top: #18181B, bottom: #09090B) ← SEAMLESS with Gallery!
Testimonials:      bg-zinc-950
CTA:               Purple gradient
Footer:            from-zinc-950 to-black
```

### Implementation:
```tsx
// Hero section
className="bg-gradient-to-br from-slate-100 to-white dark:from-zinc-950 dark:to-zinc-900"

// Trust section
className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950"

// Features section
className="bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900"

// ScreenshotGallery section - SOLID background for seamless transitions!
className="bg-white dark:bg-zinc-900"
// CircularGallery backgroundColor must match exactly:
backgroundColor={isDark ? '#18181B' : '#FFFFFF'}

// Pricing section
className="bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950"

// Footer
className="bg-gradient-to-b from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black"
```

### HomePage Wrapper
```tsx
// HomePage wrapper ensures no gaps show through
className="overflow-x-hidden bg-white dark:bg-zinc-950"
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

Mockup u hero sekciji je skaliran da bude veći na mobilnim uređajima, sa `max-w-7xl` da spreči zoom glitch:

```tsx
<img
  src="/images/hero/hero-light.avif"
  alt="BookBed Dashboard"
  className="relative w-[120%] sm:w-[110%] md:w-[105%] lg:w-full max-w-7xl mx-auto h-auto block dark:hidden"
  loading="eager"
  fetchPriority="high"
  decoding="async"
/>
<img
  src="/images/hero/hero-dark.avif"
  alt="BookBed Dashboard"
  className="relative w-[120%] sm:w-[110%] md:w-[105%] lg:w-full max-w-7xl mx-auto h-auto hidden dark:block"
  loading="eager"
  fetchPriority="high"
  decoding="async"
/>
```

**Breakpoints:**
- **Mobile**: 120% širine (veći mockup za bolji prikaz)
- **Tablet (sm)**: 110% širine
- **Medium (md)**: 105% širine
- **Desktop (lg+)**: 100% širine
- **Max Width**: `max-w-7xl` - sprječava zoom glitch

**Image Loading:**
- `loading="eager"` - Kritične slike se učitavaju odmah
- `fetchPriority="high"` - Prioritet učitavanja
- `decoding="async"` - Async dekodiranje

**Floating Cards:**
- Vidljive na mobile ali manje (`w-28 sm:w-36`)
- Desktop varijante (`hidden lg:block`) - pune veličine
- Bez animacija - samo static display sa `animate-float` CSS

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
  scrollSpeed={scrollSpeed}   // Adaptive: 1.5 (mobile), 1.0 (tablet), 0.5 (desktop)
  scrollEase={0.15}           // Smoothness of scroll
/>
```

**Adaptive Scroll Speed:**
```tsx
useEffect(() => {
  const calculateScrollSpeed = () => {
    const width = window.innerWidth
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (width <= 768 || isTouchDevice) setScrollSpeed(1.5)       // Mobile/touch - fast
    else if (width > 768 && width <= 1024) setScrollSpeed(1.0)   // Tablet - medium
    else setScrollSpeed(0.5)                                      // Desktop - slow
  }
  // ...
}, [])
```

**Container Heights (Responsive):**
```tsx
<div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px]">
```

### CircularGallery Mobile Scroll Behavior

**IMPORTANT:** Page scroll listener je **ISKLJUČEN** na mobile uređajima da se spriječi konflikt između vertikalnog page scroll-a i horizontalnog gallery scroll-a.

**Lokacija:** `src/components/ui/CircularGallery.tsx` (linije 697-701, 716-719)

**Razlog:** Originalni paket je imao funkcionalnost gdje vertikalni scroll stranice automatski rotira galeriju kao "parallax efekat". Ovo je uzrokovalo "fighting" osjećaj i konfuziju kod korisnika.

**Rješenje:**
```tsx
// DISABLED: Page scroll listener caused "fighting" feeling on mobile
// Gallery now ONLY rotates on direct swipe, not on page scroll
// if (this.isTouchDevice) {
//   window.addEventListener('scroll', this.boundOnPageScroll, { passive: true });
// }
```

**Rezultat:**
- ✅ **Desktop**: Mouse wheel rotira galeriju
- ✅ **Mobile**: Gallery se rotira SAMO kada direktno swipe-uješ na njoj
- ✅ **Mobile**: Vertikalni page scroll NE rotira galeriju automatski
- ✅ Nema više "baguje" efekta tokom scroll-anja

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

## Performance Optimizations

### Lazy Loading Strategy

**HomePage** koristi React `lazy()` i `Suspense` za optimizovano učitavanje:

```tsx
import { lazy, Suspense } from 'react'
import HeroSection from '../components/HeroSection'

// Lazy load below-the-fold sections
const TrustSection = lazy(() => import('../components/TrustSection'))
const FeaturesSection = lazy(() => import('../components/FeaturesSection'))
const ScreenshotGallery = lazy(() => import('../components/ScreenshotGallery'))
const PricingSection = lazy(() => import('../components/PricingSection'))
const FinalCTASection = lazy(() => import('../components/FinalCTASection'))

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-white dark:bg-zinc-950">
      {/* Hero loads immediately - above the fold */}
      <HeroSection />

      {/* Below-the-fold sections load lazily */}
      <Suspense fallback={<SectionFallback />}>
        <TrustSection />
      </Suspense>
      {/* ... */}
    </div>
  )
}
```

**Prednosti:**
- Hero section se učitava odmah (critical content)
- Ostale sekcije se učitavaju on-demand (code splitting)
- Minimal loading fallback (spinner)
- Brže initial page load

### Vite Build Configuration

**Lokacija:** `vite.config.ts`

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
          'animation-vendor': ['framer-motion', 'gsap'],
        },
      },
    },
    minify: 'esbuild',           // Brži od terser
    chunkSizeWarningLimit: 1000,
    sourcemap: false,            // Manji production build
  },
})
```

**Vendor Chunks:**
- `react-vendor` - React core libraries
- `i18n-vendor` - Translations
- `animation-vendor` - Animation libraries (heavy)

### Image Optimization

**Critical Images (Above-the-fold):**
```tsx
<img
  loading="eager"          // Load immediately
  fetchPriority="high"     // Browser prioritizes this
  decoding="async"         // Async decode
/>
```

**Non-critical Images:**
```tsx
<img
  loading="lazy"           // Load when visible
  decoding="async"
/>
```

**Format:** Koristi AVIF (better compression od WebP/PNG)

---

## Bug Fixes i Known Issues

### GridScan Animation Disappearing Bug (FIXED)

**Problem:** GridScan WebGL animacija je nestajala nakon klikanja po Hero sekciji, ostavljajući siv background.

**Uzrok:**
1. Component remount bez provjere postojećeg renderera
2. Errori u animation loop zaustavljaju animaciju
3. Cleanup bez safe guard-a

**Rješenje:** `src/components/ui/backgrounds/GridScan.tsx`

```tsx
useEffect(() => {
  // Prevent duplicate canvas elements
  if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
    return  // Skip if already rendered
  }

  // Animation loop with error handling
  const tick = () => {
    try {
      // ... animation code
    } catch (error) {
      console.error('GridScan animation error:', error)
      // Continue animation even if error occurs
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  return () => {
    // Safe cleanup - check if objects exist
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (material) material.dispose()
    if (quad && quad.geometry) quad.geometry.dispose()
    if (composerRef.current) {
      composerRef.current.dispose()
      composerRef.current = null
    }
    if (renderer) {
      renderer.dispose()
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
    rendererRef.current = null
    materialRef.current = null
  }
}, [/* dependencies */])
```

**Rezultat:**
- ✅ Animacija se ne duplicira na re-render
- ✅ Errori ne zaustavljaju animation loop
- ✅ Safe cleanup bez crash-a

### Header Logo Size

**Problem:** Logo je bio prevelik i neuravnotežen sa header elementima.

**Rješenje:**
```tsx
<Link to="/" className="inline-flex items-center gap-1.5 sm:gap-2 group">
  <LogoIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
  <span className="text-xs sm:text-sm lg:text-base font-bold text-text-primary dark:text-white">
    BookBed
  </span>
</Link>
```

**Veličine:**
- Mobile: icon 20px (w-5 h-5), text 12px (text-xs), gap 6px
- Tablet: icon 24px (w-6 h-6), text 14px (text-sm), gap 8px
- Desktop: icon 28px (w-7 h-7), text 16px (text-base), gap 8px

### CTA Section Bubbles on Mobile

**Problem:** Decorative bubbles izgledaju loše na mobilnim ekranima.

**Rješenje:**
```tsx
<div className="absolute inset-0 opacity-30 hidden lg:block">
  {/* Bubbles only on desktop */}
</div>
```

**Rezultat:** Bubbles vidljivi samo na lg+ breakpointu (≥1024px)

---

**Last Updated:** 2025-12-26
