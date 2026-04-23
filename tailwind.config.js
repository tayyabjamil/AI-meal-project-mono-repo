/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        'primary-dark': '#16a34a',
        'primary-light': '#dcfce7',
        accent: '#f97316',
        'accent-light': '#fff7ed',
        surface: '#f8fafc',
        muted: '#94a3b8',
      },
    },
  },
  plugins: [],
};
