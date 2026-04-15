import { Resend } from 'resend'
import { Order } from '@/types'

let resend: Resend | null = null

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error('RESEND_API_KEY is not set')
    resend = new Resend(apiKey)
  }
  return resend
}

function formatEur(amount: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(amount)
}

function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(new Date(isoString))
}

export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  const r = getResend()

  const linesHtml = order.lines
    .map(
      line => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${line.productName}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: center;">${line.quantity}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatEur(line.unitPrice)}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatEur(line.lineTotal)}</td>
      </tr>
    `,
    )
    .join('')

  const html = `
    <!DOCTYPE html>
    <html lang="nl">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="background: #0A1628; padding: 32px; text-align: center;">
          <p style="color: #C9973A; font-size: 24px; font-weight: 800; letter-spacing: 3px; margin: 0;">NACHOLITO</p>
          <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">Liquid Bumbu Sauces</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h1 style="color: #0A1628; font-size: 22px; margin: 0 0 8px;">Bedankt voor uw bestelling!</h1>
          <p style="color: #6b7280; margin: 0 0 24px;">Uw betaling is ontvangen. Hieronder vindt u een overzicht van uw bestelling.</p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #6b7280;">Bestelnummer</p>
            <p style="margin: 0; font-weight: 700; color: #0A1628; font-size: 18px;">${order.orderNumber}</p>
            <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">Besteldatum: ${formatDate(order.createdAt)}</p>
          </div>

          <h2 style="color: #0A1628; font-size: 16px; margin: 0 0 12px;">Bezorgadres</h2>
          <p style="color: #374151; margin: 0 0 24px; line-height: 1.6;">
            <strong>${order.customer.companyName}</strong><br>
            t.a.v. ${order.customer.contactName}<br>
            ${order.customer.deliveryAddress}<br>
            ${order.customer.deliveryPostcode} ${order.customer.deliveryCity}
          </p>

          <h2 style="color: #0A1628; font-size: 16px; margin: 0 0 12px;">Bestelde producten</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <thead>
              <tr style="border-bottom: 2px solid #0A1628;">
                <th style="text-align: left; padding: 8px 0; font-size: 13px; color: #6b7280;">Product</th>
                <th style="text-align: center; padding: 8px 0; font-size: 13px; color: #6b7280;">Aantal</th>
                <th style="text-align: right; padding: 8px 0; font-size: 13px; color: #6b7280;">Prijs/st.</th>
                <th style="text-align: right; padding: 8px 0; font-size: 13px; color: #6b7280;">Totaal</th>
              </tr>
            </thead>
            <tbody>${linesHtml}</tbody>
          </table>

          <div style="border-top: 2px solid #0A1628; padding-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #6b7280; font-size: 14px;">Subtotaal excl. BTW</span>
              <span style="color: #374151; font-size: 14px;">${formatEur(order.subtotalExclBtw)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #6b7280; font-size: 14px;">BTW (9%)</span>
              <span style="color: #374151; font-size: 14px;">${formatEur(order.btwAmount)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #0A1628; font-weight: 700; font-size: 16px;">Totaal incl. BTW</span>
              <span style="color: #0A1628; font-weight: 700; font-size: 16px;">${formatEur(order.totalInclBtw)}</span>
            </div>
          </div>

          <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 6px; padding: 16px; margin-top: 24px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Verwachte levering:</strong> 3–5 werkdagen na betalingsbevestiging.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #6b7280;">Vragen over uw bestelling?</p>
          <p style="margin: 0; font-size: 13px; color: #0A1628;">
            <a href="mailto:info@nacholito.nl" style="color: #C9973A;">info@nacholito.nl</a>
          </p>
          <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">
            Sample Kitchen B.V. · Goeseelsstraat, Breda · KVK: — · BTW: —
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  await r.emails.send({
    from: 'Nacholito <bestellingen@nacholito.nl>',
    to: order.customer.email,
    subject: `Bevestiging bestelling ${order.orderNumber} — Nacholito`,
    html,
  })
}
