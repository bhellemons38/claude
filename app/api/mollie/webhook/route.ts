import { NextRequest, NextResponse } from 'next/server'
import { getPayment } from '@/lib/mollie'
import { getOrderByMollieId, updateOrderStatus } from '@/lib/db'
import { createSalesInvoice } from '@/lib/exact'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  let paymentId: string | undefined
  try {
    const body = await req.formData()
    paymentId = body.get('id') as string
  } catch {
    // Mollie may send JSON or form data
    try {
      const body = await req.json()
      paymentId = body.id
    } catch {
      return NextResponse.json({ error: 'Ongeldig webhook verzoek' }, { status: 400 })
    }
  }

  if (!paymentId) {
    return NextResponse.json({ error: 'Geen payment ID ontvangen' }, { status: 400 })
  }

  let payment
  try {
    payment = await getPayment(paymentId)
  } catch (err) {
    console.error('Mollie getPayment error:', err)
    return NextResponse.json({ error: 'Kan betaling niet ophalen' }, { status: 502 })
  }

  const order = getOrderByMollieId(paymentId)
  if (!order) {
    console.warn(`No order found for Mollie payment ${paymentId}`)
    // Return 200 to avoid Mollie retries for unknown payments
    return NextResponse.json({ ok: true })
  }

  const status = payment.status

  if (status === 'paid') {
    // Idempotency check — don't reprocess already-paid orders
    if (order.paymentStatus === 'paid') {
      return NextResponse.json({ ok: true })
    }

    updateOrderStatus(order.id, 'paid')

    // Create Exact Online invoice (non-blocking — log errors but don't fail)
    let exactInvoiceId: string | undefined
    try {
      exactInvoiceId = await createSalesInvoice(order)
      if (exactInvoiceId) {
        updateOrderStatus(order.id, 'paid', { exactInvoiceId })
      }
    } catch (err) {
      console.error('Exact Online invoice creation failed:', err)
    }

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail(order)
    } catch (err) {
      console.error('Confirmation email failed:', err)
    }

    return NextResponse.json({ ok: true })
  }

  if (status === 'failed' || status === 'expired' || status === 'canceled') {
    updateOrderStatus(order.id, status === 'failed' ? 'failed' : 'expired')
  }

  return NextResponse.json({ ok: true })
}
