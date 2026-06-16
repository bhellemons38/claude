'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight'
import { WordReveal } from './Kinetic'
import { CircularBadge } from './CircularBadge'

const EASE = [0.2, 0.8, 0.2, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const px = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const py = useTransform(sy, [-0.5, 0.5], [-14, 14])

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

  const kenBurns = reduce
    ? {}
    : { animate: { scale: [1, 1.07, 1] }, transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' } }
  const float = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -12, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay } }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* warm spotlight wash */}
      <Spotlight className="-top-40 left-4 md:-top-24 md:left-1/4" fill="#FFC61A" />

      {/* warm decorative accents */}
      <div className="pointer-events-none absolute -top-20 right-[-6rem] h-80 w-80 rounded-full bg-accent-tint blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-[-8rem] h-72 w-72 rounded-full bg-primary-tint blur-2xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-7 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
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
              Vers · door chefs ontwikkeld
            </motion.span>

            <h1 className="lp-display mt-6 text-h1 text-neutral-900">
              <span className="block">
                <WordReveal text="Eén lepel." delay={0.1} />
              </span>
              <span className="block">
                <span className="lp-mark">
                  <WordReveal text="Een gerecht." delay={0.32} />
                </span>
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0.55}
              variants={fade}
              className="mt-6 max-w-[46ch] text-lead text-neutral-700"
            >
              Fiery Pomodoro, Bulgogi, Rendang en Chili Crisp — fusion sauzen met restaurant-diepte,
              ready to use. Verse ingrediënten in, gedoe eruit.
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
                Bekijk de smaken
              </a>
            </motion.div>

            <motion.ul
              initial={reduce ? false : 'hidden'}
              animate="show"
              custom={0.85}
              variants={fade}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {['Geen MOQ op de fles', 'iDEAL of op rekening', '3–5 werkdagen levertijd'].map(item => (
                <li key={item} className="flex items-center gap-2 text-micro font-semibold text-neutral-700">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="m16 6-7.5 8L4 10.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* layered product composition */}
          <motion.div
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={resetParallax}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <motion.div style={reduce ? undefined : { x: px, y: py }} className="relative">
              {/* hero product shot */}
              <div className="relative ml-auto w-[84%] overflow-hidden rounded-[28px] border border-neutral-900/10 bg-neutral-900 shadow-warm-lg">
                <motion.div {...kenBurns} className="relative aspect-[4/5]">
                  <Image
                    src="/assets/product-fiery-pomodoro.jpg"
                    alt="Nacholito Fiery Pomodoro saus met verse tomaten, paprika, chili, knoflook en tijm"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* floating dish card */}
              <motion.div
                {...float(0.4)}
                className="absolute -bottom-6 -left-1 w-[46%] overflow-hidden rounded-2xl border-4 border-neutral-0 shadow-warm-lg sm:-left-3"
              >
                <div className="relative aspect-square">
                  <Image src="/assets/dish-6.jpg" alt="Gerecht met Nacholito" fill sizes="200px" className="object-cover" />
                </div>
              </motion.div>

              {/* dish chip */}
              <motion.div
                {...float(1.1)}
                className="absolute -top-4 left-0 w-[42%] rounded-2xl border border-neutral-900/10 bg-neutral-0 p-2 shadow-warm-md sm:-left-2"
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                  <Image src="/assets/dish-4.jpg" alt="Burger met Nacholito saus" fill sizes="180px" className="object-cover" />
                </div>
                <p className="lp-label mt-2 px-1 text-primary">Op het bord</p>
              </motion.div>
            </motion.div>

            <CircularBadge className="absolute -bottom-5 right-2 h-20 w-20 sm:h-24 sm:w-24" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
