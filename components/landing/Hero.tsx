'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight'
import { WordReveal } from './Kinetic'
import { CircularBadge } from './CircularBadge'
import { FieryBottle } from './FieryBottle'

const EASE = [0.2, 0.8, 0.2, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const px = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const py = useTransform(sy, [-0.5, 0.5], [-12, 12])

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetParallax = () => {
    mx.set(0)
    my.set(0)
  }

  const fade = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: d } }),
  }
  const floatBottle = reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
  const floatCard = reduce ? {} : { animate: { y: [0, -12, 0] }, transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <Spotlight className="-top-40 left-4 md:-top-24 md:left-1/4" fill="#FFC61A" />
      <div className="pointer-events-none absolute -top-20 right-[-6rem] h-80 w-80 rounded-full bg-accent-tint blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-[-8rem] h-72 w-72 rounded-full bg-primary-tint blur-2xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-7 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* copy */}
          <div>
            <motion.span
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0}
              variants={fade}
              className="lp-label inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-neutral-0 px-3 py-2 text-primary"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              Ambachtelijke fusion sauzen
            </motion.span>

            <h1 className="lp-display mt-6 text-hero text-neutral-900">
              <span className="block">
                Van <span className="lp-mark"><WordReveal text="ambacht" delay={0.12} /></span>
              </span>
              <span className="block">
                <WordReveal text="naar gemak." delay={0.34} />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0.55}
              variants={fade}
              className="mt-6 max-w-[48ch] text-lead text-neutral-700"
            >
              Ambachtelijk ingekookte fusion sauzen met écht eten in de fles — verse gember, kokosmelk,
              mirin, tomaat en gegrilde paprika. Geen extracten, geen aromaten. Jij hoeft alleen nog op te scheppen.
            </motion.p>

            <motion.div
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0.7}
              variants={fade}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/bestellen" className="lp-btn lp-btn--primary group">
                Bestel nu
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a href="#smaken" className="lp-btn lp-btn--ghost">
                Ontdek de smaken
              </a>
            </motion.div>

            <motion.ul
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0.85}
              variants={fade}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {['Echte ingrediënten', 'Geen extracten of aromaten', 'Ambachtelijk bereid'].map(item => (
                <li key={item} className="flex items-center gap-2 text-micro font-semibold text-neutral-700">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m16 6-7.5 8L4 10.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* product visual */}
          <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={resetParallax}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <motion.div style={reduce ? undefined : { x: px, y: py }} className="relative flex items-center justify-center">
              {/* warm stage */}
              <div className="relative flex aspect-square w-full items-center justify-center rounded-[32px] border border-neutral-900/10 bg-gradient-to-b from-neutral-0 to-neutral-200 shadow-warm-lg">
                <div className="pointer-events-none absolute h-3/5 w-3/5 rounded-full bg-accent-tint blur-3xl" aria-hidden />
                <motion.div {...floatBottle} className="relative">
                  <FieryBottle className="h-[300px] w-auto drop-shadow-[0_28px_44px_rgba(28,20,8,0.32)] sm:h-[360px]" />
                </motion.div>
              </div>

              {/* floating dish card */}
              <motion.div
                {...floatCard}
                className="absolute -bottom-6 -left-2 w-[40%] overflow-hidden rounded-2xl border-4 border-neutral-0 shadow-warm-lg"
              >
                <div className="relative aspect-square">
                  <Image src="/assets/dish-4.jpg" alt="Gerecht met Nacholito saus" fill sizes="200px" className="object-cover" />
                </div>
              </motion.div>
            </motion.div>

            <CircularBadge className="absolute -top-3 right-1 h-20 w-20 sm:h-24 sm:w-24" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
