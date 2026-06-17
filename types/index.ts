export interface Product {
  id: string
  name: string
  origin: string
  description: string
  price: number // excl. BTW
  unit: string
  minQty: number
  packSize: number // bottles per pack
  image: string
  badge?: string
  comingSoon?: boolean // shown on the menu, price/ordering not live yet
}

export interface OrderLine {
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface CustomerInfo {
  companyName: string
  contactName: string
  email: string
  phone: string
  kvkNumber: string
  deliveryAddress: string
  deliveryCity: string
  deliveryPostcode: string
}

export interface Order {
  id: string
  orderNumber: string
  customer: CustomerInfo
  lines: OrderLine[]
  subtotalExclBtw: number
  btwAmount: number
  totalInclBtw: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'expired'
  molliePaymentId?: string
  exactInvoiceId?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  customer: CustomerInfo
  lines: Array<{
    productId: string
    quantity: number
  }>
}

export interface CreateOrderResponse {
  orderId: string
  checkoutUrl: string
}
