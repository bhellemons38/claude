'use client'

import { motion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'

const CHANNELS = [
  {
    icon: (
      <>
        <path d="M4 21h16" />
        <path d="M6 21V10a6 6 0 0 1 12 0v11" />
        <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
      </>
    ),
    title: 'Foodservice',
    audience: 'Koks, restaurants & horeca',
    body: 'Voor de chef en horecaondernemer die elke service dezelfde topkwaliteit op het bord wil.',
    formats: ['Flessen 750 ml', 'Emmers 10 liter'],
  },
  {
    icon: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    title: 'Thuiskok & foodies',
    audience: 'Direct te bestellen, retail',
    body: 'Voor de thuiskok die restaurantsmaak op het eigen fornuis wil. Onze flessen, thuisbezorgd.',
    formats: ['Flessen 750 ml'],
  },
  {
    icon: (
      <>
        <path d="M3 7h18v4H3z" />
        <path d="M5 11v8h14v-8" />
        <path d="M10 15h4" />
      </>
    ),
    title: 'Grootverbruik & industrie',
    audience: 'Centrale keukens & productie',
    body: 'Voor hoge volumes en verwerking. Scherp tarief, op rekening, met een vast aanspreekpunt.',
    formats: ['Emmers 10 liter of groter'],
  },
]

export function Channels() {
  return (
    <section id="kanalen" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-7 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">Verkrijgbaar voor elk kanaal</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Voor wie <span className="lp-mark">kookt</span>
          </h2>
          <p className="mt-4 text-body text-neutral-700">
            Of je nu een drukke keuken draait, thuis kookt of op grote schaal verwerkt, er is een Nacholito-formaat dat past.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {CHANNELS.map(ch => (
            <motion.article key={ch.title} variants={fadeUp} className="lp-card lp-card-hover flex flex-col p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-neutral-900">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
                  {ch.icon}
                </svg>
              </span>
              <h3 className="lp-display mt-5 text-h3 text-neutral-900">{ch.title}</h3>
              <p className="lp-label mt-1 text-primary">{ch.audience}</p>
              <p className="mt-3 flex-1 text-micro leading-relaxed text-neutral-700">{ch.body}</p>
              <ul className="mt-5 space-y-2 border-t border-neutral-200 pt-4">
                {ch.formats.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-micro font-semibold text-neutral-900">
                    <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m16 6-7.5 8L4 10.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
