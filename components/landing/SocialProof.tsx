'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp, motion } from './motion'

const STATS = [
  { value: 500, suffix: '+', label: 'Keukens beleverd' },
  { value: 4, suffix: '', label: 'Signature smaken' },
  { value: 9.4, suffix: '', label: 'Gemiddelde score', decimals: 1 },
]

const QUOTES = [
  {
    quote: 'De Bulgogi staat inmiddels vast op onze kaart. Onze gasten vragen er specifiek naar.',
    name: 'Sofie Maes',
    role: 'Chef-kok, Bistro Noord',
    image: '/assets/product-bulgogi.png',
  },
  {
    quote: 'Zelfde smaak, elke keer. Dat scheelt ons enorm veel prep tijdens de drukte.',
    name: 'Daan Verhoeven',
    role: 'Keukenmanager, Streetfood Co.',
    image: '/assets/product-rendang.png',
  },
  {
    quote: 'Bestellen kost me twee minuten en de factuur staat meteen in de boekhouding.',
    name: 'Imane el Idrissi',
    role: 'Eigenaar, Café De Kroeg',
    image: '/assets/product-chipotle.png',
  },
]

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1200
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {decimals ? n.toFixed(decimals).replace('.', ',') : Math.round(n)}
      {suffix}
    </span>
  )
}

export function SocialProof() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">Vertrouwd in de horeca</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Koks kiezen <span className="lp-mark">Nacholito</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map(stat => (
            <motion.div key={stat.label} variants={fadeUp} className="lp-card p-8 text-center">
              <p className="lp-display text-[3.5rem] leading-none text-primary">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="lp-label mt-2 text-neutral-700">{stat.label}</p>
            </motion.div>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {QUOTES.map(item => (
            <motion.figure key={item.name} variants={fadeUp} className="lp-card lp-card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={item.image} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <blockquote className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-body leading-relaxed text-neutral-900">“{item.quote}”</p>
                <figcaption className="mt-5">
                  <p className="lp-display text-xl text-neutral-900">{item.name}</p>
                  <p className="lp-label mt-1 text-neutral-700">{item.role}</p>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
