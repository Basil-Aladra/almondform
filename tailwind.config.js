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
          50:  '#e6f7f2',
          100: '#b3e8d9',
          200: '#80d9c0',
          300: '#4dcaa7',
          400: '#26bf94',
          500: '#009F79',
          600: '#008e6c',
          700: '#007a5d',
          800: '#00664e',
          900: '#004d3a',
          950: '#003328',
        },
        cream: {
          50:  '#FFFDF8',
          100: '#FFF9ED',
          200: '#FFF3DB',
          300: '#FFECC5',
          400: '#FFE0A3',
          500: '#F5D5A0',
        },
        gold: {
          300: '#F0D48B',
          400: '#D4A843',
          500: '#C49A3C',
          600: '#A67C2E',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'toast-in': 'toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateX(-50%) translateY(0) scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'almond-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23009F79' fill-opacity='0.04'%3E%3Cpath d='M30 5c4 0 7 8 7 15s-3 15-7 15-7-8-7-15 3-15 7-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'card': '0 4px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 8px 60px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'input-focus': '0 0 0 4px rgba(0, 159, 121, 0.1)',
        'btn': '0 4px 14px rgba(0, 159, 121, 0.35)',
        'btn-hover': '0 6px 20px rgba(0, 159, 121, 0.45)',
      },
    },
  },
  plugins: [],
}
