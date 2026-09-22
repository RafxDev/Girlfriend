/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0d1812',
          900: '#14251c',
          800: '#1c3629',
          700: '#254937',
          600: '#35634b',
        },
        wood: {
          900: '#23140b',
          800: '#362114',
          700: '#4d301e',
          600: '#6d452b',
        },
        amberGold: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        parchment: {
          50: '#fdfbf7',
          100: '#f9f4ea',
          200: '#f2e8d3',
          300: '#e6d6b6',
          400: '#cca979',
          800: '#543f2d',
          900: '#38281b',
        },
        tangerine: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      fontFamily: {
        serif: ['"Crimson Pro"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Cinzel"', 'serif'],
        handwriting: ['"Patrick Hand"', '"Caveat"', 'cursive'],
        body: ['"Lora"', 'Georgia', 'serif']
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'quack-wiggle': 'wiggle 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg) scale(1.05)' },
          '75%': { transform: 'rotate(8deg) scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
