import { NextResponse } from 'next/server'
import { sendContactEmail, type ContactSubmission } from '@/lib/email'

export async function POST(request: Request) {
  let body: Partial<ContactSubmission>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldige aanvraag.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const type = body.type === 'vraag' ? 'vraag' : 'proeverij'

  if (!name || !email) {
    return NextResponse.json({ error: 'Vul je naam en e-mailadres in.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 })
  }

  try {
    await sendContactEmail({
      type,
      name,
      email,
      company: (body.company ?? '').trim() || undefined,
      phone: (body.phone ?? '').trim() || undefined,
      message: (body.message ?? '').trim() || undefined,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err)
    return NextResponse.json({ error: 'Versturen mislukt. Probeer het later opnieuw of mail naar info@samplekitchen.nl.' }, { status: 500 })
  }
}
