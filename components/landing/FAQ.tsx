'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'

const FAQS = [
  {
    q: 'Is er een minimale afname?',
    a: 'Nee, er is geen MOQ op de fles — je bestelt per stuk. Wel geldt een minimale bestelwaarde van € 75 exclusief BTW per order.',
  },
  {
    q: 'Hoe kan ik betalen?',
    a: 'Je rekent direct af met iDEAL, of je bestelt op rekening. Na betaling staat de factuur automatisch in je mail en in je boekhouding.',
  },
  {
    q: 'Hoe snel wordt mijn bestelling geleverd?',
    a: 'We leveren binnen 3 tot 5 werkdagen door heel Nederland. Je ontvangt een bevestiging zodra je bestelling onderweg is.',
  },
  {
    q: 'Zijn er ook grootverpakkingen?',
    a: 'Ja. Naast de fles van 750 ml leveren we 10 liter verpakkingen voor foodservice en centrale keukens, met staffelkorting op volume.',
  },
  {
    q: 'Kan ik eerst proeven?',
    a: 'Zeker. Bestel de proefbox met alle vier de smaken, of vraag een proeverij aan bij jou in de keuken.',
  },
]

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const id = `faq-${index}`

  return (
    <div className="lp-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
      >
        <span className="lp-display text-h3 text-neutral-900">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-2xl leading-none text-neutral-0"
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-body leading-relaxed text-neutral-700 sm:px-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-7 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="lp-label text-primary">Veelgestelde vragen</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Nog even <span className="lp-mark">dit</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <Item q={faq.q} a={faq.a} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
