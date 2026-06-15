'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

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
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`max-w-5xl mx-auto flex items-center justify-between gap-4 rounded-full px-4 sm:px-5 h-14 transition-all duration-300 ${
          scrolled ? 'lp-glass' : 'border border-transparent'
        }`}
      >
        <Link href="/" aria-label="Nacholito home" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="Nacholito" width={84} height={28} style={{ height: 28, width: 'auto' }} priority />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3.5 py-2 rounded-full text-sm font-medium text-inkt-zacht hover:text-inkt hover:bg-inkt/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/bestellen"
            className="group inline-flex items-center gap-1.5 rounded-full bg-rood px-4 py-2 text-sm font-semibold text-wit transition-transform hover:scale-[1.03] active:scale-95"
          >
            Bestel nu
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          className="md:hidden w-10 h-10 -mr-1 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block h-0.5 w-5 bg-inkt transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-inkt transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-inkt transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-5xl mx-auto mt-2 rounded-3xl lp-glass p-2"
          >
            <ul className="flex flex-col">
              {LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-2xl text-base font-medium text-inkt/80 hover:bg-inkt/5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-1.5">
                <Link
                  href="/bestellen"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-full bg-rood px-4 py-3 text-sm font-semibold text-wit"
                >
                  Bestel nu →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
