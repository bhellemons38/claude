'use client'

import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Reveal } from './motion'

const NAV = [
  { href: '#smaken', label: 'Smaken' },
  { href: '#voordelen', label: 'Voordelen' },
  { href: '#prijzen', label: 'Prijzen' },
  { href: '#faq', label: 'FAQ' },
]

export function Footer() {
  return (
    <footer className="bg-inkt text-zand">
      {/* final CTA band */}
      <div className="border-b-2 border-zand/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-16 sm:py-20">
          <Reveal className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div className="max-w-xl">
              <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">
                Klaar om je kaart <span className="text-geel">op smaak</span> te brengen?
              </h2>
              <p className="mt-3 text-zand/70 font-medium">
                Kies je smaken, reken af met iDEAL en ontvang je bestelling binnen 3–5 werkdagen.
              </p>
            </div>
            <Link href="/bestellen" className="btn-yellow flex-none">
              Bestel nu <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* footer columns */}
      <div className="max-w-6xl mx-auto px-4 sm:px-7 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-zand/60 max-w-xs">
              Fusion sauzen met restaurant-diepte, door chefs ontwikkeld. Voor de professional én thuis.
            </p>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.18em] uppercase text-geel mb-3">Ontdek</p>
            <ul className="space-y-2 text-sm">
              {NAV.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-zand/70 hover:text-geel transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.18em] uppercase text-geel mb-3">Bestellen</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/bestellen" className="text-zand/70 hover:text-geel transition-colors">
                  Foodservice bestelportaal
                </Link>
              </li>
              <li>
                <a href="#prijzen" className="text-zand/70 hover:text-geel transition-colors">
                  Prijzen &amp; verpakkingen
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm tracking-[0.18em] uppercase text-geel mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-zand/70">
              <li>
                <a href="mailto:info@nacholito.nl" className="hover:text-geel transition-colors">
                  info@nacholito.nl
                </a>
              </li>
              <li>Goeseelsstraat 16</li>
              <li>4817 MV Breda</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zand/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zand/50">
          <p>© {new Date().getFullYear()} Nacholito · Sample Kitchen B.V. · KVK 84282495</p>
          <p>Met liefde gemaakt in Breda</p>
        </div>
      </div>
    </footer>
  )
}
