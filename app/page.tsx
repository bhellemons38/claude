import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Flavors } from '@/components/landing/Flavors'
import { Features } from '@/components/landing/Features'
import { SocialProof } from '@/components/landing/SocialProof'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Nacholito — Fusion sauzen voor je keuken',
  description:
    'Vier internationale fusion sauzen met restaurant-diepte: Bulgogi, Rendang, Chipotle en Chili Crisp. Geen MOQ op de fles, iDEAL of op rekening, snel geleverd.',
  openGraph: {
    title: 'Nacholito — De wereld op smaak',
    description:
      'Fusion sauzen door chefs ontwikkeld. Voor de professional én thuis. Bestel met iDEAL, snel geleverd.',
    type: 'website',
    locale: 'nl_NL',
    images: ['/assets/hero-poster.jpg'],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Flavors />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
