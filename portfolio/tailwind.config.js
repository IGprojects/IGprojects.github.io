/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter Tight', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00f3ff',
          magenta: '#ff00ff',
          blue: '#1f51ff',
          purple: '#bc13fe',
          green: '#39ff14'
        },
        dark: {
          bg: '#0a0a0c',
          card: '#121216',
          border: '#1f1f2e'
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 5px theme("colors.neon.cyan"), 0 0 20px theme("colors.neon.cyan")',
        'neon-magenta': '0 0 5px theme("colors.neon.magenta"), 0 0 20px theme("colors.neon.magenta")',
        'neon-blue': '0 0 5px theme("colors.neon.blue"), 0 0 20px theme("colors.neon.blue")',
        'neon-purple': '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
      },
      keyframes: {
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1.2) blur(1px)' },
          '50%': { opacity: '0.6', filter: 'brightness(0.8) blur(2px)' },
        }
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse-slow': 'spin-reverse 60s linear infinite',
        'spin-medium': 'spin 40s linear infinite',
        'spin-reverse-medium': 'spin-reverse 40s linear infinite',
        'glow-slow': 'glow-pulse 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}