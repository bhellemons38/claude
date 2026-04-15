import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1628',
          light: '#132038',
          dark: '#060f1a',
        },
        gold: {
          DEFAULT: '#C9973A',
          light: '#d9ab58',
          dark: '#a87b2a',
        },
      },
    },
  },
  plugins: [],
}
export default config
