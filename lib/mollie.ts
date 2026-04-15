import { createMollieClient, PaymentMethod, type Payment } from '@mollie/api-client'

let mollieClient: ReturnType<typeof createMollieClient> | null = null

export function getMollieClient() {
  if (!mollieClient) {
    const apiKey = process.env.MOLLIE_API_KEY
    if (!apiKey) throw new Error('MOLLIE_API_KEY is not set')
    mollieClient = createMollieClient({ apiKey })
  }
  return mollieClient
}

export async function createIdealPayment(params: {
  orderId: string
  orderNumber: string
  amountEur: number
  customerEmail: string
  customerName: string
}): Promise<Payment> {
  const client = getMollieClient()
  const baseUrl = process.env.BASE_URL
  if (!baseUrl) throw new Error('BASE_URL is not set')

  // Cast via unknown: Mollie's overloaded create() signature causes TS to infer Promise<T> & void
  const payment = await (client.payments.create({
    amount: {
      currency: 'EUR',
      value: params.amountEur.toFixed(2),
    },
    description: `Nacholito bestelling - ${params.orderNumber}`,
    redirectUrl: `${baseUrl}/bevestiging?orderId=${params.orderId}`,
    webhookUrl: `${baseUrl}/api/mollie/webhook`,
    method: PaymentMethod.ideal,
    metadata: {
      orderId: params.orderId,
      orderNumber: params.orderNumber,
    },
  }) as unknown as Promise<Payment>)

  return payment
}

export async function getPayment(paymentId: string): Promise<Payment> {
  const client = getMollieClient()
  return (client.payments.get(paymentId)) as unknown as Promise<Payment>
}
