// Responsive typography system for BookBed
// Uses CSS clamp() for fluid auto-sizing that fits content naturally

export const typography = {
  // Hero title - fluid scaling with clamp()
  // min: 32px, preferred: 6vw, max: 72px
  // Large, impactful hero headline
  h1: 'text-[clamp(2rem,6vw,4.5rem)]',

  // Section titles - fluid scaling
  // min: 28px, preferred: 5vw, max: 56px
  h2: 'text-[clamp(1.75rem,5vw,3.5rem)]',

  // Subsection titles
  // min: 20px, preferred: 3vw, max: 32px
  h3: 'text-[clamp(1.25rem,3vw,2rem)]',

  // Hero subtitle - fluid scaling for max 2 lines
  // min: 16px, preferred: 2.5vw, max: 24px
  subtitle: 'text-[clamp(1rem,2.5vw,1.5rem)]',

  // Body text
  // min: 15px, preferred: 1.5vw, max: 18px
  body: 'text-[clamp(0.9375rem,1.5vw,1.125rem)]',
}

// Container widths - progressive scaling
export const containers = {
  // Hero container - wider on larger screens
  hero: 'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',

  // Standard section container
  section: 'max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl',
}
