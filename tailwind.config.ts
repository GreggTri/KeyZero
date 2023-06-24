import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondaryText: '#0b0a0a',
        background: '#e9e8e7',
        test: '#19171e',
        primary: '#4685ff',
        secondary: 'e1e0df',
        accent: '2f2e2d'
      }
    },
  },
  plugins: [],
} satisfies Config

