# BookBed Website - Implementacijski Plan

**Kreiran:** 2025-12-20
**Status:** Spreman za implementaciju

---

## Finalni Dizajn Odluke

| Pitanje | Odluka |
|---------|--------|
| Hero Style | **A - Centered Mockup** (TravelPerk style, responsive-friendly) |
| Background | **B - Subtle Gradient** + animated (ReactBits) za premium feel |
| Cards | **B - Elevated sa Shadow** (SaaS standard) |
| Typography | **Inter** (SaaS industry standard, clean, readable) |
| Animations | **B - Moderate** (fade-in on scroll, hover efekti) |
| Color Accent | **B - Purple + Coral** (kao u planu) |
| Navigation | **B - Centered** sa hamburger na mobile |
| CTA Buttons | **B - Gradient** (purple gradient) |
| Footer | **A - Minimal** |
| Mobile | **B - Mobile-first** |

---

## Design System

### Boje (iz BookBed Owner Dashboard)
```typescript
// PRIMARY - Purple
primary: '#6B4CE6'      // Main actions
primaryDark: '#5B3DD6'  // Hover states
primaryLight: '#9B86F3' // Light accents

// SECONDARY - Coral
secondary: '#FF6B6B'    // CTAs, accents
secondaryDark: '#E63946'

// BACKGROUNDS
bgLight: '#FFFFFF'
bgSubtle: '#F7FAFC'
bgDark: '#000000'       // Dark mode
bgDarkElevated: '#121212'

// TEXT
textPrimary: '#2D3748'
textSecondary: '#4A5568'
textDark: '#E2E8F0'     // Dark mode

// SHADOWS
shadowLight: '0 4px 6px rgba(0, 0, 0, 0.1)'
shadowPurple: '0 4px 14px rgba(107, 76, 230, 0.2)'
```

### Typography
```typescript
// Font: Inter (Google Fonts)
fontFamily: 'Inter, system-ui, sans-serif'

// Sizes
h1: '64px' // Hero
h2: '48px' // Section titles
h3: '32px' // Subsections
body: '18px'
small: '14px'
```

---

## Stranice (4 stranice)

### 1. `/` - Home (Landing Page)
**Sekcije:**
1. Hero Section (centered mockup + floating cards)
2. Trust Section (partner logos: Stripe, Firebase, iCal)
3. Features Section (6 feature cards)
4. Screenshots Gallery (dashboard screenshots)
5. Final CTA Section

### 2. `/demo` - Video Demo
**Layout:** Alternating text/video (zig-zag)
- Video 1: Widget booking flow
- Video 2: Property/Unit kreiranje
- Video 3: Booking management (approve/reject/cancel)
- Video 4: iCal sync & Stripe setup

### 3. `/widget` - Live Widget Demo
**Sadrzaj:**
- 3 iframe-a za 3 widget moda
- Objasnjenje svakog moda
- Embed code preview

### 4. `/contact` - Kontakt
**Sadrzaj:**
- Kontakt forma
- Email: dusko@bookbed.io

---

## Tech Stack

### Postojece (iz trenutnog projekta)
- [x] React + Vite + TypeScript
- [x] Tailwind CSS
- [x] React Router DOM
- [x] Dark/Light mode toggle

### Za dodati
- [ ] react-i18next (EN/BS)
- [ ] Framer Motion
- [ ] react-youtube (za video embed)

### Packages za instalirati
```bash
npm install framer-motion react-i18next i18next react-youtube
```

---

## Feature Content (iz BookBed projekta)

### Key Features (za Features Section)
1. **Smart Calendar**
   - Month/Year view sa turnover detection
   - Real-time sync across devices

2. **Stripe Payments**
   - Secure checkout integration
   - Automatic payment tracking
   - Refund management

3. **Automated Emails**
   - Booking confirmations
   - Check-in reminders (7 dana prije)
   - Payment reminders

4. **Embeddable Widget**
   - 3 moda: Full booking, Calendar-only, Inquiry
   - Custom subdomain support
   - Light/Dark theme

5. **Booking Analytics**
   - Revenue tracking
   - Occupancy rates
   - Seasonal insights

6. **iCal Sync**
   - Two-way sync sa Airbnb, Booking.com
   - Automatic overbooking detection
   - Conflict warnings

### Widget Modovi (za /widget page)
1. **Full Booking Mode** - Complete payment flow
2. **Calendar Only Mode** - Availability display
3. **Inquiry Mode** - Contact form without payment

### Tech Stack Logos (za Trust Section)
- Flutter (Web/Mobile)
- Firebase (Backend)
- Stripe (Payments)
- Resend (Emails)
- iCal (Calendar sync)

---

## Folder Struktura (finalna)

```
bookbed-website/
├── public/
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── bs/translation.json
│   ├── mockup-light.avif
│   ├── mockup-dark.avif
│   └── screenshots/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ScreenshotsGallery.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── demo/
│   │   │   └── VideoSection.tsx
│   │   ├── widget/
│   │   │   └── WidgetDemo.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ThemeToggle.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── DemoPage.tsx
│   │   ├── WidgetPage.tsx
│   │   └── ContactPage.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── config/
│   │   ├── i18n.ts
│   │   └── colors.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── package.json
├── IMPLEMENTATION_PLAN.md
└── CLAUDE.md
```

---

## Implementacijski Koraci (po redu)

### FAZA 1: Setup i Ciscenje (30 min)
- [ ] Ocistiti debug kod iz svih fajlova
- [ ] Instalirati nove dependencies (framer-motion, react-i18next, react-youtube)
- [ ] Setup i18n (kopirati pattern iz portfolia)
- [ ] Kreirati translation fajlove (EN/BS)
- [ ] Setup GitHub repository
- [ ] Kreirati CLAUDE.md

### FAZA 2: Design System (1 sat)
- [ ] Update tailwind.config.js sa finalnim bojama
- [ ] Kreirati UI komponente (Button, Card, ThemeToggle)
- [ ] Setup Inter font
- [ ] Kreirati color config fajl
- [ ] Dodati animated background (ReactBits)

### FAZA 3: Layout Components (1 sat)
- [ ] Refaktorisati Header (centered nav, mobile hamburger)
- [ ] Kreirati MobileMenu component
- [ ] Kreirati Footer (minimal)
- [ ] Dodati Framer Motion animacije

### FAZA 4: Home Page (2 sata)
- [ ] HeroSection - centered mockup, light/dark auto-switch
- [ ] TrustSection - partner logos
- [ ] FeaturesSection - 6 feature cards
- [ ] ScreenshotsGallery - dashboard screenshots
- [ ] FinalCTA - gradient CTA

### FAZA 5: Demo Page (1 sat)
- [ ] VideoSection component sa react-youtube
- [ ] Zig-zag layout (text/video alternating)
- [ ] 4 video sekcije sa opisima

### FAZA 6: Widget Page (1 sat)
- [ ] WidgetDemo component
- [ ] 3 iframe-a za 3 moda
- [ ] Mode descriptions
- [ ] Embed code preview

### FAZA 7: Contact Page (30 min)
- [ ] Kontakt forma
- [ ] Email integration (Resend ili mailto)

### FAZA 8: Polish & Deploy (1 sat)
- [ ] Responsive testing
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Deploy na bookbed.io
- [ ] Setup Cloudflare DNS

---

## Content za i18n (EN/BS)

### Hero
```json
{
  "hero": {
    "title": {
      "en": "Manage All Your Bookings in One Place",
      "bs": "Upravljajte Svim Rezervacijama na Jednom Mjestu"
    },
    "subtitle": {
      "en": "The complete booking management platform for vacation rental owners",
      "bs": "Kompletna platforma za upravljanje rezervacijama za vlasnike smjestaja"
    },
    "cta": {
      "en": "Get Started Free",
      "bs": "Zapocnite Besplatno"
    }
  }
}
```

### Features
```json
{
  "features": {
    "calendar": {
      "title": { "en": "Smart Calendar", "bs": "Pametni Kalendar" },
      "desc": { "en": "Month/Year view with turnover detection", "bs": "Mjesecni/Godisnji prikaz sa detekcijom turnover-a" }
    },
    "payments": {
      "title": { "en": "Stripe Payments", "bs": "Stripe Placanja" },
      "desc": { "en": "Secure checkout with automatic tracking", "bs": "Sigurno placanje sa automatskim pracenjem" }
    },
    "emails": {
      "title": { "en": "Automated Emails", "bs": "Automatski Emailovi" },
      "desc": { "en": "Confirmations, reminders, notifications", "bs": "Potvrde, podsjetnici, obavijesti" }
    },
    "widget": {
      "title": { "en": "Embeddable Widget", "bs": "Widget za Ugradnju" },
      "desc": { "en": "3 modes, custom domains, light/dark theme", "bs": "3 moda, custom domene, light/dark tema" }
    },
    "analytics": {
      "title": { "en": "Booking Analytics", "bs": "Analitika Rezervacija" },
      "desc": { "en": "Revenue tracking, occupancy rates", "bs": "Pracenje prihoda, stope popunjenosti" }
    },
    "ical": {
      "title": { "en": "iCal Sync", "bs": "iCal Sinkronizacija" },
      "desc": { "en": "Two-way sync with Airbnb, Booking.com", "bs": "Dvosmjerna sinkronizacija sa Airbnb, Booking.com" }
    }
  }
}
```

### Navigation
```json
{
  "nav": {
    "home": { "en": "Home", "bs": "Pocetna" },
    "demo": { "en": "Demo", "bs": "Demo" },
    "widget": { "en": "Widget", "bs": "Widget" },
    "contact": { "en": "Contact", "bs": "Kontakt" }
  }
}
```

---

## Deployment

### Domain Setup
- **bookbed.io** - Marketing website (ovaj projekat)
- **app.bookbed.io** - Owner Dashboard (Flutter)
- **view.bookbed.io** - Booking Widget (Flutter)

### Hosting: Netlify (preporuceno)
```bash
# Build command
npm run build

# Publish directory
dist
```

### DNS (Cloudflare)
```
A     bookbed.io       → Netlify IP
CNAME www.bookbed.io   → bookbed.io
```

---

## Procjena Vremena

| Faza | Vrijeme |
|------|---------|
| Setup & Ciscenje | 30 min |
| Design System | 1 sat |
| Layout | 1 sat |
| Home Page | 2 sata |
| Demo Page | 1 sat |
| Widget Page | 1 sat |
| Contact Page | 30 min |
| Polish & Deploy | 1 sat |
| **UKUPNO** | **~8 sati** |

---

## Mockup Slike

### Hero Mockup (automatski switch light/dark)
- `mockup-light.avif` - Za light mode
- `mockup-dark.avif` - Za dark mode
- Iste slike kao na duskolicanin.com Featured Project

### Screenshots (za galeriju)
Potrebno napraviti/dodati:
- Dashboard overview
- Calendar timeline
- Booking details
- Widget preview

---

## Video Content (za /demo page)

### Video 1: Widget Booking Flow
- Gost otvara widget
- Bira datume
- Unosi podatke
- Stripe checkout
- Confirmation screen

### Video 2: Property/Unit Setup
- Kreiranje property-a
- Dodavanje unit-a
- Postavljanje cijena
- Publish wizard

### Video 3: Booking Management
- Pregled rezervacija
- Odobravanje pending zahtjeva
- Otkazivanje rezervacije
- Timeline kalendar

### Video 4: Integrations
- iCal sync setup
- Stripe Connect
- Custom subdomain
- Widget embedding

---

## Notes

- Sav debug kod iz trenutnog projekta MORA biti ociscen prije implementacije
- Mockup slike se automatski mijenjaju sa theme-om
- Website podrzava EN i BS jezik
- Mobile hamburger menu za navigaciju na malim ekranima
- Animated background iz ReactBits za premium feel

---

**Last Updated:** 2025-12-20
