'use client'

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

/* ── stylised ingredient icons (the real stuff that goes in) ────────────── */
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
const Ginger = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <path d="M20 40c-4-8 2-16 10-16 4 0 6 3 11 3 7 0 10 6 7 12-3 7-10 9-16 9-5 0-10-2-12-8Z" fill="#E2B57F" />
    <path d="M30 26c2 4 1 8-2 11M40 30c2 3 2 7 0 10" stroke="#b98c52" strokeWidth="1.6" fill="none" />
  </svg>
)
const Onion = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <circle cx="32" cy="36" r="22" fill="#C8923F" />
    <path d="M32 14v44M20 20c-4 9-4 23 0 32M44 20c4 9 4 23 0 32" stroke="#9c6c28" strokeWidth="1.6" fill="none" />
    <path d="M30 14c0-4 4-4 4 0-1 2-3 2-4 0Z" fill="#6f9c3f" />
  </svg>
)
const Pepper = () => (
  <svg viewBox="0 0 64 64" className="h-full w-full">
    <path d="M20 30c0-6 6-9 12-9s12 3 12 9c0 12-4 22-12 22S20 42 20 30Z" fill="#D8341F" />
    <path d="M30 21c0-4 1-7 2-8 2 2 2 5 2 8" stroke="#4a8f36" strokeWidth="3" fill="none" strokeLinecap="round" />
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

// sx/sy = scattered start; ex/ey = resting ring around the bottle (px from centre)
type Cfg = { Icon: () => ReactNode; label: string; sx: number; sy: number; ex: number; ey: number; size: number; rot: number }
const ITEMS: Cfg[] = [
  { Icon: Tomato, label: 'Tomaat', sx: -460, sy: -260, ex: -150, ey: -120, size: 86, rot: -22 },
  { Icon: Pepper, label: 'Gegrilde paprika', sx: 470, sy: -230, ex: 165, ey: -90, size: 84, rot: 20 },
  { Icon: Ginger, label: 'Gember', sx: -500, sy: 120, ex: -180, ey: 40, size: 80, rot: 16 },
  { Icon: Onion, label: 'Ui', sx: 500, sy: 200, ex: 175, ey: 110, size: 88, rot: -16 },
  { Icon: Chili, label: 'Chili', sx: -260, sy: 360, ex: -110, ey: 175, size: 72, rot: 28 },
  { Icon: Herb, label: 'Verse kruiden', sx: 280, sy: 380, ex: 95, ey: 185, size: 82, rot: -26 },
]

function FlyingItem({ cfg, progress }: { cfg: Cfg; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.85], [cfg.sx, cfg.ex])
  const y = useTransform(progress, [0, 0.85], [cfg.sy, cfg.ey])
  const scale = useTransform(progress, [0, 0.85], [0.7, 1])
  const opacity = useTransform(progress, [0, 0.25], [0, 1])
  const rotate = useTransform(progress, [0, 0.85], [cfg.rot, 0])
  return (
    <motion.div
      style={{ x, y, scale, opacity, rotate, width: cfg.size, height: cfg.size, marginLeft: -cfg.size / 2, marginTop: -cfg.size / 2 }}
      className="absolute left-1/2 top-1/2 z-30 drop-shadow-[0_8px_12px_rgba(28,20,8,0.25)]"
    >
      {cfg.Icon()}
    </motion.div>
  )
}

export function IngredientAssembly() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section ref={ref} className="relative h-[200vh] bg-neutral-100">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4">
        <div className="mb-6 max-w-2xl text-center">
          <span className="lp-label text-primary">Echt eten in de fles</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Alles komt samen in <span className="lp-mark">één fles</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-neutral-700">
            Echte gember, kokosmelk, mirin, tomaat, gegrilde paprika en ui — ambachtelijk ingekookt.
            Geen extracten, geen aromaten.
          </p>
        </div>

        <div className="relative flex h-[380px] w-full max-w-xl items-center justify-center sm:h-[440px]">
          {ITEMS.map((cfg, i) =>
            reduce ? (
              <div
                key={i}
                style={{ width: cfg.size, height: cfg.size, transform: `translate(calc(-50% + ${cfg.ex}px), calc(-50% + ${cfg.ey}px)) rotate(${cfg.rot}deg)` }}
                className="absolute left-1/2 top-1/2 z-30"
                title={cfg.label}
              >
                {cfg.Icon()}
              </div>
            ) : (
              <FlyingItem key={i} cfg={cfg} progress={scrollYProgress} />
            )
          )}

          {/* the bottle — real product shot, always visible */}
          <div className="relative z-20 flex h-full items-center justify-center">
            <div className="pointer-events-none absolute h-[80%] w-[64%] rounded-full bg-accent-tint blur-3xl" aria-hidden />
            <div className="relative h-[340px] w-[260px] overflow-hidden rounded-[26px] border border-neutral-900/10 shadow-warm-lg sm:h-[400px] sm:w-[300px]">
              <Image
                src="/assets/product-pomodoro.png"
                alt="Nacholito Fiery Pomodoro fles met verse ingrediënten"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
