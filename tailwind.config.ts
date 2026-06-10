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
        rood: {
          DEFAULT: '#BD0A0A',
          diep: '#8c0707',
        },
        geel: {
          DEFAULT: '#FFC61A',
          diep: '#c79611',
        },
        zand: {
          DEFAULT: '#F6EBD9',
          donker: '#E9DCC6',
        },
        inkt: {
          DEFAULT: '#1c1408',
          zacht: '#4a3d2a',
        },
        wit: '#FFFDF7',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-raleway)', 'sans-serif'],
      },
      boxShadow: {
        'btn-rood': '0 8px 0 #8c0707',
        'btn-rood-hover': '0 12px 0 #8c0707',
        'btn-rood-active': '0 4px 0 #8c0707',
        'btn-geel': '0 8px 0 #c79611',
        'btn-geel-hover': '0 12px 0 #c79611',
        'btn-geel-active': '0 4px 0 #c79611',
        card: '12px 16px 0 rgba(28,20,8,0.16)',
        'card-lg': '14px 18px 0 rgba(28,20,8,0.2)',
      },
    },
  },
  plugins: [],
}
export default config
