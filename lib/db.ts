import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { Order } from '@/types'

const DB_PATH = path.join(process.cwd(), 'data', 'orders.db')

interface OrderRow {
  id: string
  orderNumber: string
  customer: string
  lines: string
  subtotalExclBtw: number
  btwAmount: number
  totalInclBtw: number
  paymentStatus: string
  molliePaymentId: string | null
  exactInvoiceId: string | null
  createdAt: string
  updatedAt: string
}

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    db = new Database(DB_PATH)
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        orderNumber TEXT NOT NULL,
        customer TEXT NOT NULL,
        lines TEXT NOT NULL,
        subtotalExclBtw REAL NOT NULL,
        btwAmount REAL NOT NULL,
        totalInclBtw REAL NOT NULL,
        paymentStatus TEXT NOT NULL DEFAULT 'pending',
        molliePaymentId TEXT,
        exactInvoiceId TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `)
  }
  return db
}

export function insertOrder(order: Order): void {
  const d = getDb()
  d.prepare(`
    INSERT INTO orders (id, orderNumber, customer, lines, subtotalExclBtw, btwAmount, totalInclBtw, paymentStatus, molliePaymentId, exactInvoiceId, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    order.id,
    order.orderNumber,
    JSON.stringify(order.customer),
    JSON.stringify(order.lines),
    order.subtotalExclBtw,
    order.btwAmount,
    order.totalInclBtw,
    order.paymentStatus,
    order.molliePaymentId ?? null,
    order.exactInvoiceId ?? null,
    order.createdAt,
    order.updatedAt,
  )
}

export function getOrderById(id: string): Order | null {
  const d = getDb()
  const row = d.prepare('SELECT * FROM orders WHERE id = ?').get(id) as OrderRow | undefined
  if (!row) return null
  return rowToOrder(row)
}

export function getOrderByMollieId(molliePaymentId: string): Order | null {
  const d = getDb()
  const row = d.prepare('SELECT * FROM orders WHERE molliePaymentId = ?').get(molliePaymentId) as OrderRow | undefined
  if (!row) return null
  return rowToOrder(row)
}

export function setMolliePaymentId(id: string, molliePaymentId: string): void {
  const d = getDb()
  d.prepare('UPDATE orders SET molliePaymentId = ?, updatedAt = ? WHERE id = ?').run(
    molliePaymentId,
    new Date().toISOString(),
    id,
  )
}

export function updateOrderStatus(
  id: string,
  paymentStatus: Order['paymentStatus'],
  extras?: { exactInvoiceId?: string },
): void {
  const d = getDb()
  d.prepare(`
    UPDATE orders SET paymentStatus = ?, exactInvoiceId = COALESCE(?, exactInvoiceId), updatedAt = ? WHERE id = ?
  `).run(paymentStatus, extras?.exactInvoiceId ?? null, new Date().toISOString(), id)
}

export function getAllOrders(): Order[] {
  const d = getDb()
  const rows = d.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all() as OrderRow[]
  return rows.map(rowToOrder)
}

function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.orderNumber,
    customer: JSON.parse(row.customer),
    lines: JSON.parse(row.lines),
    subtotalExclBtw: row.subtotalExclBtw,
    btwAmount: row.btwAmount,
    totalInclBtw: row.totalInclBtw,
    paymentStatus: row.paymentStatus as Order['paymentStatus'],
    molliePaymentId: row.molliePaymentId ?? undefined,
    exactInvoiceId: row.exactInvoiceId ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }
}
