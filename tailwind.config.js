/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#FBF2E0',
        secondary: '#FF774C',
        tertiary: '#FFB7A0',
        poonblack: '#030211'
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse': 'spin 10s linear infinite reverse',
        'star': 'twinkle 2.5s infinite',
        'bounce-right': 'bouncer 1s infinite'
      },
      keyframes: {
        'twinkle': {  
            '0%, 20%, 50%, 80%, 100%': { opacity: 1 },
            '40%': { opacity: 0.5 },
            '60%': { opacity: 0.2 }
          },
          'bouncer' : {
            '0%, 100%' : {
              transform: 'translateX(15%)',
              'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
            },
            '50%' : {
              transform: 'translateX(0)',
              'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
            }
          }
      }
    },
    fontFamily: {
      fraunces: ['Fraunces', 'serif'],
      syne: ['Syne', 'sans-serif'],
      nunito: ['Nunito', 'sans-serif'],
    }
  },
  plugins: [],
}

