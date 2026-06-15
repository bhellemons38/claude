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
    price: 'vanaf € 14,50',
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
    <section id="prijzen" className="bg-zand">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow block mb-3">Prijzen</span>
          <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">
            Eerlijk geprijsd, <span className="text-rood">geen verrassingen</span>
          </h2>
          <p className="mt-4 text-inkt-zacht font-medium">
            Alle prijzen zijn exclusief 9% BTW. Minimale bestelwaarde € 75 excl. BTW.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map(tier => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-[18px] border-2 p-7 ${
                tier.highlight
                  ? 'bg-inkt text-zand border-inkt shadow-card-lg md:-mt-3 md:mb-3'
                  : 'bg-wit text-inkt border-inkt shadow-card'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-7 bg-geel border-2 border-inkt rounded-full font-display text-xs tracking-wider uppercase px-3 py-1 text-inkt">
                  Meest gekozen
                </span>
              )}
              <h3 className="font-display uppercase text-3xl">{tier.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl leading-none">{tier.price}</span>
                <span className={`text-xs font-bold uppercase tracking-wide ${tier.highlight ? 'text-zand/60' : 'text-inkt-zacht'}`}>
                  {tier.unit}
                </span>
              </div>
              <p className={`mt-3 text-sm font-medium ${tier.highlight ? 'text-zand/80' : 'text-inkt-zacht'}`}>
                {tier.description}
              </p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm font-semibold">
                    <span
                      className={`flex-none w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                        tier.highlight ? 'bg-geel text-inkt' : 'bg-rood text-wit'
                      }`}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/bestellen"
                className={`mt-7 ${tier.highlight ? 'btn-yellow' : 'btn-primary'} w-full`}
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
