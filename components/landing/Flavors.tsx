'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'
import { PRODUCTS } from '@/lib/products'

export function Flavors() {
  const reduce = useReducedMotion()

  return (
    <section id="smaken" className="bg-zand">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="eyebrow block mb-3">De line-up</span>
          <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">
            Vier smaken, <span className="text-rood">één belofte</span>
          </h2>
          <p className="mt-4 text-inkt-zacht font-medium">
            Echte ingrediënten, geen rommel. Elke fles geeft je een gerecht met restaurant-diepte
            in minder stappen.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map(product => (
            <motion.article
              key={product.id}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -8 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className="group bg-wit border-2 border-inkt rounded-[18px] overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] border-b-2 border-inkt overflow-hidden bg-zand-donker">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-geel border-2 border-inkt rounded-full font-display text-xs tracking-wider uppercase px-3 py-1">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="font-display text-xs tracking-[0.18em] uppercase text-rood">
                  {product.origin}
                </span>
                <h3 className="font-display uppercase text-2xl mt-0.5">{product.name}</h3>
                <p className="text-sm text-inkt-zacht font-medium mt-1.5 flex-1">{product.description}</p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
