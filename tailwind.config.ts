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
          glow: '#FF3B30',
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
        nacht: {
          DEFAULT: '#0b0805',
          surface: '#15110a',
          edge: '#221a0f',
        },
        // ── Semantic design tokens (landing) ──────────────────────────────
        primary: { DEFAULT: '#BD0A0A', dark: '#8c0707', tint: '#FBE7E3' },
        accent: { DEFAULT: '#FFC61A', dark: '#c79611', tint: '#FFF3D1' },
        neutral: {
          0: '#FFFDF7',
          50: '#FAF4E8',
          100: '#F6EBD9',
          200: '#E9DCC6',
          300: '#DCC9AA',
          700: '#4A3D2A',
          900: '#1C1408',
        },
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        micro: ['0.8125rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.65' }],
        lead: ['1.1875rem', { lineHeight: '1.6' }],
        h3: ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.04' }],
        h2: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '0.96' }],
        h1: ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '0.92' }],
        hero: ['clamp(3.5rem, 9.5vw, 8rem)', { lineHeight: '0.84' }],
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-raleway)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        spotlight: 'spotlight 2.4s ease 0.6s 1 forwards',
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
        warm: '0 2px 8px -2px rgba(28,20,8,0.12)',
        'warm-md': '0 12px 28px -12px rgba(28,20,8,0.28)',
        'warm-lg': '0 30px 60px -24px rgba(28,20,8,0.34)',
      },
    },
  },
  plugins: [],
}
export default config
