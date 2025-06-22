/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ef',
          100: '#deeedd',
          200: '#bfddbe',
          300: '#94c393',
          400: '#6ba369',
          500: '#4d8449',
          600: '#3c6838',
          700: '#2f522b',
          800: '#274125',
          900: '#223721',
        },
        secondary: {
          50: '#fefef6',
          100: '#fcfbef',
          200: '#f9f4e8',
          300: '#f4ebdb',
          400: '#edd9c0',
          500: '#e4c29f',
          600: '#d7a678',
          700: '#c8885a',
          800: '#b56f48',
          900: '#935a3d',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};