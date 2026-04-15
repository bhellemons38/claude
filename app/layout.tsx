import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nacholito — B2B Bestelportaal',
  description: 'Groothandel bestelportaal voor Nacholito Liquid Bumbu sauzen. Voor horeca ondernemers in Nederland.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
