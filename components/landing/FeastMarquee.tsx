'use client'

import Image from 'next/image'

const DISHES = [
  { src: '/assets/smaak-chili.jpg', label: 'Chili Crisp', dish: 'Loaded sub' },
  { src: '/assets/dish-4.jpg', label: 'Bulgogi', dish: 'Sesam burger' },
  { src: '/assets/smaak-rendang.jpg', label: 'Rendang', dish: 'Banh mi' },
  { src: '/assets/dish-6.jpg', label: 'Bulgogi', dish: 'Kimbap rolls' },
  { src: '/assets/smaak-bulgogi.jpg', label: 'Bulgogi', dish: 'Rice bowl' },
  { src: '/assets/dish-2.jpg', label: 'Chipotle', dish: 'Pulled burger' },
]

export function FeastMarquee() {
  const row = [...DISHES, ...DISHES]
  return (
    <section aria-label="Gerechten met Nacholito" className="overflow-hidden border-y border-neutral-900/10 bg-neutral-100 py-8 sm:py-10">
      <div className="lp-fade-x group overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((d, i) => (
            <figure
              key={`${d.src}-${i}`}
              className="relative h-44 w-64 flex-none overflow-hidden rounded-2xl border border-neutral-900/10 sm:h-52 sm:w-80"
            >
              <Image
                src={d.src}
                alt={`${d.dish} met ${d.label} saus`}
                fill
                sizes="320px"
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
