/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strict black, white, grayscale palette
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          900: '#1A1A1A', // Deep charcoal for cards/sections
          800: '#2A2A2A', // Medium charcoal for secondary elements
          700: '#333333', // Dark gray for borders
          600: '#4A4A4A', // Medium gray for muted text
          500: '#666666', // Mid gray for secondary text
          400: '#999999', // Light gray for subtle elements
          300: '#CCCCCC', // Light gray for accents
          200: '#E5E5E5', // Very light gray for highlights
          100: '#F5F5F5', // Off-white for special cases
        },
        // Remove bright accent colors - focus on grayscale
        accent: {
          primary: '#FFFFFF', // White for primary actions
          secondary: '#CCCCCC', // Light gray for secondary
          danger: '#666666', // Dark gray for warnings/errors
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Large, heavy typography
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      spacing: {
        // Strong spacing for impact
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        // Remove glitch - focus on clean, strong animations
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        // Strong, minimal shadows
        'strong': '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        'subtle': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'inner-strong': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
