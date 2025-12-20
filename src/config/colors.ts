/**
 * BookBed Color System
 * Adapted from TravelPerk design with Purple theme
 * Colors from plan.md
 */

export const colors = {
  // Primary Colors (Purple) - Light Mode
  primary: {
    DEFAULT: '#6B4CE6',
    dark: '#5B3DD6',
    light: '#9B86F3',
    hover: '#7B5CF6',
    disabled: 'rgba(155, 134, 243, 0.5)',
  },
  
  // Secondary Colors (Coral) - Light Mode
  secondary: {
    DEFAULT: '#FF6B6B',
    dark: '#E63946',
    light: '#FF8E8E',
    hover: '#FF7B7B',
    disabled: 'rgba(255, 142, 142, 0.5)',
  },
  
  // Tertiary Colors (Golden) - Light Mode
  tertiary: {
    DEFAULT: '#FFB84D',
    dark: '#FF9500',
    light: '#FFCA80',
    hover: '#FFC84D',
  },
  
  // Background Colors - Light Mode
  bg: {
    DEFAULT: '#FFFFFF',
    light: '#FAFAFA',
    elevated: '#F5F5F5',
    subtle: '#F7FAFC',
  },
  
  // Background Colors - Dark Mode
  bgDark: {
    DEFAULT: '#000000',
    light: '#121212',
    elevated: '#1E1E1E',
    subtle: '#1A1A1A',
  },
  
  // Surface Colors - Light Mode
  surface: {
    DEFAULT: '#FFFFFF',
    variant: '#F5F5F5',
    hover: '#F9F9F9',
  },
  
  // Surface Colors - Dark Mode
  surfaceDark: {
    DEFAULT: '#121212',
    variant: '#1E1E1E',
    hover: '#2A2A2A',
  },
  
  // Text Colors - Light Mode
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    tertiary: '#718096',
    disabled: '#A0AEC0',
    inverse: '#FFFFFF',
  },
  
  // Text Colors - Dark Mode
  textDark: {
    primary: '#E2E8F0',
    secondary: '#A0AEC0',
    tertiary: '#718096',
    disabled: '#4A5568',
    inverse: '#000000',
  },
  
  // Border Colors - Light Mode
  border: {
    DEFAULT: '#E2E8F0',
    warm: '#E8E5DC',
    hover: '#CBD5E0',
    focus: '#6B4CE6',
    divider: '#F7FAFC',
    sectionDivider: '#E0E0E8',
  },
  
  // Border Colors - Dark Mode
  borderDark: {
    DEFAULT: '#2D3748',
    warm: '#3A3A3A',
    hover: '#4A5568',
    focus: '#9B86F3',
    divider: '#1A1A1A',
    sectionDivider: '#2D3748',
  },
  
  // State Colors (same for light/dark)
  state: {
    success: '#66BB6A',
    error: '#EC4899',
    warning: '#F59E0B',
    info: '#999999',
  },
  
  // Shadow Colors - Light Mode
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    strong: 'rgba(0, 0, 0, 0.15)',
    purple: 'rgba(107, 76, 230, 0.2)',
  },
  
  // Shadow Colors - Dark Mode
  shadowDark: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    strong: 'rgba(0, 0, 0, 0.7)',
    purple: 'rgba(155, 134, 243, 0.3)',
  },
} as const

export type ColorSystem = typeof colors