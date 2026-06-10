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
      <div className="flex flex-col items-center justify-center py-20 text-inkt-zacht">
        <svg className="animate-spin w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="font-semibold">Betaling controleren…</p>
      </div>
    )
  }

  if (state === 'not-found') {
    return (
      <div className="text-center py-16">
        <h1 className="font-display uppercase text-4xl text-rood mb-2">Bestelling niet gevonden</h1>
        <p className="text-inkt-zacht mb-6 font-medium">We konden uw bestelling niet vinden. Controleer uw e-mail voor een bevestiging.</p>
        <Link href="/bestellen" className="btn-primary inline-flex">Terug naar bestelformulier</Link>
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div className="text-center py-16">
        <span className="eyebrow block mb-3">Betaling mislukt</span>
        <h1 className="font-display uppercase text-4xl sm:text-5xl text-rood mb-3">Dat ging niet goed.</h1>
        <p className="text-inkt-zacht mb-6 font-medium max-w-md mx-auto">
          Uw bestelling <strong>{order?.orderNumber}</strong> is aangemaakt maar de betaling is niet gelukt of verlopen.
          Probeer het opnieuw — uw keuze blijft bewaard tot u opnieuw bestelt.
        </p>
        <Link href="/bestellen" className="btn-primary inline-flex">Opnieuw bestellen <span>→</span></Link>
      </div>
    )
  }

  if (state === 'pending' && order) {
    return (
      <div className="text-center py-16">
        <span className="eyebrow block mb-3">Even geduld</span>
        <h1 className="font-display uppercase text-4xl sm:text-5xl mb-3">Betaling in behandeling</h1>
        <p className="text-inkt-zacht mb-2 font-medium">
          Bestelnummer: <strong className="text-inkt">{order.orderNumber}</strong>
        </p>
        <p className="text-inkt-zacht font-medium max-w-md mx-auto">
          Uw betaling wordt verwerkt. U ontvangt een bevestigingsmail zodra de betaling is afgerond.
        </p>
      </div>
    )
  }

  if (!order) return null

  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="bg-rood text-zand border-2 border-inkt rounded-[18px] p-6 sm:p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--geel) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <span className="eyebrow !text-geel block mb-2 relative">Betaling gelukt</span>
        <h1 className="font-display uppercase text-4xl sm:text-5xl mb-2 relative">Bedankt voor je bestelling!</h1>
        <p className="text-zand/85 font-medium relative">
          Een bevestigingsmail is verstuurd naar <strong className="text-wit">{order.customer.email}</strong>.
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-wit border-2 border-inkt rounded-[18px] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b-2 border-dashed border-inkt/15">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-inkt-zacht">Bestelnummer</p>
            <p className="font-display text-2xl">{order.orderNumber}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase tracking-wide text-inkt-zacht">Besteldatum</p>
            <p className="font-semibold text-sm">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <p className="eyebrow mb-1">Bezorgadres</p>
            <p className="font-bold">{order.customer.companyName}</p>
            <p className="text-sm text-inkt-zacht font-medium">t.a.v. {order.customer.contactName}</p>
            <p className="text-sm text-inkt-zacht font-medium">{order.customer.deliveryAddress}</p>
            <p className="text-sm text-inkt-zacht font-medium">{order.customer.deliveryPostcode} {order.customer.deliveryCity}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Verwachte levering</p>
            <p className="font-display text-2xl leading-none text-rood">3–5 werkdagen</p>
            <p className="text-xs text-inkt-zacht font-semibold mt-1">Na betalingsbevestiging</p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-inkt/15">
              <th className="text-left text-xs uppercase tracking-wide text-inkt-zacht pb-2 font-bold">Product</th>
              <th className="text-center text-xs uppercase tracking-wide text-inkt-zacht pb-2 font-bold">Aantal</th>
              <th className="text-right text-xs uppercase tracking-wide text-inkt-zacht pb-2 font-bold">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-inkt/5">
            {order.lines.map(line => (
              <tr key={line.productId}>
                <td className="py-2.5 font-semibold">{line.productName}</td>
                <td className="py-2.5 text-center text-inkt-zacht font-medium">{line.quantity}</td>
                <td className="py-2.5 text-right font-bold">{formatEur(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-t-2 border-inkt/15 mt-2 pt-3 space-y-1.5">
          <div className="flex justify-between text-sm text-inkt-zacht font-medium">
            <span>Subtotaal excl. BTW</span>
            <span>{formatEur(order.subtotalExclBtw)}</span>
          </div>
          <div className="flex justify-between text-sm text-inkt-zacht font-medium">
            <span>BTW (9%)</span>
            <span>{formatEur(order.btwAmount)}</span>
          </div>
          <div className="flex justify-between font-display text-2xl pt-1">
            <span>Totaal incl. BTW</span>
            <span className="text-rood">{formatEur(order.totalInclBtw)}</span>
          </div>
        </div>
      </div>

      <div className="bg-inkt text-zand border-2 border-inkt rounded-[18px] p-6 sm:p-8">
        <p className="font-display uppercase text-xl text-geel mb-3">Wat gebeurt er nu?</p>
        <ul className="space-y-2 text-sm font-medium">
          <li className="flex gap-3"><span className="flex-none w-5 h-5 mt-0.5 rounded-full bg-geel"></span>Uw factuur wordt automatisch aangemaakt en per e-mail verstuurd.</li>
          <li className="flex gap-3"><span className="flex-none w-5 h-5 mt-0.5 rounded-full bg-geel"></span>Uw bestelling wordt verwerkt en binnen 3–5 werkdagen bezorgd.</li>
          <li className="flex gap-3"><span className="flex-none w-5 h-5 mt-0.5 rounded-full bg-geel"></span>Vragen? Mail naar <a href="mailto:info@nacholito.nl" className="text-geel underline">info@nacholito.nl</a>.</li>
        </ul>
      </div>

      <div className="text-center">
        <Link href="/bestellen" className="btn-ghost inline-flex">Nog een bestelling plaatsen</Link>
      </div>
    </div>
  )
}
