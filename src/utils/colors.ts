// Centralized color tokens for use in JavaScript/TypeScript props
// These mirror the Tailwind config values in tailwind.config.js
// Use these instead of hard-coding hex values in component props

export const colors = {
  primary: {
    DEFAULT: '#6B4CE6',
    dark: '#5B3DD6',
    light: '#9B86F3',
    lighter: '#B8A6F5',
    hover: '#7B5CF6',
  },
  secondary: {
    DEFAULT: '#8B5CF6',
    dark: '#7C3AED',
    light: '#A78BFA',
  },
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    tertiary: '#718096',
    inverse: '#FFFFFF',
  },
  bg: {
    white: '#FFFFFF',
    dark: '#18181B',    // zinc-900
    darker: '#09090B',  // zinc-950
    darkest: '#0a0a0f', // hero dark overlay
  },
  border: {
    lightSubtle: 'rgba(0, 0, 0, 0.1)',
    lightMedium: 'rgba(0, 0, 0, 0.15)',
    darkSubtle: 'rgba(255, 255, 255, 0.1)',
    darkMedium: 'rgba(255, 255, 255, 0.15)',
  },
} as const

// Gradient presets for animation components (StarBorder, GradientText, etc.)
export const gradientColors = {
  primary: [
    colors.primary.DEFAULT,
    colors.primary.light,
    colors.primary.DEFAULT,
    colors.primary.light,
    colors.primary.DEFAULT,
  ] as string[],
}
