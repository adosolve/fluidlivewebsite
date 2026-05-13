/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'titillium': ['"Titillium Web"', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'sans': ['"Titillium Web"', 'Raleway', 'Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Deep Space Navy / Black
        'space': {
          950: '#0B0F19',
          900: '#0F1419',
          800: '#1A1F2E',
        },
        // Electric Blue (Intelligence)
        'electric': {
          400: '#60A5FA',
          500: '#4F8CFF',
          600: '#3B82F6',
        },
        // Soft Gold / Amber (Art)
        'gold': {
          400: '#FCD34D',
          500: '#FBBF24',
          600: '#F59E0B',
        },
        // Muted Slate for text
        'slate-muted': {
          400: '#94A3B8',
          500: '#8B9BBA',
        },
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'wide-plus': '0.1em',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { 
            'text-shadow': '0 0 20px rgba(79, 140, 255, 0.5), 0 0 30px rgba(79, 140, 255, 0.3)',
          },
          '100%': { 
            'text-shadow': '0 0 30px rgba(79, 140, 255, 0.8), 0 0 40px rgba(79, 140, 255, 0.5)',
          },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
