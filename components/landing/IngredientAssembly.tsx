'use client'

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

/* ── stylised ingredient icons (match the Fiery Pomodoro shot) ──────────── */
const Tomato = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <circle cx="32" cy="37" r="21" fill="#D8341F" />
    <ellipse cx="24" cy="29" rx="6" ry="4" fill="#fff" opacity="0.22" />
    <path d="M32 17c-5-1-9-3-11-6 4 0 8 1 11 3 3-2 7-3 11-3-2 3-6 5-11 6Z" fill="#4a8f36" />
    <rect x="30" y="11" width="4" height="7" rx="2" fill="#3f7d2e" />
  </svg>
)
const Chili = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <path d="M18 20c6-3 12 2 20 10s14 18 9 22-13-4-20-13-15-16-9-19Z" fill="#C81E12" />
    <path d="M18 20c-1-4 1-8 5-9 2 3 1 6-1 8-1 1-3 1-4 1Z" fill="#4a8f36" />
  </svg>
)
const Garlic = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <path d="M32 12c7 6 14 14 14 27 0 8-6 13-14 13s-14-5-14-13c0-13 7-21 14-27Z" fill="#F4ECDD" />
    <path d="M32 14v50M24 22c-3 8-3 22 0 38M40 22c3 8 3 22 0 38" stroke="#D9CBB0" strokeWidth="1.6" fill="none" />
  </svg>
)
const Onion = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <circle cx="32" cy="36" r="22" fill="#C8923F" />
    <path d="M32 14v44M20 20c-4 9-4 23 0 32M44 20c4 9 4 23 0 32" stroke="#9c6c28" strokeWidth="1.6" fill="none" />
    <path d="M30 14c0-4 4-4 4 0-1 2-3 2-4 0Z" fill="#6f9c3f" />
  </svg>
)
const Lime = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <circle cx="32" cy="32" r="22" fill="#5aa12e" />
    <circle cx="32" cy="32" r="16" fill="#bfe39a" />
    <path d="M32 32L32 16M32 32l14 7M32 32l-14 7M32 32l13-9M32 32l-13-9" stroke="#5aa12e" strokeWidth="2" />
  </svg>
)
const Herb = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <path d="M32 58V16" stroke="#3f7d2e" strokeWidth="2.4" strokeLinecap="round" />
    <g fill="#4a8f36">
      <ellipse cx="24" cy="24" rx="5" ry="3" transform="rotate(-35 24 24)" />
      <ellipse cx="40" cy="30" rx="5" ry="3" transform="rotate(35 40 30)" />
      <ellipse cx="24" cy="38" rx="5" ry="3" transform="rotate(-35 24 38)" />
      <ellipse cx="40" cy="44" rx="5" ry="3" transform="rotate(35 40 44)" />
    </g>
  </svg>
)

type Cfg = { Icon: () => ReactNode; sx: number; sy: number; size: number; rot: number }

// start positions scattered around the bottle (px from centre)
const ITEMS: Cfg[] = [
  { Icon: Tomato, sx: -300, sy: -150, size: 92, rot: -22 },
  { Icon: Chili, sx: 300, sy: -120, size: 80, rot: 26 },
  { Icon: Garlic, sx: -330, sy: 120, size: 84, rot: 14 },
  { Icon: Onion, sx: 330, sy: 150, size: 96, rot: -16 },
  { Icon: Lime, sx: -180, sy: -250, size: 70, rot: 30 },
  { Icon: Herb, sx: 210, sy: 260, size: 88, rot: -28 },
]

function FlyingItem({ cfg, progress }: { cfg: Cfg; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.85], [cfg.sx, 0])
  const y = useTransform(progress, [0, 0.85], [cfg.sy, 0])
  const scale = useTransform(progress, [0, 0.85], [1, 0.35])
  const opacity = useTransform(progress, [0, 0.7, 0.9], [1, 0.9, 0])
  const rotate = useTransform(progress, [0, 0.85], [cfg.rot, 0])
  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate, width: cfg.size, height: cfg.size }}
      className="absolute left-1/2 top-1/2 z-10 -ml-[var(--half)] -mt-[var(--half)] drop-shadow-[0_8px_12px_rgba(28,20,8,0.25)]"
    >
      <div style={{ ['--half' as string]: `${cfg.size / 2}px` }} className="h-full w-full">
        {cfg.Icon()}
      </div>
    </motion.div>
  )
}

export function IngredientAssembly() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bottlePulse = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 1.04])

  return (
    <section ref={ref} className="relative h-[180vh] bg-neutral-100">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <div className="mb-8 max-w-2xl text-center">
          <span className="lp-label text-primary">Vers in de fles</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Alles komt samen in <span className="lp-mark">één fles</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-neutral-700">
            Scroll en zie hoe verse tomaat, paprika, chili, knoflook en tijm in de saus verdwijnen.
          </p>
        </div>

        <div className="relative flex h-[360px] w-full max-w-xl items-center justify-center sm:h-[420px]">
          {ITEMS.map((cfg, i) =>
            reduce ? (
              <div
                key={i}
                style={{ width: cfg.size, height: cfg.size, transform: `translate(${cfg.sx / 2.4}px, ${cfg.sy / 2.4}px) rotate(${cfg.rot}deg)` }}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              >
                {cfg.Icon()}
              </div>
            ) : (
              <FlyingItem key={i} cfg={cfg} progress={scrollYProgress} />
            )
          )}

          {/* the bottle */}
          <motion.div
            style={reduce ? undefined : { scale: bottlePulse }}
            className="relative z-20 h-[340px] w-[200px] overflow-hidden rounded-[26px] border border-neutral-900/10 bg-neutral-900 shadow-warm-lg sm:h-[400px] sm:w-[240px]"
          >
            <Image
              src="/assets/product-fiery-pomodoro.jpg"
              alt="Nacholito Fiery Pomodoro fles"
              fill
              sizes="240px"
              className="object-cover object-center"
            />
            <span className="lp-label absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-0/90 px-3 py-1 text-primary">
              Fiery Pomodoro
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
