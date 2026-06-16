'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from './motion'

const NAV = [
  { href: '#smaken', label: 'Smaken' },
  { href: '#voordelen', label: 'Voordelen' },
  { href: '#prijzen', label: 'Prijzen' },
  { href: '#faq', label: 'FAQ' },
]

export function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-neutral-100">
      {/* final CTA */}
      <div className="border-b border-neutral-0/10">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-7 sm:py-24">
          <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="lp-display text-h1 text-neutral-0">
                Klaar om je kaart <span className="text-accent">op smaak</span> te brengen?
              </h2>
              <p className="mt-4 text-body text-neutral-100/70">
                Kies je smaken, reken af met iDEAL en ontvang je bestelling binnen 3–5 werkdagen.
              </p>
            </div>
            <Link href="/bestellen" className="lp-btn lp-btn--primary group flex-none">
              Bestel nu
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* columns */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-7">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/assets/logo.png" alt="Nacholito" width={108} height={36} style={{ height: 36, width: 'auto' }} className="brightness-0 invert" />
            <p className="mt-4 max-w-xs text-micro leading-relaxed text-neutral-100/55">
              Fusion sauzen met restaurant-diepte, door chefs ontwikkeld. Voor de professional én thuis.
            </p>
          </div>

          <div>
            <p className="lp-label text-neutral-100/55">Ontdek</p>
            <ul className="mt-4 space-y-2.5 text-micro">
              {NAV.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-neutral-100/70 transition-colors hover:text-accent">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="lp-label text-neutral-100/55">Bestellen</p>
            <ul className="mt-4 space-y-2.5 text-micro">
              <li><Link href="/bestellen" className="text-neutral-100/70 transition-colors hover:text-accent">Foodservice bestelportaal</Link></li>
              <li><a href="#prijzen" className="text-neutral-100/70 transition-colors hover:text-accent">Prijzen &amp; verpakkingen</a></li>
            </ul>
          </div>

          <div>
            <p className="lp-label text-neutral-100/55">Contact</p>
            <ul className="mt-4 space-y-2.5 text-micro text-neutral-100/70">
              <li><a href="mailto:info@nacholito.nl" className="transition-colors hover:text-accent">info@nacholito.nl</a></li>
              <li>Goeseelsstraat 16</li>
              <li>4817 MV Breda</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-neutral-0/10 pt-6 sm:flex-row">
          <p className="lp-label text-neutral-100/45">© {new Date().getFullYear()} Nacholito · Sample Kitchen B.V. · KVK 84282495</p>
          <p className="lp-label text-neutral-100/45">Met liefde gemaakt in Breda</p>
        </div>
      </div>
    </footer>
  )
}
