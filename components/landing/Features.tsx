'use client'

import { motion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'

const PILLARS = [
  {
    icon: (
      <>
        <path d="M12 3c2.5 2 4 4.5 4 7a4 4 0 0 1-8 0c0-2.5 1.5-5 4-7Z" />
        <path d="M12 14v7" />
      </>
    ),
    title: 'Echte producten',
    body: 'Verse gember, kokosmelk, mirin, tomaat, gegrilde paprika en ui — herkenbaar eten dat je zo van de markt haalt.',
  },
  {
    icon: (
      <>
        <path d="M4 19h16" />
        <path d="M7 19V9l5-5 5 5v10" />
        <path d="M10 19v-5h4v5" />
      </>
    ),
    title: 'Ambachtelijk bereid',
    body: 'Laag op laag ingekookt zoals in een echte keuken. Diepe, ronde smaak die je proeft — niet een snelle mix.',
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </>
    ),
    title: 'Geen extracten of aromaten',
    body: 'Geen poeders, geen kunstmatige smaakstoffen, geen lijstje E-nummers. Puur wat erop staat.',
  },
]

export function Features() {
  return (
    <section id="voordelen" className="relative bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">Wat erin zit</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Eten dat je <span className="lp-mark">herkent</span>
          </h2>
          <p className="mt-4 text-body text-neutral-700">
            We koken sauzen zoals een chef dat doet: met echte ingrediënten, geduld en niets om te verbergen.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PILLARS.map(pillar => (
            <motion.article key={pillar.title} variants={fadeUp} className="lp-card lp-card-hover p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-neutral-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                  {pillar.icon}
                </svg>
              </span>
              <h3 className="lp-display mt-5 text-h3 text-neutral-900">{pillar.title}</h3>
              <p className="mt-2 text-micro leading-relaxed text-neutral-700">{pillar.body}</p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
