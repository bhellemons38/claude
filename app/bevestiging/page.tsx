import { Suspense } from 'react'
import { BevestigingContent } from './BevestigingContent'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export default function BevestigingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <Suspense fallback={<LoadingState />}>
          <BevestigingContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin w-8 h-8 mb-4" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <p>Bestelling ophalen…</p>
    </div>
  )
}
