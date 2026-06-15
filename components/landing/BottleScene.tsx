'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

type Flavor = { name: string; sub: string; top: string; bottom: string }

const FLAVORS: Record<'left' | 'center' | 'right', Flavor> = {
  left: { name: 'Chili Crisp', sub: 'China', top: '#d12a16', bottom: '#7c1407' },
  center: { name: 'Bulgogi', sub: 'Korea', top: '#bf3a1c', bottom: '#6e1d0b' },
  right: { name: 'Rendang', sub: 'Indonesië', top: '#9a531f', bottom: '#49230f' },
}

function Bottle({ flavor, id }: { flavor: Flavor; id: string }) {
  return (
    <svg viewBox="0 0 120 340" className="h-full w-full drop-shadow-[0_24px_30px_rgba(28,20,8,0.35)]" aria-hidden>
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={flavor.top} />
          <stop offset="1" stopColor={flavor.bottom} />
        </linearGradient>
        <linearGradient id={`shine-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* cap */}
      <rect x="45" y="4" width="30" height="22" rx="5" fill="#241a0c" />
      <rect x="45" y="22" width="30" height="5" fill="#FFC61A" />
      {/* neck */}
      <rect x="52" y="26" width="16" height="26" fill={flavor.bottom} />
      {/* body */}
      <path
        d="M52,50 C41,57 30,69 30,92 L30,300 a18,18 0 0 0 18,18 h24 a18,18 0 0 0 18,-18 L90,92 C90,69 79,57 68,50 Z"
        fill={`url(#body-${id})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
      {/* glass shine */}
      <rect x="36" y="96" width="12" height="196" rx="6" fill={`url(#shine-${id})`} opacity="0.6" />
      {/* label */}
      <rect x="31" y="150" width="58" height="116" rx="11" fill="#FBF4E6" stroke="rgba(28,20,8,0.12)" />
      <text x="60" y="172" textAnchor="middle" className="font-mono" fontSize="7.5" letterSpacing="1.4" fill="#BD0A0A" fontWeight="600">
        NACHOLITO
      </text>
      <line x1="42" y1="179" x2="78" y2="179" stroke="#BD0A0A" strokeWidth="1" opacity="0.5" />
      <text x="60" y="201" textAnchor="middle" className="font-geist" fontSize={flavor.name.length > 8 ? 12 : 15} fill="#1c1408" fontWeight="700">
        {flavor.name}
      </text>
      <text x="60" y="221" textAnchor="middle" className="font-mono" fontSize="6.5" letterSpacing="1.2" fill="#4a3d2a">
        FUSION SAUS
      </text>
      <text x="60" y="251" textAnchor="middle" className="font-geist" fontSize="7" fill="#8c0707" fontWeight="600">
        {flavor.sub} · 750 ml
      </text>
    </svg>
  )
}

export function BottleScene() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const tx = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const ty = useTransform(sy, [-0.5, 0.5], [-12, 12])

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  const float = (delay: number, range = 14) =>
    reduce
      ? {}
      : { animate: { y: [0, -range, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay } }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-full w-full overflow-hidden rounded-[28px] border border-inkt/10 bg-zand-donker"
    >
      {/* appetizing food backdrop */}
      <Image
        src="/assets/hero-poster.jpg"
        alt="Gerecht afgemaakt met Nacholito fusion saus"
        fill
        priority
        sizes="(max-width:1024px) 100vw, 50vw"
        className="object-cover scale-105 brightness-[0.92]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-inkt/55 via-inkt/10 to-zand/30" />
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-56 w-72 -translate-x-1/2 blur-3xl lp-glow-amber opacity-80" aria-hidden />

      {/* floating bottles */}
      <motion.div className="absolute inset-0" style={{ x: tx, y: ty }}>
        <motion.div {...float(0.6)} className="absolute bottom-[12%] left-[10%] z-10 w-[33%] max-w-[140px] origin-bottom -rotate-[11deg]">
          <Bottle flavor={FLAVORS.left} id="l" />
        </motion.div>
        <motion.div {...float(1.1)} className="absolute bottom-[11%] right-[10%] z-10 w-[33%] max-w-[140px] origin-bottom rotate-[11deg]">
          <Bottle flavor={FLAVORS.right} id="r" />
        </motion.div>
        <motion.div {...float(0)} className="absolute bottom-[6%] left-1/2 z-20 w-[42%] max-w-[176px] -translate-x-1/2">
          <Bottle flavor={FLAVORS.center} id="c" />
        </motion.div>
      </motion.div>

      {/* drifting spice flecks (aroma) */}
      {!reduce &&
        [0, 1, 2, 3].map(i => (
          <motion.span
            key={i}
            className="absolute bottom-1/3 h-1 w-1 rounded-full bg-geel/80"
            style={{ left: `${28 + i * 15}%` }}
            animate={{ y: [-4, -54], opacity: [0, 0.9, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          />
        ))}
    </div>
  )
}
