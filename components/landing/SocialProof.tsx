'use client'

import Image from 'next/image'
import { Reveal, RevealGroup, fadeUp, motion } from './motion'

const STATS = [
  { value: '4', label: 'Signature smaken' },
  { value: '500+', label: 'Keukens beleverd' },
  { value: '3–5', label: 'Werkdagen levertijd' },
  { value: '9,4', label: 'Gemiddelde beoordeling' },
]

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
    <section className="bg-zand-donker border-y-2 border-inkt">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow block mb-3">Vertrouwd in de horeca</span>
          <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">
            Koks kiezen <span className="text-rood">Nacholito</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(stat => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-wit border-2 border-inkt rounded-[18px] p-6 text-center shadow-card"
            >
              <p className="font-display text-5xl sm:text-6xl text-rood leading-none">{stat.value}</p>
              <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-inkt-zacht">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map(item => (
            <motion.figure
              key={item.name}
              variants={fadeUp}
              className="bg-wit border-2 border-inkt rounded-[18px] overflow-hidden flex flex-col shadow-card"
            >
              <div className="relative aspect-[16/10] border-b-2 border-inkt overflow-hidden bg-zand-donker">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <blockquote className="p-6 flex flex-col flex-1">
                <p className="font-medium text-inkt flex-1">“{item.quote}”</p>
                <figcaption className="mt-4">
                  <p className="font-display uppercase text-lg leading-none">{item.name}</p>
                  <p className="text-xs font-bold text-inkt-zacht mt-1">{item.role}</p>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
