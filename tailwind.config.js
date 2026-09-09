/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sw: {
          black: '#0a0a0a',
          panel: '#151515',
          border: '#2a2a2a',
          yellow: '#ffe81f',
          red: '#e0242e',
          text: '#f5f5f5',
          muted: '#9a9a9a',
        },
      },
    },
  },
  plugins: [],
};
