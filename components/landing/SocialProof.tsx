'use client'

import Image from 'next/image'
import { Reveal, RevealGroup, fadeUp, motion } from './motion'

const PARTNERS = ['Bistro Noord', 'Streetfood Co.', 'Café De Kroeg', 'Tafel 7', 'De Markthal', 'Kantine Zuid', 'Proeflokaal', 'Vuur & Vlam']

const QUOTES = [
  {
    quote: 'De Bulgogi staat inmiddels vast op onze kaart. Onze gasten vragen er specifiek naar.',
    name: 'Sofie Maes',
    role: 'Chef-kok, Bistro Noord',
    image: '/assets/dish-2.jpg',
  },
  {
    quote: 'Zelfde smaak, elke keer. Dat scheelt ons enorm veel prep tijdens de drukte.',
    name: 'Daan Verhoeven',
    role: 'Keukenmanager, Streetfood Co.',
    image: '/assets/dish-4.jpg',
  },
  {
    quote: 'Bestellen kost me twee minuten en de factuur staat meteen in de boekhouding.',
    name: 'Imane el Idrissi',
    role: 'Eigenaar, Café De Kroeg',
    image: '/assets/dish-6.jpg',
  },
]

export function SocialProof() {
  return (
    <section className="relative border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-20 sm:py-28">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="lp-pill text-rood-glow">Vertrouwd in de horeca</span>
          <h2 className="mt-4 font-geist font-semibold tracking-[-0.02em] text-[clamp(30px,4.5vw,52px)] leading-[1.02] text-white">
            Koks kiezen <span className="lp-gradient-text">Nacholito</span>
          </h2>
        </Reveal>

        {/* marquee of partners */}
        <div className="mt-12 lp-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...PARTNERS, ...PARTNERS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="lp-mono whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/55"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map(item => (
            <motion.figure
              key={item.name}
              variants={fadeUp}
              className="group overflow-hidden rounded-3xl lp-glass lp-glass-hover flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-nacht/80 to-transparent" />
              </div>
              <blockquote className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-white/80 leading-relaxed">“{item.quote}”</p>
                <figcaption className="mt-5">
                  <p className="font-geist font-semibold text-white">{item.name}</p>
                  <p className="lp-pill mt-1 text-white/45">{item.role}</p>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
