const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        notoSans: ["Noto Sans KR", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  darkMode: 'class',
  plugins: []
}