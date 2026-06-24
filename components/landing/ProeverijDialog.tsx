'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export function ProeverijButton({
  className = 'lp-btn lp-btn--secondary',
  label = 'Proeverij aanvragen',
}: {
  className?: string
  label?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {label}
      </button>
      <ProeverijModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function ProeverijModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'proeverij', ...form }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Er ging iets mis.')
        setStatus('error')
        return
      }
      setStatus('ok')
    } catch {
      setError('Verbindingsfout. Probeer het opnieuw.')
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Proeverij aanvragen"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-lg rounded-t-3xl bg-neutral-0 p-6 shadow-warm-lg sm:rounded-3xl sm:p-8"
          >
            <button type="button" onClick={onClose} aria-label="Sluiten" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>

            {status === 'ok' ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-neutral-900" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
                </div>
                <h2 className="lp-display mt-4 text-h3 text-neutral-900">Aanvraag verstuurd</h2>
                <p className="mt-2 text-body text-neutral-700">Bedankt! We nemen snel contact met je op voor een proeverij.</p>
                <button type="button" onClick={onClose} className="lp-btn lp-btn--primary mt-6">Sluiten</button>
              </div>
            ) : (
              <>
                <span className="lp-label text-primary">Gratis &amp; vrijblijvend</span>
                <h2 className="lp-display mt-2 text-h2 text-neutral-900">Proeverij aanvragen</h2>
                <p className="mt-2 text-micro text-neutral-700">Laat je gegevens achter, dan plannen we een proeverij bij jou in de keuken.</p>

                <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Naam" required value={form.name} onChange={set('name')} />
                  <Field label="Bedrijf" value={form.company} onChange={set('company')} />
                  <Field label="E-mail" type="email" required value={form.email} onChange={set('email')} />
                  <Field label="Telefoon" type="tel" value={form.phone} onChange={set('phone')} />
                  <div className="sm:col-span-2">
                    <label className="lp-label mb-1.5 block text-neutral-700">Bericht</label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      rows={3}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-body text-neutral-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-accent"
                      placeholder="Waar ben je naar op zoek?"
                    />
                  </div>

                  {error && <p className="sm:col-span-2 text-micro font-semibold text-primary">{error}</p>}

                  <button type="submit" disabled={status === 'sending'} className="lp-btn lp-btn--primary sm:col-span-2">
                    {status === 'sending' ? 'Versturen…' : 'Verstuur aanvraag'}
                  </button>
                  <p className="sm:col-span-2 text-center text-micro text-neutral-700">
                    Of mail direct naar{' '}
                    <a href="mailto:info@samplekitchen.nl" className="font-semibold text-primary underline">info@samplekitchen.nl</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="lp-label mb-1.5 block text-neutral-700">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-body text-neutral-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-accent"
      />
    </div>
  )
}
