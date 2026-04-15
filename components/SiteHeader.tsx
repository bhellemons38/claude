import { Logo } from './Logo'

export function SiteHeader() {
  return (
    <header className="bg-navy border-b border-navy-light">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400">B2B Bestelportaal</p>
          <p className="text-xs text-slate-500">Alleen voor horeca ondernemers</p>
        </div>
      </div>
    </header>
  )
}
