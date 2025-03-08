/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030712',
        secondary: '#111827',
        selected: '#1d2942'
      },
      hide: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'rotate-full': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transfrom: 'rotate(360deg)' }
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-in-out',
        'rotate-full': 'rotate-full 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}

