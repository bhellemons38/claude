'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Reveal, RevealGroup, fadeUp } from './motion'

const RECIPES = [
  { title: 'Bulgogi karaage chicken', flavor: 'Korean Bulgogi', image: '/assets/scene-bulgogi.webp', time: '25 min' },
  { title: 'Chili crisp noodles', flavor: 'Chinese Chili Crisp', image: '/assets/product-chili-crisp.png', time: '15 min' },
  { title: 'Rendang pulled jackfruit', flavor: 'Rendang Base', image: '/assets/scene-rendang-bulgogi.webp', time: '30 min' },
]

export function Recipes() {
  return (
    <section id="recepten" className="relative bg-neutral-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-7 sm:py-24">
        <Reveal className="max-w-2xl">
          <span className="lp-label text-primary">Aan de slag</span>
          <h2 className="lp-display mt-3 text-h2 text-neutral-900">
            Recepten met <span className="lp-mark">één fles</span>
          </h2>
          <p className="mt-4 text-body text-neutral-700">
            Van snelle service tot showstopper. Bekijk hoe je met één saus een compleet gerecht op de kaart zet.
          </p>
        </Reveal>

        {/* featured video */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-900 shadow-warm-lg">
            <div className="relative aspect-video">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="none"
                poster="/assets/scene-bulgogi.webp"
              >
                <source src="/assets/recipe-bulgogi.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="lp-label mt-3 text-neutral-700">Video: Bulgogi karaage chicken</p>
        </Reveal>

        {/* recipe cards */}
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {RECIPES.map(recipe => (
            <motion.article key={recipe.title} variants={fadeUp} className="lp-card lp-card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  sizes="(max-width:640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="lp-label absolute right-3 top-3 rounded-full bg-neutral-0/90 px-2.5 py-1 text-neutral-900">{recipe.time}</span>
              </div>
              <div className="p-5">
                <span className="lp-label text-primary">{recipe.flavor}</span>
                <h3 className="lp-display mt-1 text-h3 text-neutral-900">{recipe.title}</h3>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
