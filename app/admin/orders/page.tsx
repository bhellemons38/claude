'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Order } from '@/types'
import { Logo } from '@/components/Logo'

function formatEur(n: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(n)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso))
}

const STATUS_LABELS: Record<Order['paymentStatus'], string> = {
  paid: 'Betaald',
  pending: 'In afwachting',
  failed: 'Mislukt',
  expired: 'Verlopen',
}

const STATUS_COLORS: Record<Order['paymentStatus'], string> = {
  paid: 'bg-green-100 text-green-800 border-green-300',
  pending: 'bg-geel/30 text-inkt border-geel',
  failed: 'bg-rood/10 text-rood border-rood/40',
  expired: 'bg-inkt/5 text-inkt-zacht border-inkt/15',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  async function loadOrders() {
    try {
      setLoading(true)
      const res = await fetch('/api/orders')
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setOrders(data.orders)
    } catch {
      setError('Kan bestellingen niet laden.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
    const interval = setInterval(loadOrders, 30_000)
    return () => clearInterval(interval)
  }, [])

  const totals = {
    all: orders.length,
    paid: orders.filter(o => o.paymentStatus === 'paid').length,
    revenue: orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((s, o) => s + o.totalInclBtw, 0),
  }

  return (
    <div className="min-h-screen bg-zand">
      <header className="bg-geel border-b-2 border-inkt px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="font-display uppercase text-sm tracking-wide text-inkt-zacht">/ Admin / Bestellingen</span>
        </div>
        <button
          onClick={loadOrders}
          disabled={loading}
          className="text-xs font-bold uppercase tracking-wide text-inkt hover:text-rood transition-colors flex items-center gap-1.5"
        >
          <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Vernieuwen
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-display uppercase text-4xl">Bestellingen</h1>
          <Link href="/bestellen" className="btn-primary btn-sm self-start">
            Bestelportaal openen
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard label="Totaal bestellingen" value={String(totals.all)} />
          <StatCard label="Betaalde bestellingen" value={String(totals.paid)} highlight />
          <StatCard label="Omzet (betaald)" value={formatEur(totals.revenue)} highlight />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-rood/10 border-2 border-rood/30 rounded-xl text-sm font-semibold text-rood">
            {error}
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="flex justify-center py-16 text-inkt-zacht">
            <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-inkt-zacht">
            <p className="font-display uppercase text-2xl mb-1">Geen bestellingen gevonden</p>
            <p className="text-sm font-medium">Bestellingen verschijnen hier zodra klanten via het portaal bestellen.</p>
          </div>
        ) : (
          <div className="bg-wit border-2 border-inkt rounded-[18px] overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zand border-b-2 border-inkt">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Datum</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Bestelnr.</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Bedrijf</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Producten</th>
                    <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Totaal</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-inkt-zacht">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inkt/8">
                  {orders.map(order => (
                    <>
                      <tr key={order.id} className="hover:bg-zand/50 transition-colors">
                        <td className="px-4 py-3 text-inkt-zacht whitespace-nowrap font-medium">{formatDate(order.createdAt)}</td>
                        <td className="px-4 py-3 font-display text-base">{order.orderNumber}</td>
                        <td className="px-4 py-3">
                          <p className="font-bold">{order.customer.companyName}</p>
                          <p className="text-xs text-inkt-zacht">{order.customer.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          {order.lines.map(l => (
                            <span key={l.productId} className="inline-block text-xs bg-zand border border-inkt/15 font-semibold px-1.5 py-0.5 rounded mr-1 mb-0.5">
                              {l.quantity}× {l.productName}
                            </span>
                          ))}
                        </td>
                        <td className="px-4 py-3 text-right font-display text-lg whitespace-nowrap">
                          {formatEur(order.totalInclBtw)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.paymentStatus]}`}>
                            {STATUS_LABELS[order.paymentStatus]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                            className="text-xs font-bold text-rood hover:underline"
                          >
                            {expanded === order.id ? 'Sluiten' : 'Bekijken'}
                          </button>
                        </td>
                      </tr>
                      {expanded === order.id && (
                        <tr key={`${order.id}-expanded`}>
                          <td colSpan={7} className="px-4 py-4 bg-zand/60 border-t border-inkt/10">
                            <OrderDetail order={order} />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-inkt/8">
              {orders.map(order => (
                <div key={order.id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-display text-lg">{order.orderNumber}</p>
                      <p className="text-xs text-inkt-zacht font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full border ${STATUS_COLORS[order.paymentStatus]}`}>
                      {STATUS_LABELS[order.paymentStatus]}
                    </span>
                  </div>
                  <p className="font-bold text-sm">{order.customer.companyName}</p>
                  <p className="text-xs text-inkt-zacht mb-2">{order.customer.email}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {order.lines.map(l => (
                      <span key={l.productId} className="text-xs bg-zand border border-inkt/15 font-semibold px-1.5 py-0.5 rounded">
                        {l.quantity}× {l.productName}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-display text-xl">{formatEur(order.totalInclBtw)}</p>
                    <button
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                      className="text-xs font-bold text-rood hover:underline"
                    >
                      {expanded === order.id ? 'Sluiten' : 'Details'}
                    </button>
                  </div>
                  {expanded === order.id && (
                    <div className="mt-3 pt-3 border-t border-inkt/10">
                      <OrderDetail order={order} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-[18px] border-2 p-4 ${highlight ? 'bg-inkt border-inkt text-zand' : 'bg-wit border-inkt'}`}>
      <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${highlight ? 'text-zand/60' : 'text-inkt-zacht'}`}>{label}</p>
      <p className={`font-display text-3xl ${highlight ? 'text-geel' : ''}`}>{value}</p>
    </div>
  )
}

function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <p className="eyebrow mb-1">Klantgegevens</p>
        <p className="font-bold">{order.customer.companyName}</p>
        <p className="text-inkt-zacht font-medium">{order.customer.contactName}</p>
        <p className="text-inkt-zacht font-medium">{order.customer.email}</p>
        <p className="text-inkt-zacht font-medium">{order.customer.phone}</p>
        <p className="text-inkt-zacht text-xs mt-1 font-semibold">KVK: {order.customer.kvkNumber}</p>
      </div>
      <div>
        <p className="eyebrow mb-1">Bezorgadres</p>
        <p className="text-inkt-zacht font-medium">{order.customer.deliveryAddress}</p>
        <p className="text-inkt-zacht font-medium">{order.customer.deliveryPostcode} {order.customer.deliveryCity}</p>
        {order.molliePaymentId && (
          <p className="text-xs text-inkt-zacht/60 mt-2 font-mono">Mollie: {order.molliePaymentId}</p>
        )}
        {order.exactInvoiceId && (
          <p className="text-xs text-inkt-zacht/60 font-mono">Exact: {order.exactInvoiceId}</p>
        )}
      </div>
    </div>
  )
}
