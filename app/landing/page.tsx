import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingHero } from '@/components/landing/landing-hero'
import { PRODUCTS } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Nacholito — Van ambacht naar gemak',
  description:
    'Krachtige fusion sauzen voor professionele keukens. Direct bestellen met iDEAL of op rekening, geen MOQ op de fles.',
}

export default function LandingPage() {
  return (
    <main className="bg-navy text-white">
      <LandingHero />

      <section className="border-t border-white/10 bg-navy-light/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              Het assortiment
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
              Vier smaken, één manier van werken.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border border-white/10 bg-navy p-6 transition hover:border-gold/40"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {p.unit}
                </div>
                <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/bestellen"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-bold uppercase tracking-wider text-navy shadow-[0_8px_0_#a87b2a] transition hover:shadow-[0_12px_0_#a87b2a]"
            >
              Naar het bestelformulier <span aria-hidden>→</span>
            </Link>
            <span className="text-sm text-white/60">iDEAL of op rekening · vanaf €75 excl. BTW</span>
          </div>
        </div>
      </section>
    </main>
  )
}
