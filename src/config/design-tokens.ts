/**
 * BookBed Design Tokens
 * Centralized design system configuration
 */

// Spacing Scale (in pixels, applied as Tailwind classes)
export const spacing = {
  // Base unit: 4px
  0: '0',
  1: '4px',    // 0.25rem
  2: '8px',    // 0.5rem
  3: '12px',   // 0.75rem
  4: '16px',   // 1rem
  6: '24px',   // 1.5rem
  8: '32px',   // 2rem
  12: '48px',  // 3rem
  16: '64px',  // 4rem
  20: '80px',  // 5rem
  24: '96px',  // 6rem
  32: '128px', // 8rem
} as const

// Typography Scale
export const typography = {
  // Headings
  h1: {
    mobile: 'text-4xl',      // 36px
    tablet: 'sm:text-5xl',   // 48px
    desktop: 'md:text-6xl',  // 60px
  },
  h2: {
    mobile: 'text-3xl',      // 30px
    tablet: 'sm:text-4xl',   // 36px
    desktop: 'md:text-5xl',  // 48px
  },
  h3: {
    mobile: 'text-2xl',      // 24px
    tablet: 'sm:text-3xl',   // 30px
    desktop: 'md:text-4xl',  // 36px
  },
  h4: {
    mobile: 'text-xl',       // 20px
    tablet: 'sm:text-2xl',   // 24px
  },
  // Body text
  body: {
    mobile: 'text-base',     // 16px
    tablet: 'sm:text-lg',    // 18px
    desktop: 'lg:text-xl',   // 20px
  },
  bodySmall: {
    mobile: 'text-sm',       // 14px
    tablet: 'sm:text-base',  // 16px
  },
  small: 'text-sm',          // 14px
  tiny: 'text-xs',           // 12px
} as const

// Section Spacing (consistent vertical padding)
export const sectionSpacing = {
  sm: 'py-12 sm:py-16',           // Compact sections
  md: 'py-16 sm:py-20 lg:py-24',  // Standard sections
  lg: 'py-20 sm:py-24 lg:py-32',  // Large hero sections
} as const

// Container Configuration
export const container = {
  padding: 'px-4 sm:px-6 lg:px-8',
  maxWidth: {
    sm: 'max-w-2xl',     // 672px - Small content
    md: 'max-w-4xl',     // 896px - Medium content
    lg: 'max-w-5xl',     // 1024px - Large content
    xl: 'max-w-6xl',     // 1152px - Extra large
    full: 'max-w-7xl',   // 1280px - Full width sections
  },
} as const

// Border Radius Scale
export const borderRadius = {
  sm: 'rounded-lg',      // 8px
  md: 'rounded-xl',      // 12px
  lg: 'rounded-2xl',     // 16px
  xl: 'rounded-3xl',     // 24px
  full: 'rounded-full',  // 9999px
} as const

// Shadow Scale
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  purple: 'shadow-purple',
  purpleDark: 'shadow-purple-dark',
} as const

// Animation Durations
export const transitions = {
  fast: 'duration-150',
  normal: 'duration-200',
  slow: 'duration-300',
  verySlow: 'duration-500',
} as const

// Z-Index Scale
export const zIndex = {
  dropdown: 'z-10',
  sticky: 'z-20',
  fixed: 'z-30',
  modal: 'z-40',
  popover: 'z-50',
  tooltip: 'z-[60]',
} as const

// Utility class combinations for common patterns
export const patterns = {
  // Section backgrounds
  sectionBg: {
    light: 'bg-gradient-to-br from-gray-50 to-white dark:from-black dark:to-zinc-900',
    white: 'bg-white dark:bg-black',
    subtle: 'bg-gray-50 dark:bg-zinc-900',
  },
  // Card styles
  card: {
    base: 'bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-2xl',
    hover: 'hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all',
    elevated: 'bg-white dark:bg-zinc-800 shadow-lg border border-gray-100 dark:border-zinc-700 rounded-2xl',
  },
  // Button styles
  button: {
    primary: 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl shadow-purple hover:shadow-purple-dark transition-all',
    secondary: 'bg-white dark:bg-zinc-800 text-primary dark:text-primary-light border border-gray-200 dark:border-zinc-700 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all',
    ghost: 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white transition-colors',
  },
  // Text colors
  text: {
    heading: 'text-text-primary dark:text-white',
    body: 'text-text-secondary dark:text-gray-400',
    muted: 'text-text-tertiary dark:text-gray-500',
  },
  // Dot pattern overlay
  dotPattern: `absolute inset-0 opacity-[0.02] dark:opacity-[0.05]`,
  dotPatternStyle: {
    backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
    backgroundSize: '32px 32px',
  },
} as const

// Responsive breakpoints (for reference)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
