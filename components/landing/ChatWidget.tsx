'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type Msg = { from: 'bot' | 'user'; text: string }

const GREETING =
  'Hoi! 👋 Ik ben de Nacholito-assistent. Vraag me over smaken, prijzen, levering, proeverijen of waar onze sauzen verkrijgbaar zijn.'

const QUICK = ['Welke smaken?', 'Wat kost het?', 'Levering?', 'Proeverij', 'Waar verkrijgbaar?']

function answer(q: string): string {
  const t = q.toLowerCase()
  if (/(smaak|smaken|flavor|soorten)/.test(t))
    return 'We hebben vijf fusion sauzen: Korean Bulgogi, Rendang Base, Fiery Pomodoro, Chipotle Asado en Chinese Chili Crisp. Allemaal ambachtelijk ingekookt met echte ingrediënten.'
  if (/(prijs|prijzen|kost|kosten|euro|tarief)/.test(t))
    return 'Flessen van 750 ml vanaf € 14,50 (excl. btw), geen MOQ op de fles. Minimale bestelwaarde € 75 excl. btw. Voor 10 liter emmers en volume maken we een offerte op maat.'
  if (/(lever|bezorg|verzend|verzending|wanneer)/.test(t))
    return 'We leveren binnen 3 tot 5 werkdagen. Je rekent af met iDEAL of op rekening, de factuur staat automatisch in je mail.'
  if (/(proev|proeverij|sample|testen)/.test(t))
    return 'Leuk! Klik op "Proeverij aanvragen" op de pagina, of mail naar info@samplekitchen.nl. We plannen een proeverij bij jou in de keuken.'
  if (/(verkrijg|kanaal|kanalen|horeca|restaurant|retail|thuis|grootverbruik|industrie|waar)/.test(t))
    return 'Drie kanalen: 1) Foodservice (koks & restaurants): 750 ml flessen en 10 liter emmers. 2) Thuiskok & foodies: 750 ml flessen. 3) Grootverbruik & industrie: 10 liter emmers of groter.'
  if (/(moq|minimum|minimale)/.test(t))
    return 'Geen MOQ op de fles, je bestelt per stuk. Wel een minimale bestelwaarde van € 75 excl. btw per order.'
  if (/(contact|mail|bellen|telefoon|vraag)/.test(t))
    return 'Je bereikt ons via info@samplekitchen.nl. Stel hier gerust je vraag, of vraag een proeverij aan via de knop op de pagina.'
  return 'Goede vraag! Daar kan ik je collega bij helpen. Mail info@samplekitchen.nl of vraag een proeverij aan, dan reageren we snel.'
}

export function ChatWidget() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', text: GREETING }])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, open])

  function send(text: string) {
    const q = text.trim()
    if (!q) return
    setMsgs(m => [...m, { from: 'user', text: q }])
    setInput('')
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: answer(q) }]), 350)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Chat sluiten' : 'Chat openen'}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-neutral-0 shadow-warm-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.8-5.8A8.5 8.5 0 1 1 21 11.5Z" /></svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-24 right-5 z-[90] flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-neutral-900/10 bg-neutral-0 shadow-warm-lg"
          >
            <div className="flex items-center gap-3 bg-neutral-700 px-5 py-4 text-neutral-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-neutral-900 lp-display text-lg">N</span>
              <div>
                <p className="font-geist text-sm font-semibold">Nacholito-assistent</p>
                <p className="text-[11px] text-neutral-100/70">Meestal binnen een paar minuten</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <p
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-micro leading-relaxed ${
                      m.from === 'user' ? 'bg-primary text-neutral-0' : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map(q => (
                  <button key={q} type="button" onClick={() => send(q)} className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-[12px] font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-neutral-200 p-3"
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Typ je vraag…"
                className="flex-1 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-micro text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-accent"
              />
              <button type="submit" aria-label="Versturen" className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-neutral-0 transition-transform hover:scale-105 active:scale-95">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
