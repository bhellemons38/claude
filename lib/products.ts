import { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 'bumbu-bulgogi',
    name: 'Korean Bulgogi',
    origin: 'Korea · Seoul',
    description: 'Zoete soja, scherpe knoflook en geroosterd sesam. Vol en in balans, onze meest bestelde smaak.',
    price: 14.50,
    unit: 'fles 750ml',
    minQty: 1,
    packSize: 1,
    image: '/assets/product-bulgogi.png',
    badge: 'Meest besteld',
  },
  {
    id: 'bumbu-chipotle',
    name: 'Chipotle Asado',
    origin: 'Mexico',
    description: 'Gerookte adobo-chipotle met pure cacao en houtvuur-warmte.',
    price: 14.50,
    unit: 'fles 750ml',
    minQty: 1,
    packSize: 1,
    image: '/assets/product-chipotle.png',
  },
  {
    id: 'bumbu-chili-crisp',
    name: 'Chili Crisp',
    origin: 'China',
    description: 'Getoaste chili op donkere soja, afgemaakt met sesamolie. Hartig en diep.',
    price: 15.00,
    unit: 'fles 750ml',
    minQty: 1,
    packSize: 1,
    image: '/assets/product-chili-crisp.png',
  },
  {
    id: 'bumbu-rendang',
    name: 'Rendang',
    origin: 'Indonesië',
    description: 'Echte kokosmelk, citroengras en kaffir limoenblad. Warm en diep.',
    price: 15.00,
    unit: 'fles 750ml',
    minQty: 1,
    packSize: 1,
    image: '/assets/product-rendang.png',
  },
  {
    id: 'bumbu-pomodoro',
    name: 'Fiery Pomodoro',
    origin: 'Italië',
    description: 'Gegrilde paprika, rijpe tomaat en chili met verse tijm. Vol, fris en pittig.',
    price: 0,
    unit: 'fles 750ml',
    minQty: 1,
    packSize: 1,
    image: '/assets/product-pomodoro.png',
    badge: 'Nieuw',
    comingSoon: true,
  },
]

export const BTW_RATE = 0.09 // 9% BTW
export const MIN_ORDER_EXCL_BTW = 75 // €75 minimum

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}
