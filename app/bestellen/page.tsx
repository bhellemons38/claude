'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PRODUCTS, BTW_RATE, MIN_ORDER_EXCL_BTW } from '@/lib/products'
import { CustomerInfo } from '@/types'

const EMPTY_CUSTOMER: CustomerInfo = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  kvkNumber: '',
  deliveryAddress: '',
  deliveryCity: '',
  deliveryPostcode: '',
}

function formatEur(n: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(n)
}

export default function BestellenPage() {
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  function setCustomerField(field: keyof CustomerInfo, value: string) {
    setCustomer(c => ({ ...c, [field]: value }))
    setFieldErrors(e => ({ ...e, [field]: '' }))
  }

  function setQty(productId: string, val: number) {
    setQuantities(q => ({ ...q, [productId]: Math.max(0, val) }))
  }

  const lines = useMemo(() => {
    return PRODUCTS
      .map(p => ({
        product: p,
        quantity: quantities[p.id] ?? 0,
        lineTotal: (quantities[p.id] ?? 0) * p.price,
      }))
      .filter(l => l.quantity > 0)
  }, [quantities])

  const itemCount = lines.reduce((s, l) => s + l.quantity, 0)
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0)
  const btw = Math.round(subtotal * BTW_RATE * 100) / 100
  const total = Math.round((subtotal + btw) * 100) / 100
  const belowMinimum = subtotal > 0 && subtotal < MIN_ORDER_EXCL_BTW
  const remaining = Math.max(0, MIN_ORDER_EXCL_BTW - subtotal)

  function validateForm(): boolean {
    const errors: Record<string, string> = {}
    const required: { key: keyof CustomerInfo; label: string }[] = [
      { key: 'companyName', label: 'Bedrijfsnaam' },
      { key: 'contactName', label: 'Contactpersoon' },
      { key: 'email', label: 'E-mailadres' },
      { key: 'phone', label: 'Telefoonnummer' },
      { key: 'kvkNumber', label: 'KVK-nummer' },
      { key: 'deliveryAddress', label: 'Bezorgadres' },
      { key: 'deliveryPostcode', label: 'Postcode' },
      { key: 'deliveryCity', label: 'Plaats' },
    ]
    for (const { key, label } of required) {
      if (!customer[key].trim()) errors[key] = `${label} is verplicht`
    }
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      errors.email = 'Ongeldig e-mailadres'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (lines.length === 0) {
      setError('Selecteer minimaal één product om te bestellen.')
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (belowMinimum) {
      setError(`Minimale bestelwaarde is ${formatEur(MIN_ORDER_EXCL_BTW)} excl. BTW. Voeg nog ${formatEur(remaining)} toe.`)
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (!validateForm()) {
      document.getElementById('gegevens')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          lines: lines.map(l => ({ productId: l.product.id, quantity: l.quantity })),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er is iets misgegaan. Probeer het opnieuw.')
        return
      }

      window.location.href = data.checkoutUrl
    } catch {
      setError('Verbindingsfout. Controleer uw internetverbinding en probeer het opnieuw.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-zand pb-24 sm:pb-0">
      <SiteHeader />

      <form id="bestelform" onSubmit={handleSubmit} noValidate className="flex-1">
        {/* HERO */}
        <section className="bg-geel border-b-2 border-inkt relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(var(--inkt) 1.1px, transparent 1.1px)',
              backgroundSize: '26px 26px',
              maskImage: 'linear-gradient(180deg, transparent, #000 50%, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 50%, transparent)',
            }}
          />
          <div className="max-w-6xl mx-auto px-4 sm:px-7 py-12 sm:py-16 relative">
            <span className="eyebrow block mb-3">Foodservice · Direct bestellen</span>
            <h1 className="font-display uppercase text-rood text-[clamp(40px,8vw,80px)] leading-[0.95]">
              Bestel je sauzen.
              <span className="block text-inkt">Vandaag besteld, snel geleverd.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-medium max-w-[48ch] text-inkt-zacht">
              Kies je smaken, vul je gegevens in en reken direct af met iDEAL. Geen minimumafname per fles —
              je factuur staat automatisch klaar.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3 max-w-2xl">
              {['Geen MOQ op de fles', 'iDEAL of op rekening', 'Factuur direct in je mail'].map(usp => (
                <li key={usp} className="flex items-center gap-2 text-sm font-bold">
                  <span className="flex-none w-6 h-6 rounded-full bg-rood text-wit flex items-center justify-center text-xs font-extrabold">✓</span>
                  {usp}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-7 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* LEFT: products + form */}
            <div className="lg:col-span-2 space-y-10">

              {/* PRODUCT SELECTION */}
              <section id="shop">
                <span className="eyebrow block mb-2">Stap 1</span>
                <h2 className="font-display uppercase text-3xl sm:text-4xl mb-1">Kies je smaken</h2>
                <p className="text-inkt-zacht text-sm mb-5">750 ml flessen, per stuk te bestellen.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {PRODUCTS.map(product => {
                    const qty = quantities[product.id] ?? 0
                    const active = qty > 0
                    return (
                      <article
                        key={product.id}
                        className={`bg-wit border-2 rounded-[18px] overflow-hidden flex flex-col transition-shadow ${
                          active ? 'border-rood shadow-card' : 'border-inkt'
                        }`}
                      >
                        <div className="relative aspect-[16/10] border-b-2 border-inkt bg-zand-donker overflow-hidden">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                          {product.badge && (
                            <span className="absolute top-3 left-3 bg-geel border-2 border-inkt rounded-full font-display text-xs tracking-wider uppercase px-3 py-1">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="font-display text-xs tracking-[0.18em] uppercase text-rood">{product.origin}</div>
                          <h3 className="font-display uppercase text-2xl mt-0.5">{product.name}</h3>
                          <p className="text-sm text-inkt-zacht font-medium mt-1.5 mb-3 flex-1">{product.description}</p>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-display text-xl leading-none">{formatEur(product.price)}</p>
                              <p className="text-[11px] uppercase tracking-wide text-inkt-zacht font-bold mt-0.5">{product.unit} · excl. BTW</p>
                            </div>
                            <div className="flex items-center gap-1.5 border-2 border-inkt rounded-full p-1 bg-zand">
                              <button
                                type="button"
                                onClick={() => setQty(product.id, qty - 1)}
                                disabled={qty === 0}
                                aria-label={`Minder ${product.name}`}
                                className="w-9 h-9 rounded-full bg-wit border border-inkt/20 flex items-center justify-center font-display text-xl disabled:opacity-30 hover:bg-zand-donker transition-colors"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-display text-lg tabular-nums">{qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(product.id, qty + 1)}
                                aria-label={`Meer ${product.name}`}
                                className="w-9 h-9 rounded-full bg-rood text-wit flex items-center justify-center font-display text-xl hover:bg-rood-diep transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>

              {/* CUSTOMER INFO */}
              <section id="gegevens">
                <span className="eyebrow block mb-2">Stap 2</span>
                <h2 className="font-display uppercase text-3xl sm:text-4xl mb-5">Jouw gegevens</h2>

                <div className="bg-wit border-2 border-inkt rounded-[18px] p-5 sm:p-7 space-y-6">
                  <div>
                    <h3 className="font-display uppercase text-lg mb-3 text-rood">Bedrijf &amp; contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Bedrijfsnaam" required value={customer.companyName} onChange={v => setCustomerField('companyName', v)} error={fieldErrors.companyName} placeholder="Café De Kroeg B.V." />
                      <Field label="Contactpersoon" required value={customer.contactName} onChange={v => setCustomerField('contactName', v)} error={fieldErrors.contactName} placeholder="Jan de Vries" />
                      <Field label="E-mailadres" required type="email" value={customer.email} onChange={v => setCustomerField('email', v)} error={fieldErrors.email} placeholder="inkoop@bedrijf.nl" />
                      <Field label="Telefoonnummer" required type="tel" value={customer.phone} onChange={v => setCustomerField('phone', v)} error={fieldErrors.phone} placeholder="+31 6 12345678" />
                      <Field label="KVK-nummer" required value={customer.kvkNumber} onChange={v => setCustomerField('kvkNumber', v)} error={fieldErrors.kvkNumber} placeholder="12345678" />
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-inkt/15 pt-6">
                    <h3 className="font-display uppercase text-lg mb-3 text-rood">Bezorgadres</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Field label="Straat en huisnummer" required value={customer.deliveryAddress} onChange={v => setCustomerField('deliveryAddress', v)} error={fieldErrors.deliveryAddress} placeholder="Kerkstraat 12" />
                      </div>
                      <Field label="Postcode" required value={customer.deliveryPostcode} onChange={v => setCustomerField('deliveryPostcode', v)} error={fieldErrors.deliveryPostcode} placeholder="4811 AB" />
                      <Field label="Plaats" required value={customer.deliveryCity} onChange={v => setCustomerField('deliveryCity', v)} error={fieldErrors.deliveryCity} placeholder="Breda" />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT: sticky order summary (desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummaryCard
                  lines={lines}
                  subtotal={subtotal}
                  btw={btw}
                  total={total}
                  belowMinimum={belowMinimum}
                  remaining={remaining}
                  error={error}
                  submitting={submitting}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* MOBILE STICKY BUY BAR */}
      <div className="sm:hidden fixed left-0 right-0 bottom-0 z-50 bg-zand border-t-2 border-inkt px-4 py-3 flex items-center justify-between gap-4" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        <div className="leading-tight">
          <p className="font-display text-lg uppercase">{itemCount > 0 ? `${itemCount} fles${itemCount === 1 ? '' : 'sen'}` : 'Nog niets gekozen'}</p>
          <p className="text-xs font-bold text-inkt-zacht">{itemCount > 0 ? `${formatEur(total)} incl. BTW` : 'Kies hierboven je smaken'}</p>
        </div>
        <button
          type="submit"
          form="bestelform"
          disabled={submitting}
          className="btn-primary btn-sm whitespace-nowrap"
        >
          {submitting ? 'Bezig…' : 'Bestel nu'}
        </button>
      </div>

      <div className="hidden sm:block">
        <SiteFooter />
      </div>
    </div>
  )
}

// ─── Order summary ──────────────────────────────────────────────────────────
function OrderSummaryCard({
  lines,
  subtotal,
  btw,
  total,
  belowMinimum,
  remaining,
  error,
  submitting,
}: {
  lines: { product: { id: string; name: string; price: number; unit: string }; quantity: number; lineTotal: number }[]
  subtotal: number
  btw: number
  total: number
  belowMinimum: boolean
  remaining: number
  error: string | null
  submitting: boolean
}) {
  return (
    <div className="bg-inkt text-zand border-2 border-inkt rounded-[18px] p-6 shadow-card-lg">
      <span className="font-display text-sm tracking-[0.24em] uppercase text-geel block mb-2">Jouw bestelling</span>
      <h2 className="font-display uppercase text-3xl mb-4">Overzicht</h2>

      {lines.length === 0 ? (
        <p className="text-sm text-zand/60 py-6 text-center border-2 border-dashed border-zand/20 rounded-xl">
          Nog geen producten gekozen. Kies hierboven je smaken om te starten.
        </p>
      ) : (
        <div className="space-y-2.5 mb-4">
          {lines.map(({ product, quantity, lineTotal }) => (
            <div key={product.id} className="flex justify-between text-sm gap-2">
              <div>
                <p className="font-bold leading-tight">{product.name}</p>
                <p className="text-zand/50 text-xs">{quantity} × {formatEur(product.price)}</p>
              </div>
              <p className="font-display text-lg leading-tight">{formatEur(lineTotal)}</p>
            </div>
          ))}
        </div>
      )}

      {lines.length > 0 && (
        <div className="border-t border-zand/15 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm text-zand/70">
            <span>Subtotaal excl. BTW</span>
            <span>{formatEur(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-zand/70">
            <span>BTW 9%</span>
            <span>{formatEur(btw)}</span>
          </div>
          <div className="flex justify-between font-display text-2xl pt-1 border-t border-zand/15">
            <span>Totaal</span>
            <span className="text-geel">{formatEur(total)}</span>
          </div>
        </div>
      )}

      {belowMinimum && (
        <div className="mt-3 p-3 bg-geel/10 border border-geel/30 rounded-lg">
          <p className="text-xs text-geel font-semibold">
            Nog <strong>{formatEur(remaining)}</strong> tot de minimale bestelwaarde van {formatEur(subtotal + remaining)}.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-rood/20 border border-rood/40 rounded-lg">
          <p className="text-xs text-zand">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full mt-5 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Verwerken…
          </>
        ) : (
          <>
            Bestel met iDEAL <span>→</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-zand/40 mt-3 text-center font-semibold">
        Beveiligde betaling · Factuur direct in je mail · 3–5 werkdagen levertijd
      </p>
    </div>
  )
}

// ─── Field helper ───────────────────────────────────────────────────────────
function Field({
  label,
  required,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-inkt-zacht mb-1">
        {label}
        {required && <span className="text-rood ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border-2 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:ring-2 focus:ring-geel focus:border-rood outline-none transition-colors ${
          error ? 'border-rood bg-rood/5' : 'border-inkt/15 bg-zand/40'
        }`}
      />
      {error && <p className="text-xs text-rood font-semibold mt-1">{error}</p>}
    </div>
  )
}
