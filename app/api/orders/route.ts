import { NextResponse } from 'next/server'
import { getAllOrders } from '@/lib/db'

export async function GET() {
  try {
    const orders = getAllOrders()
    return NextResponse.json({ orders })
  } catch (err) {
    console.error('GET /api/orders error:', err)
    return NextResponse.json({ error: 'Kan bestellingen niet ophalen' }, { status: 500 })
  }
}
