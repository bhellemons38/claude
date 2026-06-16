'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.2, 0.8, 0.2, 1] as const

/** Staggered word-by-word reveal, masked from below (21st.dev animated-hero pattern). */
export function WordReveal({
  text,
  className,
  delay = 0,
  step = 0.08,
}: {
  text: string
  className?: string
  delay?: number
  step?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden align-bottom leading-[0.9]">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '108%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: delay + i * step }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
