import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { CreateOrderRequest, Order, OrderLine } from '@/types'
import { getProduct, BTW_RATE, MIN_ORDER_EXCL_BTW } from '@/lib/products'
import { insertOrder, setMolliePaymentId } from '@/lib/db'
import { createIdealPayment } from '@/lib/mollie'

function generateOrderNumber(): string {
  const date = new Date()
  const y = date.getFullYear().toString().slice(2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `NL${y}${m}${d}-${rand}`
}

export async function POST(req: NextRequest) {
  let body: CreateOrderRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  const { customer, lines } = body

  // Validate customer fields
  const required: (keyof typeof customer)[] = [
    'companyName', 'contactName', 'email', 'phone', 'kvkNumber',
    'deliveryAddress', 'deliveryCity', 'deliveryPostcode',
  ]
  for (const field of required) {
    if (!customer?.[field]?.trim()) {
      return NextResponse.json({ error: `Veld '${field}' is verplicht` }, { status: 422 })
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 422 })
  }

  // Validate order lines
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: 'Selecteer minimaal één product' }, { status: 422 })
  }

  const orderLines: OrderLine[] = []
  for (const line of lines) {
    const product = getProduct(line.productId)
    if (!product) {
      return NextResponse.json({ error: `Onbekend product: ${line.productId}` }, { status: 422 })
    }
    if (!Number.isInteger(line.quantity) || line.quantity < product.minQty) {
      return NextResponse.json(
        { error: `Minimale afname voor ${product.name} is ${product.minQty} flessen` },
        { status: 422 },
      )
    }
    if (line.quantity % product.packSize !== 0) {
      return NextResponse.json(
        { error: `Bestelhoeveelheid voor ${product.name} moet een veelvoud zijn van ${product.packSize}` },
        { status: 422 },
      )
    }
    orderLines.push({
      productId: product.id,
      productName: product.name,
      quantity: line.quantity,
      unitPrice: product.price,
      lineTotal: product.price * line.quantity,
    })
  }

  const subtotalExclBtw = orderLines.reduce((sum, l) => sum + l.lineTotal, 0)

  if (subtotalExclBtw < MIN_ORDER_EXCL_BTW) {
    return NextResponse.json(
      { error: `Minimale bestelwaarde is €${MIN_ORDER_EXCL_BTW} excl. BTW` },
      { status: 422 },
    )
  }

  const btwAmount = Math.round(subtotalExclBtw * BTW_RATE * 100) / 100
  const totalInclBtw = Math.round((subtotalExclBtw + btwAmount) * 100) / 100

  const orderId = uuidv4()
  const orderNumber = generateOrderNumber()
  const now = new Date().toISOString()

  const order: Order = {
    id: orderId,
    orderNumber,
    customer,
    lines: orderLines,
    subtotalExclBtw,
    btwAmount,
    totalInclBtw,
    paymentStatus: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  try {
    insertOrder(order)
  } catch (err) {
    console.error('DB insert error:', err)
    return NextResponse.json({ error: 'Opslaan van bestelling mislukt' }, { status: 500 })
  }

  try {
    const payment = await createIdealPayment({
      orderId,
      orderNumber,
      amountEur: totalInclBtw,
      customerEmail: customer.email,
      customerName: customer.contactName,
    })

    setMolliePaymentId(orderId, payment.id)

    return NextResponse.json({
      orderId,
      checkoutUrl: payment.getCheckoutUrl(),
    })
  } catch (err) {
    console.error('Mollie payment error:', err)
    return NextResponse.json({ error: 'Aanmaken betaling mislukt. Probeer het opnieuw.' }, { status: 502 })
  }
}
