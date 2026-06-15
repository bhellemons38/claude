'use client'

import Link from 'next/link'
import { Reveal, RevealGroup, fadeUp, motion } from './motion'

const TIERS = [
  {
    name: 'Proefbox',
    price: '€ 59',
    unit: 'eenmalig',
    description: 'Maak kennis met alle vier de smaken voordat je ze op je kaart zet.',
    features: ['Eén fles van elke smaak', '4 × 750 ml', 'Betaal met iDEAL', 'Binnen 3–5 werkdagen'],
    cta: 'Bestel proefbox',
    highlight: false,
  },
  {
    name: 'Horeca',
    price: '€ 14,50',
    unit: 'per fles 750 ml',
    description: 'De standaard voor keukens die structureel met Nacholito koken.',
    features: ['Geen MOQ op de fles', 'iDEAL of op rekening', 'Factuur automatisch in je mail', 'Herbestellen in 2 minuten'],
    cta: 'Bestel nu',
    highlight: true,
  },
  {
    name: 'Volume & 10 liter',
    price: 'Op aanvraag',
    unit: 'maatwerk',
    description: 'Voor hoge volumes en centrale keukens. Scherp tarief, op rekening.',
    features: ['10 liter verpakkingen', 'Staffelkorting op volume', 'Betaling op rekening', 'Vaste accountcontact'],
    cta: 'Neem contact op',
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section id="prijzen" className="relative">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-72 w-[680px] -translate-x-1/2 blur-3xl lp-glow-red opacity-40" aria-hidden />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-20 sm:py-28">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="lp-pill text-rood-glow">Prijzen</span>
          <h2 className="mt-4 font-geist font-semibold tracking-[-0.02em] text-[clamp(30px,4.5vw,52px)] leading-[1.02] text-white">
            Eerlijk geprijsd, <span className="lp-gradient-text">geen verrassingen</span>
          </h2>
          <p className="mt-4 text-white/55">Alle prijzen zijn exclusief 9% BTW. Minimale bestelwaarde € 75 excl. BTW.</p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {TIERS.map(tier => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-3xl p-7 ${
                tier.highlight ? 'lp-ring bg-white/[0.05] md:-mt-4 md:mb-4' : 'lp-glass lp-glass-hover'
              }`}
            >
              {tier.highlight && (
                <span className="lp-pill absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-rood-glow/40 bg-rood-glow/15 px-3 py-1 text-rood-glow">
                  Meest gekozen
                </span>
              )}
              <h3 className="font-geist text-lg font-semibold text-white">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-geist text-4xl font-semibold tracking-tight text-white">{tier.price}</span>
                <span className="lp-pill text-white/45">{tier.unit}</span>
              </div>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/75">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 flex-none text-rood-glow" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m16 6-7.5 8L4 10.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/bestellen"
                className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 ${
                  tier.highlight ? 'bg-white text-nacht' : 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]'
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
