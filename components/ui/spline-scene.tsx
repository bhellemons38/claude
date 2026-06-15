'use client'

import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" aria-label="Bezig met laden" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
