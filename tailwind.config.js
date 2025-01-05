/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: {
          DEFAULT: '#0A0B0F', // Dark background inspired by both Linear and WoW UI
          secondary: '#12141C'
        },
        // WoW item quality colors
        item: {
          poor: '#9D9D9D',
          common: '#FFFFFF',
          uncommon: '#1EFF00',
          rare: '#0070DD',
          epic: '#A335EE',
          legendary: '#FF8000'
        },
        // UI accent colors
        primary: {
          DEFAULT: '#A335EE', // Epic purple as primary
          hover: '#B24EFF'
        },
        secondary: {
          DEFAULT: '#0070DD', // Rare blue as secondary
          hover: '#0085FF'
        },
        accent: {
          DEFAULT: '#FF8000', // Legendary orange as accent
          hover: '#FF9419'
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'], // Fantasy-style font for headings
        body: ['Inter var', 'sans-serif'] // Modern font for body text
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      }
    }
  },
  plugins: [],
}