/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mono: ['JetBrains Mono'],
    },
    extend: {
      colors: {
        'gray-light': '#F5F5F5',
        'gray-dark': '#ACACAC',
        'gray-black': '#000000',
      },
    },
  },
  plugins: [],
}
