import { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 'bumbu-original',
    name: 'Liquid Bumbu Original',
    description: 'Onze klassieke Bumbu saus — een rijke Indonesische kruidenpasta met kokos, galangal en citroengras. Veelzijdig inzetbaar als marinade, woksaus of dipsaus.',
    price: 8.50,
    unit: 'fles 250ml',
    minQty: 6,
    packSize: 6,
  },
  {
    id: 'bumbu-hot',
    name: 'Liquid Bumbu Hot',
    description: 'De pittige variant van onze Bumbu saus — met rode pepers en sambal voor extra vuur. Perfect voor gegrild vlees, noodles en streetfood concepten.',
    price: 8.50,
    unit: 'fles 250ml',
    minQty: 6,
    packSize: 6,
  },
  {
    id: 'bumbu-smoky',
    name: 'Liquid Bumbu Smoky',
    description: 'Gerookte Bumbu saus met diepte en karakter — chipotle en gerookte kokos geven gerechten een unieke BBQ-twist met Aziatische roots.',
    price: 9.00,
    unit: 'fles 250ml',
    minQty: 6,
    packSize: 6,
  },
]

export const BTW_RATE = 0.09 // 9% BTW
export const MIN_ORDER_EXCL_BTW = 75 // €75 minimum

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
