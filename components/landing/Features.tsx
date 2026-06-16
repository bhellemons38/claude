'use client'

import { motion } from 'framer-motion'
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
  return (
    <section id="voordelen" className="relative bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">Waarom Nacholito</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Gemaakt voor <span className="lp-mark">drukke keukens</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(feature => (
            <motion.article key={feature.title} variants={fadeUp} className="lp-card lp-card-hover p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-neutral-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                  {feature.icon}
                </svg>
              </span>
              <h3 className="lp-display mt-5 text-h3 text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-micro leading-relaxed text-neutral-700">{feature.body}</p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
