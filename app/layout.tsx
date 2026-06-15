import type { Metadata } from 'next'
import { Bebas_Neue, Raleway } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nacholito.com'),
  title: 'Bestel nu — Nacholito Foodservice',
  description: 'Bestel Nacholito fusion sauzen met iDEAL. Geen MOQ op de fles, snel geleverd, automatisch gefactureerd.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${bebas.variable} ${raleway.variable} font-body antialiased`}>{children}</body>
    </html>
  )
}
