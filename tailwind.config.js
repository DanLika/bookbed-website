/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'animate-slideInBottomLeft',
    'animate-slideInBottomRight',
    'animate-slideInBottom',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary Colors (Purple)
        primary: {
          DEFAULT: '#6B4CE6',
          dark: '#5B3DD6',
          light: '#9B86F3',
          hover: '#7B5CF6',
          disabled: 'rgba(155, 134, 243, 0.5)',
        },
        // Secondary Colors (Coral)
        secondary: {
          DEFAULT: '#FF6B6B',
          dark: '#E63946',
          light: '#FF8E8E',
          hover: '#FF7B7B',
          disabled: 'rgba(255, 142, 142, 0.5)',
        },
        // Tertiary Colors (Golden)
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
        // Surface Colors - Light Mode
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F5F5F5',
          hover: '#F9F9F9',
        },
        // Text Colors - Light Mode
        text: {
          primary: '#2D3748',
          secondary: '#4A5568',
          tertiary: '#718096',
          disabled: '#A0AEC0',
          inverse: '#FFFFFF',
        },
        // Border Colors - Light Mode
        border: {
          DEFAULT: '#E2E8F0',
          warm: '#E8E5DC',
          hover: '#CBD5E0',
          focus: '#6B4CE6',
          divider: '#F7FAFC',
          'section-divider': '#E0E0E8',
        },
        // State Colors (same for light/dark)
        state: {
          success: '#66BB6A',
          error: '#EC4899',
          warning: '#F59E0B',
          info: '#999999',
        },
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 15px rgba(0, 0, 0, 0.15)',
        'purple': '0 4px 14px rgba(107, 76, 230, 0.2)',
        'purple-dark': '0 4px 14px rgba(155, 134, 243, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideInBottomLeft': 'slideInBottomLeft 0.6s ease-out',
        'slideInBottomRight': 'slideInBottomRight 0.6s ease-out',
        'slideInBottom': 'slideInBottom 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInBottomLeft: {
          'from': { opacity: '0', transform: 'translate(-30px, 40px)' },
          'to': { opacity: '1', transform: 'translate(0, 0)' },
        },
        slideInBottomRight: {
          'from': { opacity: '0', transform: 'translate(30px, 40px)' },
          'to': { opacity: '1', transform: 'translate(0, 0)' },
        },
        slideInBottom: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}