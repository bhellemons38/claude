'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export function ProductShowcase() {
  const reduce = useReducedMotion()
  const view = { once: true, margin: '-100px' }

  return (
    <section className="relative overflow-hidden bg-neutral-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-7 sm:py-20 md:grid-cols-3 md:gap-6">
        {/* left text */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="order-2 text-center md:order-1 md:text-left"
        >
          <span className="lp-label text-primary">Echt eten in de fles</span>
          <p className="mx-auto mt-4 max-w-xs text-body leading-relaxed text-neutral-700 md:mx-0">
            Ambachtelijk ingekookt met verse gember, kokosmelk, mirin, tomaat en gegrilde paprika.
            Geen extracten, geen aromaten, gewoon echt eten.
          </p>
          <Link href="#smaken" className="mt-5 inline-flex items-center gap-1.5 text-micro font-semibold text-neutral-900 underline decoration-primary decoration-2 underline-offset-4">
            Ontdek de smaken
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* center: bottle on a big yellow circle */}
        <div className="relative order-1 flex h-[340px] items-center justify-center md:order-2 md:h-[460px]">
          <motion.div
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={view}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute z-0 h-[260px] w-[260px] rounded-full bg-accent md:h-[380px] md:w-[380px]"
            aria-hidden
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="relative z-10 h-[280px] w-[280px] overflow-hidden rounded-full border-4 border-neutral-0 shadow-warm-lg md:h-[400px] md:w-[400px]"
          >
            {/* Group shot of the bottles together */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/product-trio.webp"
              alt="Nacholito sauzen bij elkaar"
              className="h-full w-full object-cover object-center"
              onError={e => {
                const img = e.currentTarget
                img.onerror = null
                img.src = '/assets/product-pomodoro.png'
              }}
            />
          </motion.div>
        </div>

        {/* right: oversized statement */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="order-3 flex items-center justify-center md:justify-end"
        >
          <p className="lp-display text-center leading-[0.9] text-neutral-900 md:text-right">
            <span className="block text-[clamp(3.5rem,9vw,7rem)]">100%</span>
            <span className="block text-[clamp(3.5rem,9vw,7rem)] text-primary">echt.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
