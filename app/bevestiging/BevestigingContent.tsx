'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Order } from '@/types'

function formatEur(n: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso))
}

type State = 'loading' | 'paid' | 'pending' | 'failed' | 'not-found'

export function BevestigingContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId')
  const [state, setState] = useState<State>('loading')
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!orderId) {
      setState('not-found')
      return
    }

    let attempts = 0
    const maxAttempts = 8 // poll up to ~16s waiting for webhook

    async function poll() {
      try {
        const res = await fetch(`/api/orders/${orderId}`)
        if (res.status === 404) {
          setState('not-found')
          return
        }
        if (!res.ok) throw new Error('fetch error')
        const data = await res.json()
        const o: Order = data.order
        setOrder(o)

        if (o.paymentStatus === 'paid') {
          setState('paid')
        } else if (o.paymentStatus === 'failed' || o.paymentStatus === 'expired') {
          setState('failed')
        } else {
          // still pending — retry
          attempts++
          if (attempts < maxAttempts) {
            setTimeout(poll, 2000)
          } else {
            setState('pending')
          }
        }
      } catch {
        setState('not-found')
      }
    }

    poll()
  }, [orderId])

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <svg className="animate-spin w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p>Betaling controleren…</p>
      </div>
    )
  }

  if (state === 'not-found') {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">?</div>
        <h1 className="text-xl font-bold text-navy mb-2">Bestelling niet gevonden</h1>
        <p className="text-slate-500 mb-6">We konden uw bestelling niet vinden. Controleer uw e-mail voor een bevestiging.</p>
        <Link href="/bestellen" className="inline-block bg-gold text-white font-bold px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors">
          Terug naar bestelformulier
        </Link>
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-navy mb-2">Betaling niet geslaagd</h1>
        <p className="text-slate-500 mb-6">
          Uw bestelling {order?.orderNumber} is aangemaakt maar de betaling is niet gelukt of verlopen.
          Probeer het opnieuw.
        </p>
        <Link href="/bestellen" className="inline-block bg-gold text-white font-bold px-6 py-3 rounded-lg hover:bg-gold-dark transition-colors">
          Opnieuw bestellen
        </Link>
      </div>
    )
  }

  if (state === 'pending' && order) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-navy mb-2">Betaling in behandeling</h1>
        <p className="text-slate-500 mb-2">
          Bestelnummer: <strong>{order.orderNumber}</strong>
        </p>
        <p className="text-slate-500 mb-6">
          Uw betaling wordt verwerkt. U ontvangt een bevestigingsmail zodra de betaling is afgerond.
        </p>
      </div>
    )
  }

  if (!order) return null

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-green-800">Betaling geslaagd — bedankt voor uw bestelling!</h1>
          <p className="text-sm text-green-700 mt-1">
            Een bevestigingsmail is verstuurd naar <strong>{order.customer.email}</strong>.
          </p>
        </div>
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-500">Bestelnummer</p>
            <p className="text-xl font-bold text-navy">{order.orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Besteldatum</p>
            <p className="text-sm font-medium text-navy">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Bezorgadres</p>
            <p className="text-sm text-navy font-medium">{order.customer.companyName}</p>
            <p className="text-sm text-slate-600">t.a.v. {order.customer.contactName}</p>
            <p className="text-sm text-slate-600">{order.customer.deliveryAddress}</p>
            <p className="text-sm text-slate-600">
              {order.customer.deliveryPostcode} {order.customer.deliveryCity}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Verwachte levering</p>
            <p className="text-sm text-navy font-semibold">3–5 werkdagen</p>
            <p className="text-xs text-slate-500 mt-1">Na betalingsbevestiging</p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs text-slate-500 pb-2 font-medium">Product</th>
              <th className="text-center text-xs text-slate-500 pb-2 font-medium">Aantal</th>
              <th className="text-right text-xs text-slate-500 pb-2 font-medium">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {order.lines.map(line => (
              <tr key={line.productId}>
                <td className="py-2 text-navy">{line.productName}</td>
                <td className="py-2 text-center text-slate-600">{line.quantity}</td>
                <td className="py-2 text-right font-medium text-navy">{formatEur(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t border-slate-200 mt-2 pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Subtotaal excl. BTW</span>
            <span className="text-navy">{formatEur(order.subtotalExclBtw)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">BTW (9%)</span>
            <span className="text-navy">{formatEur(order.btwAmount)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-1">
            <span className="text-navy">Totaal incl. BTW</span>
            <span className="text-navy">{formatEur(order.totalInclBtw)}</span>
          </div>
        </div>
      </div>

      <div className="bg-navy rounded-xl p-5 text-sm text-slate-300">
        <p className="font-semibold text-white mb-2">Wat gebeurt er nu?</p>
        <ul className="space-y-1.5 list-disc list-inside text-slate-400">
          <li>Uw factuur wordt automatisch aangemaakt en per e-mail verstuurd.</li>
          <li>Uw bestelling wordt verwerkt en binnen 3–5 werkdagen bezorgd.</li>
          <li>Bij vragen kunt u contact opnemen via <a href="mailto:info@nacholito.nl" className="text-gold hover:underline">info@nacholito.nl</a>.</li>
        </ul>
      </div>

      <div className="text-center">
        <Link href="/bestellen" className="inline-block border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
          Nog een bestelling plaatsen
        </Link>
      </div>
    </div>
  )
}
