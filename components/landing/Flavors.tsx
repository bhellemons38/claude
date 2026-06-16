'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'
import { PRODUCTS } from '@/lib/products'

export function Flavors() {
  return (
    <section id="smaken" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">De line-up</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Vier smaken, <span className="lp-mark">één belofte</span>
          </h2>
          <p className="mt-4 text-body text-neutral-700">
            Echte ingrediënten, geen rommel. Elke fles geeft je een gerecht met restaurant-diepte in minder stappen.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(product => (
            <motion.article key={product.id} variants={fadeUp} className="lp-card lp-card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.badge && (
                  <span className="lp-label absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-neutral-900">{product.badge}</span>
                )}
              </div>
              <div className="p-5">
                <span className="lp-label text-primary">{product.origin}</span>
                <h3 className="lp-display mt-1 text-h3 text-neutral-900">{product.name}</h3>
                <p className="mt-2 text-micro leading-relaxed text-neutral-700">{product.description}</p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
