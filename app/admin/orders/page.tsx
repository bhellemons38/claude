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
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  expired: 'bg-slate-100 text-slate-600',
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
    const interval = setInterval(loadOrders, 30_000) // auto-refresh every 30s
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
    <div className="min-h-screen bg-slate-50">
      <header className="bg-navy border-b border-navy-light px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="text-slate-500 text-sm">/ Admin / Bestellingen</span>
        </div>
        <button
          onClick={loadOrders}
          disabled={loading}
          className="text-xs text-slate-400 hover:text-gold transition-colors flex items-center gap-1.5"
        >
          <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Vernieuwen
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-navy">Bestellingen</h1>
          <Link
            href="/bestellen"
            className="text-xs bg-gold text-white font-semibold px-4 py-2 rounded-lg hover:bg-gold-dark transition-colors self-start"
          >
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
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="flex justify-center py-16 text-slate-400">
            <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium mb-1">Geen bestellingen gevonden</p>
            <p className="text-sm">Bestellingen verschijnen hier zodra klanten via het portaal bestellen.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Datum</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Bestelnr.</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Bedrijf</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Producten</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Totaal</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map(order => (
                    <>
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                        <td className="px-4 py-3 font-mono text-navy font-semibold">{order.orderNumber}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-navy">{order.customer.companyName}</p>
                          <p className="text-xs text-slate-400">{order.customer.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          {order.lines.map(l => (
                            <span key={l.productId} className="inline-block text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded mr-1 mb-0.5">
                              {l.quantity}× {l.productName.replace('Liquid Bumbu ', '')}
                            </span>
                          ))}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-navy whitespace-nowrap">
                          {formatEur(order.totalInclBtw)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.paymentStatus]}`}>
                            {STATUS_LABELS[order.paymentStatus]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                            className="text-xs text-gold hover:underline"
                          >
                            {expanded === order.id ? 'Sluiten' : 'Bekijken'}
                          </button>
                        </td>
                      </tr>
                      {expanded === order.id && (
                        <tr key={`${order.id}-expanded`}>
                          <td colSpan={7} className="px-4 py-4 bg-slate-50 border-t border-slate-100">
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
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map(order => (
                <div key={order.id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono font-bold text-navy">{order.orderNumber}</p>
                      <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[order.paymentStatus]}`}>
                      {STATUS_LABELS[order.paymentStatus]}
                    </span>
                  </div>
                  <p className="font-medium text-navy text-sm">{order.customer.companyName}</p>
                  <p className="text-xs text-slate-500 mb-2">{order.customer.email}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {order.lines.map(l => (
                      <span key={l.productId} className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {l.quantity}× {l.productName.replace('Liquid Bumbu ', '')}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-navy">{formatEur(order.totalInclBtw)}</p>
                    <button
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                      className="text-xs text-gold hover:underline"
                    >
                      {expanded === order.id ? 'Sluiten' : 'Details'}
                    </button>
                  </div>
                  {expanded === order.id && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
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
    <div className={`rounded-xl border p-4 ${highlight ? 'bg-navy border-navy-light' : 'bg-white border-slate-200'}`}>
      <p className={`text-xs font-medium mb-1 ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-gold' : 'text-navy'}`}>{value}</p>
    </div>
  )
}

function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Klantgegevens</p>
        <p className="text-navy font-medium">{order.customer.companyName}</p>
        <p className="text-slate-600">{order.customer.contactName}</p>
        <p className="text-slate-600">{order.customer.email}</p>
        <p className="text-slate-600">{order.customer.phone}</p>
        <p className="text-slate-500 text-xs mt-1">KVK: {order.customer.kvkNumber}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Bezorgadres</p>
        <p className="text-slate-600">{order.customer.deliveryAddress}</p>
        <p className="text-slate-600">{order.customer.deliveryPostcode} {order.customer.deliveryCity}</p>
        {order.molliePaymentId && (
          <p className="text-xs text-slate-400 mt-2">Mollie: {order.molliePaymentId}</p>
        )}
        {order.exactInvoiceId && (
          <p className="text-xs text-slate-400">Exact: {order.exactInvoiceId}</p>
        )}
      </div>
    </div>
  )
}
