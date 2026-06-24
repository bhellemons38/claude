import type { Metadata } from 'next'
import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { FeastMarquee } from '@/components/landing/FeastMarquee'
import { ProductShowcase } from '@/components/landing/ProductShowcase'
import { Flavors } from '@/components/landing/Flavors'
import { Features } from '@/components/landing/Features'
import { Channels } from '@/components/landing/Channels'
import { Recipes } from '@/components/landing/Recipes'
import { SocialProof } from '@/components/landing/SocialProof'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
import { ChatWidget } from '@/components/landing/ChatWidget'

export const metadata: Metadata = {
  title: 'Nacholito, fusion sauzen voor je keuken',
  description:
    'Vijf ambachtelijke fusion sauzen met restaurant-diepte: Bulgogi, Rendang, Fiery Pomodoro, Chipotle en Chili Crisp. Echte ingrediënten, geen extracten of aromaten.',
  openGraph: {
    title: 'Nacholito, de wereld op smaak',
    description:
      'Ambachtelijke fusion sauzen met echte ingrediënten. Voor foodservice, thuiskoks en grootverbruik.',
    type: 'website',
    locale: 'nl_NL',
    images: ['/assets/product-pomodoro.png'],
  },
}

export default function Home() {
  return (
    <main className="lp min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeastMarquee />
      <ProductShowcase />
      <Flavors />
      <Features />
      <Channels />
      <Recipes />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Footer />
      <ChatWidget />
    </main>
  )
}
