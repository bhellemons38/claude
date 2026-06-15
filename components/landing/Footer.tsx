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
    <footer className="relative border-t border-inkt/[0.08]">
      {/* final CTA */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-10 mx-auto h-72 w-[760px] blur-3xl lp-glow-red opacity-50" aria-hidden />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-7 py-20 sm:py-24">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-geist font-semibold tracking-[-0.02em] text-[clamp(32px,5vw,60px)] leading-[1.02] text-inkt">
              Klaar om je kaart <span className="lp-gradient-text">op smaak</span> te brengen?
            </h2>
            <p className="mt-4 text-inkt-zacht">
              Kies je smaken, reken af met iDEAL en ontvang je bestelling binnen 3–5 werkdagen.
            </p>
            <Link
              href="/bestellen"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-rood px-7 py-4 text-sm font-semibold text-wit transition-transform hover:scale-[1.03] active:scale-95"
            >
              Bestel nu
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* columns */}
      <div className="border-t border-inkt/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <Image src="/assets/logo.png" alt="Nacholito" width={108} height={36} style={{ height: 36, width: 'auto' }} />
              <p className="mt-4 max-w-xs text-sm text-inkt-zacht leading-relaxed">
                Fusion sauzen met restaurant-diepte, door chefs ontwikkeld. Voor de professional én thuis.
              </p>
            </div>

            <div>
              <p className="lp-pill text-inkt-zacht">Ontdek</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV.map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="text-inkt-zacht hover:text-rood transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="lp-pill text-inkt-zacht">Bestellen</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/bestellen" className="text-inkt-zacht hover:text-rood transition-colors">Foodservice bestelportaal</Link></li>
                <li><a href="#prijzen" className="text-inkt-zacht hover:text-rood transition-colors">Prijzen &amp; verpakkingen</a></li>
              </ul>
            </div>

            <div>
              <p className="lp-pill text-inkt-zacht">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-inkt-zacht">
                <li><a href="mailto:info@nacholito.nl" className="hover:text-rood transition-colors">info@nacholito.nl</a></li>
                <li>Goeseelsstraat 16</li>
                <li>4817 MV Breda</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-inkt/[0.08] pt-6 lp-pill text-inkt-zacht">
            <p>© {new Date().getFullYear()} Nacholito · Sample Kitchen B.V. · KVK 84282495</p>
            <p>Met liefde gemaakt in Breda</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
