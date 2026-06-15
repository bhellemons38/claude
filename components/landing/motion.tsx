'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.2, 0.8, 0.2, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

/**
 * Scroll-reveal wrapper. Animates children in once they enter the viewport,
 * and stays still for users who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
      }}
    >
      {children}
    </Tag>
  )
}

/** Container that staggers the reveal of its direct <Reveal> children. */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      {children}
    </motion.div>
  )
}

export { motion }
