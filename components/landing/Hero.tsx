'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SplineScene } from './SplineScene'

const EASE = [0.2, 0.8, 0.2, 1] as const
const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function Hero() {
  const reduce = useReducedMotion()
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* background layers */}
      <div className="absolute inset-0 lp-grid opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-[640px] lp-spotlight animate-spotlight-pan" aria-hidden />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[820px] blur-3xl lp-glow-red opacity-70" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-7 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-8 items-center">
          {/* copy */}
          <motion.div initial={reduce ? false : 'hidden'} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span
              variants={item}
              className="lp-pill inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rood-glow shadow-[0_0_10px_2px_rgba(255,59,48,0.8)]" />
              Door chefs ontwikkeld · 4 fusion smaken
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-geist font-semibold tracking-[-0.03em] text-[clamp(42px,7vw,76px)] leading-[0.98]"
            >
              <span className="text-white">De wereld,</span>
              <br />
              <span className="lp-gradient-text">op smaak gebracht.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-[46ch] text-base sm:text-lg text-white/60 leading-relaxed">
              Vier internationale sauzen met restaurant-diepte — Bulgogi, Rendang, Chipotle en Chili Crisp.
              Klaar voor je keuken, vandaag besteld en snel geleverd.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/bestellen"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-nacht transition-transform hover:scale-[1.03] active:scale-95"
              >
                Bestel nu
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#smaken"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white/85 hover:bg-white/[0.07] transition-colors"
              >
                Bekijk de smaken
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center gap-6 text-white/45">
              <div>
                <p className="font-geist text-2xl font-semibold text-white">500+</p>
                <p className="lp-pill mt-0.5">Keukens</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-geist text-2xl font-semibold text-white">9,4</p>
                <p className="lp-pill mt-0.5">Beoordeling</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-geist text-2xl font-semibold text-white">3–5</p>
                <p className="lp-pill mt-0.5">Werkdagen</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Spline 3D scene (interactive thesis) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative h-[340px] sm:h-[440px] lg:h-[520px]"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 m-auto h-3/4 w-3/4 blur-3xl lp-glow-amber opacity-60" aria-hidden />
            {reduce ? (
              <div className="relative h-full w-full overflow-hidden rounded-[28px] lp-glass">
                <Image src="/assets/hero-poster.jpg" alt="Nacholito fusion saus op een gerecht" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
            ) : (
              <SplineScene scene={SPLINE_SCENE} className="h-full w-full" />
            )}
          </motion.div>
        </div>
      </div>

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-nacht" aria-hidden />
    </section>
  )
}
