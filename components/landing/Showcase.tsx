'use client'

import Image from 'next/image'
import { ContainerScroll } from './ContainerScroll'

export function Showcase() {
  return (
    <section className="relative -mt-8">
      <ContainerScroll
        titleComponent={
          <div className="mb-2">
            <span className="lp-pill text-rood">Van fles tot bord</span>
            <h2 className="mt-4 font-geist font-semibold tracking-[-0.02em] text-[clamp(30px,5vw,58px)] leading-[1.02] text-inkt">
              Restaurant-diepte, <span className="lp-gradient-text">in minuten</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-inkt-zacht">
              Eén lepel saus en je gerecht staat. Geen urenlange prep, wel de smaak alsof er een chef achter stond.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full">
          <Image
            src="/assets/hero-poster.jpg"
            alt="Gerecht afgemaakt met Nacholito fusion saus"
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </ContainerScroll>
    </section>
  )
}
