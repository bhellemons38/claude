import { Order } from '@/types'

const EXACT_BASE = 'https://start.exactonline.nl/api/v1'

interface ExactTokenCache {
  accessToken: string
  expiresAt: number
}

let tokenCache: ExactTokenCache | null = null

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken
  }

  const clientId = process.env.EXACT_CLIENT_ID
  const clientSecret = process.env.EXACT_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Exact Online credentials not configured')
  }

  const res = await fetch('https://start.exactonline.nl/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Exact Online token error: ${res.status} ${body}`)
  }

  const data = await res.json()
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return tokenCache.accessToken
}

async function exactFetch(path: string, options: RequestInit = {}) {
  const token = await getAccessToken()
  const division = process.env.EXACT_DIVISION
  if (!division) throw new Error('EXACT_DIVISION is not set')

  const url = `${EXACT_BASE}/${division}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Exact Online API error ${res.status}: ${body}`)
  }

  return res.json()
}

async function findOrCreateRelation(kvkNumber: string, companyName: string, email: string): Promise<string> {
  // Try to find existing relation by KVK (ChamberOfCommerce field)
  const searchRes = await exactFetch(
    `/crm/Accounts?$filter=ChamberOfCommerce eq '${encodeURIComponent(kvkNumber)}'&$select=ID,Name`,
  )

  if (searchRes.d?.results?.length > 0) {
    return searchRes.d.results[0].ID
  }

  // Create new relation
  const createRes = await exactFetch('/crm/Accounts', {
    method: 'POST',
    body: JSON.stringify({
      Name: companyName,
      ChamberOfCommerce: kvkNumber,
      Email: email,
      IsSales: true,
      IsSupplier: false,
    }),
  })

  return createRes.d.ID
}

export async function createSalesInvoice(order: Order): Promise<string> {
  const { customer, lines } = order

  const accountId = await findOrCreateRelation(
    customer.kvkNumber,
    customer.companyName,
    customer.email,
  )

  const invoiceLines = lines.map(line => ({
    Description: line.productName,
    Quantity: line.quantity,
    UnitPrice: line.unitPrice,
    VATCode: 'L', // 9% BTW code in Exact Online (low rate)
  }))

  const res = await exactFetch('/salesinvoice/SalesInvoices', {
    method: 'POST',
    body: JSON.stringify({
      Type: 8020, // Standard sales invoice
      Account: accountId,
      Description: `Nacholito bestelling ${order.orderNumber}`,
      YourRef: order.orderNumber,
      SalesInvoiceLines: invoiceLines,
    }),
  })

  return res.d.InvoiceID as string
}
