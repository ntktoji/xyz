/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B1F3A',
        secondary: '#1D4ED8',
        accent: '#F59E0B',
        bg: '#05070B',
      },
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      keyframes: {
        drift: { '0%,100%': { transform: 'translate3d(0,0,0)' }, '50%': { transform: 'translate3d(2%,-2%,0)' } },
        shine: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
      },
      animation: { drift: 'drift 18s ease-in-out infinite', shine: 'shine 8s linear infinite' },
    },
  },
  plugins: [],
};
