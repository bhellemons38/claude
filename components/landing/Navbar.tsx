'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/Logo'

const LINKS = [
  { href: '#smaken', label: 'Smaken' },
  { href: '#voordelen', label: 'Voordelen' },
  { href: '#prijzen', label: 'Prijzen' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduce ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`sticky top-0 z-50 border-b-2 border-inkt transition-colors duration-300 ${
        scrolled ? 'bg-geel/95 backdrop-blur-md' : 'bg-geel'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-7 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Nacholito home" className="flex-none">
          <Logo size="sm" />
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-display text-lg tracking-wide uppercase text-inkt hover:text-rood transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/bestellen" className="btn-primary btn-sm">
            Bestel nu
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          className="md:hidden w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block h-0.5 w-6 bg-inkt transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-inkt transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-inkt transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t-2 border-inkt/15 bg-geel"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-display text-2xl uppercase text-inkt hover:text-rood transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/bestellen" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Bestel nu
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
