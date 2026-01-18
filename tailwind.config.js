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
          lighter: '#B8A6F5', // Higher contrast for dark mode (5.1:1 on zinc-900)
          hover: '#7B5CF6',
          disabled: 'rgba(155, 134, 243, 0.5)',
        },
        // Secondary Colors (Purple variant - for accents)
        secondary: {
          DEFAULT: '#8B5CF6',  // Violet-500
          dark: '#7C3AED',    // Violet-600
          light: '#A78BFA',   // Violet-400
          hover: '#9365F6',
          disabled: 'rgba(167, 139, 250, 0.5)',
        },
        // Success Colors (Emerald - for positive feedback)
        success: {
          DEFAULT: '#10B981', // Emerald-500
          dark: '#059669',    // Emerald-600
          light: '#34D399',   // Emerald-400
          hover: '#0D9668',
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
        'emerald': '0 4px 14px rgba(16, 185, 129, 0.25)',
        'emerald-dark': '0 4px 14px rgba(52, 211, 153, 0.35)',
        // Elevation scale for cards
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'elevation-3': '0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'elevation-4': '0 8px 16px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'page-enter': 'pageEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 3s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideInBottomLeft': 'slideInBottomLeft 0.6s ease-out',
        'slideInBottomRight': 'slideInBottomRight 0.6s ease-out',
        'slideInBottom': 'slideInBottom 0.6s ease-out',
        'gradient': 'gradient 8s linear infinite',
        'shine': 'shine 5s linear infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#4A5568',
            h1: {
              color: '#2D3748',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.3',
            },
            h2: {
              color: '#2D3748',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #E2E8F0',
            },
            h3: {
              color: '#2D3748',
              fontWeight: '600',
              fontSize: '1.25rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
              lineHeight: '1.75',
            },
            '.lead': {
              fontSize: '1.125rem',
              color: '#718096',
              lineHeight: '1.8',
              marginBottom: '2rem',
            },
            ul: {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            ol: {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'ul > li': {
              paddingLeft: '0.5rem',
            },
            'ol > li': {
              paddingLeft: '0.5rem',
            },
            a: {
              color: '#6B4CE6',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              backgroundColor: '#F7FAFC',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#6B4CE6',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1a1a2e',
              color: '#E2E8F0',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
            blockquote: {
              borderLeftColor: '#6B4CE6',
              borderLeftWidth: '4px',
              backgroundColor: '#F7FAFC',
              padding: '1rem 1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0',
              fontStyle: 'normal',
              color: '#4A5568',
            },
            strong: {
              color: '#2D3748',
              fontWeight: '600',
            },
          },
        },
        invert: {
          css: {
            color: '#A0AEC0',
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#FFFFFF',
              borderBottomColor: '#3f3f46',
            },
            h3: {
              color: '#FFFFFF',
            },
            '.lead': {
              color: '#A0AEC0',
            },
            a: {
              color: '#9B86F3',
            },
            strong: {
              color: '#FFFFFF',
            },
            code: {
              backgroundColor: '#27272a',
              color: '#9B86F3',
            },
            blockquote: {
              backgroundColor: '#27272a',
              color: '#A0AEC0',
            },
          },
        },
      },
      keyframes: {
        pageEnter: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
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
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shine: {
          '0%': { backgroundPosition: '100%' },
          '100%': { backgroundPosition: '-100%' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}