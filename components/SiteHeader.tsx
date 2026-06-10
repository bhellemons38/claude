import Link from 'next/link'
import { Logo } from './Logo'

export function SiteHeader() {
  return (
    <header className="bg-geel border-b-2 border-inkt sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-7 h-[64px] flex items-center justify-between">
        <Link href="/bestellen" aria-label="Nacholito home">
          <Logo size="sm" />
        </Link>
        <div className="text-right hidden sm:block">
          <p className="font-display text-sm tracking-[0.18em] uppercase text-inkt">Foodservice bestelportaal</p>
          <p className="text-xs text-inkt-zacht font-semibold">Geen MOQ · iDEAL of op rekening</p>
        </div>
      </div>
    </header>
  )
}
