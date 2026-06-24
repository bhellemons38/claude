'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const LINKS = [
  { href: '#smaken', label: 'Smaken' },
  { href: '#kanalen', label: 'Kanalen' },
  { href: '#recepten', label: 'Recepten' },
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
      initial={reduce ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4"
    >
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-300 sm:px-5 ${
          scrolled ? 'border border-neutral-900/10 bg-neutral-50/90 shadow-warm backdrop-blur-md' : 'border border-transparent'
        }`}
      >
        <Link href="/" aria-label="Nacholito home" className="flex items-center">
          <Image src="/assets/logo.png" alt="Nacholito" width={84} height={28} style={{ height: 28, width: 'auto' }} priority />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="rounded-full px-3.5 py-2 text-micro font-semibold text-neutral-700 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link href="/bestellen" className="lp-btn lp-btn--primary group px-4 py-2 text-micro">
            Bestel nu
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          aria-expanded={open}
          className="-mr-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className={`block h-0.5 w-5 bg-neutral-900 transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-neutral-900 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-neutral-900 transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-5xl rounded-3xl border border-neutral-900/10 bg-neutral-50/95 p-2 shadow-warm backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-semibold text-neutral-900 transition-colors hover:bg-neutral-900/5">
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-1.5">
                <Link href="/bestellen" onClick={() => setOpen(false)} className="lp-btn lp-btn--primary w-full">
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
