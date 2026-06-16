'use client'

import Image from 'next/image'
import { ContainerScroll } from './ContainerScroll'

export function Showcase() {
  return (
    <section className="relative -mt-6">
      <ContainerScroll
        titleComponent={
          <div className="mb-2">
            <span className="lp-label text-primary">Van fles tot bord</span>
            <h2 className="lp-display mt-3 text-h1 text-neutral-900">
              Restaurant-diepte, <span className="lp-mark">in minuten</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body text-neutral-700">
              Eén lepel saus en je gerecht staat. Geen urenlange prep, wel de smaak alsof er een chef achter stond.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full">
          <Image
            src="/assets/smaak-bulgogi.jpg"
            alt="Gerechten afgemaakt met Nacholito fusion sauzen"
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </ContainerScroll>
    </section>
  )
}
