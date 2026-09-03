/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deli: {
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#072b16',
            brand: '#0D3823',
            deep: '#072014',
            accent: '#1D633E',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            brand: '#E59819',
            warm: '#F3A62B',
          },
          cream: {
            50: '#FAF8F5',
            100: '#F5EFEB',
            200: '#EDE4DC',
            300: '#E0D2C4',
            paper: '#FBF9F5',
          },
          dark: {
            card: '#122018',
            surface: '#0A140F',
            border: '#1E362A',
            hover: '#192E22',
          }
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(229, 152, 25, 0.4)',
        'deli-card': '0 10px 30px -10px rgba(7, 32, 20, 0.5)',
        'deli-lift': '0 20px 40px -15px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
