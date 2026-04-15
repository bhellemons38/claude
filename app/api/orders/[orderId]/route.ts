import { NextRequest, NextResponse } from 'next/server'
import { getOrderById } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: { orderId: string } },
) {
  try {
    const order = getOrderById(params.orderId)
    if (!order) {
      return NextResponse.json({ error: 'Bestelling niet gevonden' }, { status: 404 })
    }
    return NextResponse.json({ order })
  } catch (err) {
    console.error('GET /api/orders/[orderId] error:', err)
    return NextResponse.json({ error: 'Kan bestelling niet ophalen' }, { status: 500 })
  }
}
