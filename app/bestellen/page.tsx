'use client'

import { useState, useMemo } from 'react'
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

  function setQty(productId: string, raw: string) {
    const val = parseInt(raw, 10)
    setQuantities(q => ({ ...q, [productId]: isNaN(val) ? 0 : val }))
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

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0)
  const btw = Math.round(subtotal * BTW_RATE * 100) / 100
  const total = Math.round((subtotal + btw) * 100) / 100
  const belowMinimum = subtotal > 0 && subtotal < MIN_ORDER_EXCL_BTW

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

    if (!validateForm()) return

    if (lines.length === 0) {
      setError('Selecteer minimaal één product om te bestellen.')
      return
    }
    if (belowMinimum) {
      setError(`Minimale bestelwaarde is ${formatEur(MIN_ORDER_EXCL_BTW)} excl. BTW.`)
      return
    }

    // Check pack size multiples
    for (const { product, quantity } of lines) {
      if (quantity % product.packSize !== 0) {
        setError(`${product.name}: bestelhoeveelheid moet een veelvoud van ${product.packSize} zijn.`)
        return
      }
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

      // Redirect to Mollie checkout
      window.location.href = data.checkoutUrl
    } catch {
      setError('Verbindingsfout. Controleer uw internetverbinding en probeer het opnieuw.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SiteHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy">Groothandel bestellen</h1>
          <p className="text-slate-500 mt-1">
            Vul uw bedrijfsgegevens in en selecteer de gewenste producten. Minimale bestelwaarde:{' '}
            <strong>{formatEur(MIN_ORDER_EXCL_BTW)}</strong> excl. BTW.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Company details */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-slate-100">
                  Bedrijfsgegevens
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Bedrijfsnaam"
                    required
                    value={customer.companyName}
                    onChange={v => setCustomerField('companyName', v)}
                    error={fieldErrors.companyName}
                    placeholder="Café De Kroeg B.V."
                  />
                  <Field
                    label="Contactpersoon"
                    required
                    value={customer.contactName}
                    onChange={v => setCustomerField('contactName', v)}
                    error={fieldErrors.contactName}
                    placeholder="Jan de Vries"
                  />
                  <Field
                    label="E-mailadres"
                    required
                    type="email"
                    value={customer.email}
                    onChange={v => setCustomerField('email', v)}
                    error={fieldErrors.email}
                    placeholder="inkoop@bedrijf.nl"
                  />
                  <Field
                    label="Telefoonnummer"
                    required
                    type="tel"
                    value={customer.phone}
                    onChange={v => setCustomerField('phone', v)}
                    error={fieldErrors.phone}
                    placeholder="+31 6 12345678"
                  />
                  <Field
                    label="KVK-nummer"
                    required
                    value={customer.kvkNumber}
                    onChange={v => setCustomerField('kvkNumber', v)}
                    error={fieldErrors.kvkNumber}
                    placeholder="12345678"
                  />
                </div>
              </section>

              {/* Delivery address */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-slate-100">
                  Bezorgadres
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field
                      label="Straat en huisnummer"
                      required
                      value={customer.deliveryAddress}
                      onChange={v => setCustomerField('deliveryAddress', v)}
                      error={fieldErrors.deliveryAddress}
                      placeholder="Kerkstraat 12"
                    />
                  </div>
                  <Field
                    label="Postcode"
                    required
                    value={customer.deliveryPostcode}
                    onChange={v => setCustomerField('deliveryPostcode', v)}
                    error={fieldErrors.deliveryPostcode}
                    placeholder="4811 AB"
                  />
                  <Field
                    label="Plaats"
                    required
                    value={customer.deliveryCity}
                    onChange={v => setCustomerField('deliveryCity', v)}
                    error={fieldErrors.deliveryCity}
                    placeholder="Breda"
                  />
                </div>
              </section>

              {/* Product selection */}
              <section className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-base font-semibold text-navy mb-1 pb-2 border-b border-slate-100">
                  Producten selecteren
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                  Minimale afname per product: 6 flessen (veelvoud van 6).
                </p>
                <div className="space-y-4">
                  {PRODUCTS.map(product => {
                    const qty = quantities[product.id] ?? 0
                    const lineTotal = qty * product.price
                    const isValid = qty === 0 || (qty >= product.minQty && qty % product.packSize === 0)
                    return (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-4 transition-colors ${
                          qty > 0 && isValid
                            ? 'border-gold bg-amber-50'
                            : qty > 0 && !isValid
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-navy text-sm">{product.name}</h3>
                              <span className="text-xs bg-navy text-gold px-2 py-0.5 rounded-full font-medium">
                                {formatEur(product.price)}/fles
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{product.description}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              Verpakking: {product.unit} · Min. {product.minQty} flessen
                            </p>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-1 min-w-[120px]">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setQty(product.id, String(Math.max(0, qty - product.packSize)))}
                                className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-lg leading-none"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min={0}
                                step={product.packSize}
                                value={qty || ''}
                                onChange={e => setQty(product.id, e.target.value)}
                                placeholder="0"
                                className="w-16 text-center border border-slate-300 rounded-lg py-1.5 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setQty(product.id, String(qty + product.packSize))}
                                className="w-8 h-8 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-lg leading-none"
                              >
                                +
                              </button>
                            </div>
                            {qty > 0 && (
                              <p className="text-sm font-semibold text-navy">{formatEur(lineTotal)}</p>
                            )}
                            {qty > 0 && !isValid && (
                              <p className="text-xs text-red-600">
                                Veelvoud van {product.packSize} vereist
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* Right: order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <section className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-slate-100">
                    Besteloverzicht
                  </h2>

                  {lines.length === 0 ? (
                    <p className="text-sm text-slate-400 py-4 text-center">
                      Selecteer producten om uw bestelling samen te stellen.
                    </p>
                  ) : (
                    <div className="space-y-2 mb-4">
                      {lines.map(({ product, quantity, lineTotal }) => (
                        <div key={product.id} className="flex justify-between text-sm">
                          <div>
                            <p className="font-medium text-navy text-xs leading-tight">{product.name}</p>
                            <p className="text-slate-400 text-xs">{quantity} × {formatEur(product.price)}</p>
                          </div>
                          <p className="font-semibold text-navy">{formatEur(lineTotal)}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {lines.length > 0 && (
                    <div className="border-t border-slate-100 pt-3 space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Subtotaal excl. BTW</span>
                        <span className="text-navy font-medium">{formatEur(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">BTW 9%</span>
                        <span className="text-navy">{formatEur(btw)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold pt-1 border-t border-slate-200">
                        <span className="text-navy">Totaal incl. BTW</span>
                        <span className="text-navy">{formatEur(total)}</span>
                      </div>
                    </div>
                  )}

                  {belowMinimum && (
                    <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-xs text-amber-800">
                        Minimale bestelwaarde: <strong>{formatEur(MIN_ORDER_EXCL_BTW)}</strong> excl. BTW.
                        Voeg nog{' '}
                        <strong>{formatEur(MIN_ORDER_EXCL_BTW - subtotal)}</strong> toe.
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || lines.length === 0 || belowMinimum}
                    className="mt-4 w-full bg-gold hover:bg-gold-dark disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
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
                        Betalen via iDEAL
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Betaling via iDEAL · Beveiligde verbinding
                  </p>
                </section>

                <div className="mt-4 p-4 bg-navy rounded-xl text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300 mb-2">Leveringsinformatie</p>
                  <p>Levertijd: 3–5 werkdagen</p>
                  <p>Bezorging door heel Nederland</p>
                  <p>Factuur wordt automatisch aangemaakt</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <SiteFooter />
    </div>
  )
}

// ─── Field helper component ────────────────────────────────────────────────
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
      <label className="block text-xs font-medium text-slate-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-colors ${
          error ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
