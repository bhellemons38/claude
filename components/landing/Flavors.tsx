'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'
import { PRODUCTS } from '@/lib/products'

export function Flavors() {
  const reduce = useReducedMotion()

  return (
    <section id="smaken" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <span className="lp-pill text-rood">De line-up</span>
          <h2 className="mt-4 font-geist font-semibold tracking-[-0.02em] text-[clamp(30px,4.5vw,52px)] leading-[1.02] text-inkt">
            Vier smaken, <span className="lp-gradient-text">één belofte</span>
          </h2>
          <p className="mt-4 text-inkt-zacht leading-relaxed">
            Echte ingrediënten, geen rommel. Elke fles geeft je een gerecht met restaurant-diepte in minder stappen.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.map(product => (
            <motion.article
              key={product.id}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative overflow-hidden rounded-3xl lp-glass lp-glass-hover flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.badge && (
                  <span className="lp-pill absolute top-3 left-3 rounded-full border border-inkt/10 bg-wit/85 px-2.5 py-1 text-inkt backdrop-blur">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="lp-pill text-rood">{product.origin}</span>
                <h3 className="mt-1 font-geist text-xl font-semibold text-inkt">{product.name}</h3>
                <p className="mt-1.5 text-sm text-inkt-zacht leading-relaxed">{product.description}</p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
