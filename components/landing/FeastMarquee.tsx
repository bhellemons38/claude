'use client'

import Image from 'next/image'

const DISHES = [
  { src: '/assets/product-pomodoro.png', label: 'Italië', dish: 'Fiery Pomodoro' },
  { src: '/assets/product-bulgogi.png', label: 'Korea', dish: 'Korean Bulgogi' },
  { src: '/assets/product-rendang.png', label: 'Indonesië', dish: 'Rendang Base' },
  { src: '/assets/product-chipotle.png', label: 'Mexico', dish: 'Chipotle Asado' },
  { src: '/assets/product-chili-crisp.png', label: 'China', dish: 'Chili Crisp' },
]

export function FeastMarquee() {
  const row = [...DISHES, ...DISHES]
  return (
    <section aria-label="Smaken van Nacholito" className="overflow-hidden border-y border-neutral-900/10 bg-neutral-100 py-8 sm:py-10">
      <div className="lp-fade-x group overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((d, i) => (
            <figure
              key={`${d.src}-${i}`}
              className="relative h-72 w-56 flex-none overflow-hidden rounded-2xl border border-neutral-900/10 sm:h-80 sm:w-64"
            >
              <Image
                src={d.src}
                alt={`Nacholito ${d.dish}`}
                fill
                sizes="256px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900/80 to-transparent p-4">
                <figcaption className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-2xl uppercase leading-none text-neutral-0">{d.dish}</span>
                  <span className="lp-label text-accent">{d.label}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
