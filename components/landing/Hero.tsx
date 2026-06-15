'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SplineScene } from './SplineScene'

const USPS = ['Geen MOQ op de fles', 'iDEAL of op rekening', 'Factuur direct in je mail']
const EASE = [0.2, 0.8, 0.2, 1] as const
const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function Hero() {
  const reduce = useReducedMotion()

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section className="relative bg-geel border-b-2 border-inkt overflow-hidden">
      {/* dot texture */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--inkt) 1.1px, transparent 1.1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(180deg, transparent, #000 45%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 45%, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-14 sm:py-20 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* copy */}
          <motion.div
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={item} className="eyebrow block mb-4">
              Fusion sauzen · door chefs ontwikkeld
            </motion.span>

            <motion.h1
              variants={item}
              className="font-display uppercase text-rood text-[clamp(44px,9vw,92px)] leading-[0.9]"
            >
              De wereld
              <span className="block text-inkt">op smaak.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 text-base sm:text-lg font-medium max-w-[46ch] text-inkt-zacht"
            >
              Vier internationale sauzen met restaurant-diepte — Bulgogi, Rendang, Chipotle en Chili Crisp.
              Klaar voor je keuken, vandaag besteld en snel geleverd.
            </motion.p>

            <motion.div variants={item} className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/bestellen" className="btn-primary">
                Bestel nu <span aria-hidden>→</span>
              </Link>
              <a href="#smaken" className="btn-ghost">
                Bekijk de smaken
              </a>
            </motion.div>

            <motion.ul variants={item} className="mt-8 grid gap-2.5 sm:grid-cols-3 max-w-2xl">
              {USPS.map(usp => (
                <li key={usp} className="flex items-center gap-2 text-sm font-bold">
                  <span className="flex-none w-6 h-6 rounded-full bg-rood text-wit flex items-center justify-center text-xs font-extrabold">
                    ✓
                  </span>
                  {usp}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* visual */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[22px] overflow-hidden border-2 border-inkt shadow-card-lg bg-inkt">
              {reduce ? (
                <Image
                  src="/assets/hero-poster.jpg"
                  alt="Nacholito fusion saus geserveerd op een gerecht"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
              )}
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
              className="absolute -bottom-4 -left-3 sm:left-4 bg-wit border-2 border-inkt rounded-2xl px-4 py-3 shadow-card"
            >
              <p className="font-display text-2xl leading-none text-rood">4 smaken</p>
              <p className="text-xs font-bold text-inkt-zacht mt-0.5">750 ml &amp; 10 liter</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
