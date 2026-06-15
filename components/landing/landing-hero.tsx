'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { SplineScene } from '@/components/ui/spline-scene'

// TODO: vervang door de echte Nacholito Spline-scene (publish in Spline → "Export
// for code" en plak de .splinecode URL hier). Tot die tijd toont de Suspense-loader.
const SCENE_URL = 'https://prod.spline.design/REPLACE-ME/scene.splinecode'

const EASE = [0.2, 0.8, 0.2, 1] as const

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* subtiele gold grain achter alles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #C9973A 0px, transparent 1.5px), radial-gradient(circle at 80% 60%, #C9973A 0px, transparent 1.5px)',
          backgroundSize: '32px 32px, 28px 28px',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-[1.05fr_.95fr] md:py-28">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-semibold uppercase tracking-[0.24em] text-gold"
          >
            Van ambacht naar gemak
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          >
            Restaurant-smaak,<br />
            <span className="text-gold">elke service.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-white/75">
            Vier fusion sauzen, opgebouwd door chefs met echte ingrediënten — gemberpuree
            in plaats van gember-extract, donkere soja, echte kokosmelk. Direct bestellen
            met iDEAL, geen MOQ op de fles.
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-8 space-y-2 text-sm font-semibold text-white/85">
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy">✓</span>
              Echte ingrediënten — geen smaakversterkers
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy">✓</span>
              Ambient houdbaar tot 12 maanden
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-navy">✓</span>
              iDEAL of op rekening, geen minimumafname
            </li>
          </motion.ul>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/bestellen"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-bold uppercase tracking-wider text-navy shadow-[0_8px_0_#a87b2a] transition hover:shadow-[0_12px_0_#a87b2a] active:translate-y-1 active:shadow-[0_4px_0_#a87b2a]"
            >
              Bestel met iDEAL <span aria-hidden>→</span>
            </Link>
            <Link
              href="/proeverij"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
            >
              Vraag proeverij aan
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative aspect-square w-full max-w-[560px] justify-self-center overflow-hidden rounded-3xl border-2 border-gold/40 bg-navy-light shadow-2xl md:aspect-[5/6]"
        >
          <SplineScene scene={SCENE_URL} className="h-full w-full" />
          {/* zachte gold gloed onderin */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy via-navy/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
