/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            50: '#F0F4F8',
            100: '#D9E2EC',
            200: '#BCCCDC',
            300: '#9FB3C8',
            400: '#627D98',
            500: '#486581',
            600: '#334E68',
            700: '#243B53',
            800: '#102A43',
            900: '#0A2540',
            950: '#061626',
          },
          teal: {
            50: '#F0FDFA',
            100: '#CCFBF1',
            200: '#99F6E4',
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#14B8A6',
            600: '#0D9488',
            700: '#0F766E',
            800: '#115E59',
            900: '#134E4A',
          },
          sage: {
            50: '#F6F9F6',
            100: '#E7EFE7',
            200: '#D1E1D1',
            500: '#6A9955',
          },
          surface: '#FFFFFF',
          background: '#F8FAFC',
          lightBg: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(10, 37, 64, 0.06), 0 2px 6px -1px rgba(10, 37, 64, 0.03)',
        'card-hover': '0 12px 30px -4px rgba(10, 37, 64, 0.12), 0 4px 10px -2px rgba(10, 37, 64, 0.04)',
        'premium': '0 20px 40px -15px rgba(10, 37, 64, 0.08), 0 0 0 1px rgba(10, 37, 64, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
