'use client'

import { motion, useReducedMotion } from 'framer-motion'

/** Slowly rotating circular sticker — a playful, food-packaging touch. */
export function CircularBadge({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const text = 'NACHOLITO · FUSION SAUS · DOOR CHEFS · '
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#BD0A0A" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#FFC61A" strokeWidth="1.5" strokeDasharray="2 4" />
        <text className="font-mono" fontSize="9" letterSpacing="1.5" fill="#FFFDF7" fontWeight="600">
          <textPath href="#badge-circle" startOffset="0">
            {text}
          </textPath>
        </text>
        <text x="60" y="66" textAnchor="middle" className="font-display" fontSize="26" fill="#FFC61A">
          ★
        </text>
      </svg>
    </motion.div>
  )
}
