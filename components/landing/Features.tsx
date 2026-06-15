'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'

const FEATURES = [
  {
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
    title: 'Lage prep, hoge marge',
    body: 'Ready-to-serve sauzen die je keuken minuten per bord besparen. Consistente smaak, elke service opnieuw.',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    title: 'Vandaag besteld, snel geleverd',
    body: 'Reken af met iDEAL of bestel op rekening. Geen minimumafname per fles — binnen 3 tot 5 werkdagen in huis.',
  },
  {
    icon: <path d="M20 7 9 18l-5-5" />,
    title: 'Factuur volledig automatisch',
    body: 'Na betaling staat de factuur direct in je mail en in je boekhouding. Geen papierwerk, geen gedoe.',
  },
]

export function Features() {
  const reduce = useReducedMotion()

  return (
    <section id="voordelen" className="relative">
      <div className="absolute inset-0 lp-grid opacity-40" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-pill text-rood">Waarom Nacholito</span>
          <h2 className="mt-4 font-geist font-semibold tracking-[-0.02em] text-[clamp(30px,4.5vw,52px)] leading-[1.02] text-inkt">
            Gemaakt voor <span className="lp-gradient-text">drukke keukens</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(feature => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative overflow-hidden rounded-3xl lp-glass lp-glass-hover p-7"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full lp-glow-red opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-inkt/10 bg-rood/10 text-rood">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                  {feature.icon}
                </svg>
              </span>
              <h3 className="relative mt-5 font-geist text-xl font-semibold text-inkt">{feature.title}</h3>
              <p className="relative mt-2 text-sm text-inkt-zacht leading-relaxed">{feature.body}</p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
