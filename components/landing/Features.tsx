'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'

const FEATURES = [
  {
    icon: (
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    ),
    title: 'Lage prep, hoge marge',
    body: 'Ready-to-serve sauzen die je keuken minuten besparen per bord. Consistente smaak, elke service opnieuw.',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    title: 'Vandaag besteld, snel geleverd',
    body: 'Bestel met iDEAL of op rekening. Geen minimumafname per fles — binnen 3 tot 5 werkdagen in huis.',
  },
  {
    icon: (
      <>
        <path d="M20 7 9 18l-5-5" />
      </>
    ),
    title: 'Factuur volledig automatisch',
    body: 'Na je betaling staat de factuur direct in je mail en in je boekhouding. Geen papierwerk, geen gedoe.',
  },
]

export function Features() {
  const reduce = useReducedMotion()

  return (
    <section id="voordelen" className="bg-inkt text-zand">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="font-display text-sm tracking-[0.24em] uppercase text-geel block mb-3">
            Waarom Nacholito
          </span>
          <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">
            Gemaakt voor <span className="text-geel">drukke keukens</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map(feature => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="bg-zand text-inkt border-2 border-inkt rounded-[18px] p-7 shadow-card"
            >
              <span className="flex w-14 h-14 rounded-2xl bg-rood text-wit items-center justify-center mb-5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                  aria-hidden
                >
                  {feature.icon}
                </svg>
              </span>
              <h3 className="font-display uppercase text-2xl">{feature.title}</h3>
              <p className="mt-2 text-sm font-medium text-inkt-zacht">{feature.body}</p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
