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
    <section id="prijzen" className="relative bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="lp-label text-primary">Prijzen</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Eerlijk geprijsd, <span className="lp-mark">geen verrassingen</span>
          </h2>
          <p className="mt-4 text-body text-neutral-700">Alle prijzen zijn exclusief 9% BTW. Minimale bestelwaarde € 75 excl. BTW.</p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {TIERS.map(tier => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={`relative flex flex-col p-7 ${
                tier.highlight
                  ? 'rounded-[20px] border-2 border-primary bg-neutral-0 shadow-warm-lg md:-my-3'
                  : 'lp-card lp-card-hover'
              }`}
            >
              {tier.highlight && (
                <span className="lp-label absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-neutral-0">
                  Meest gekozen
                </span>
              )}
              <h3 className="lp-display text-h3 text-neutral-900">{tier.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="lp-display text-[2.75rem] leading-none text-neutral-900">{tier.price}</span>
                <span className="lp-label text-neutral-700">{tier.unit}</span>
              </div>
              <p className="mt-3 text-micro leading-relaxed text-neutral-700">{tier.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-micro text-neutral-900">
                    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 flex-none text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m16 6-7.5 8L4 10.5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/bestellen" className={`lp-btn mt-7 w-full ${tier.highlight ? 'lp-btn--primary' : 'lp-btn--ghost'}`}>
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
