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
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F6EBD9; margin: 0; padding: 0; color: #1c1408;">
      <div style="max-width: 600px; margin: 40px auto; background: #FFFDF7; border: 2px solid #1c1408; border-radius: 18px; overflow: hidden;">

        <!-- Header -->
        <div style="background: #FFC61A; padding: 28px 32px; text-align: center; border-bottom: 2px solid #1c1408;">
          <p style="color: #BD0A0A; font-size: 28px; font-weight: 800; letter-spacing: 3px; margin: 0; text-transform: uppercase;">Nacholito</p>
          <p style="color: #4a3d2a; font-size: 12px; font-weight: 700; letter-spacing: 2px; margin: 4px 0 0; text-transform: uppercase;">Foodservice bestelling</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <h1 style="color: #BD0A0A; font-size: 26px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: .02em;">Bedankt voor je bestelling!</h1>
          <p style="color: #4a3d2a; margin: 0 0 24px; font-weight: 500;">Je betaling is ontvangen. Hieronder vind je een overzicht van je bestelling.</p>

          <div style="background: #F6EBD9; border: 2px solid #1c1408; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px; font-size: 12px; color: #4a3d2a; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Bestelnummer</p>
            <p style="margin: 0; font-weight: 800; color: #1c1408; font-size: 20px;">${order.orderNumber}</p>
            <p style="margin: 8px 0 0; font-size: 13px; color: #4a3d2a; font-weight: 600;">Besteldatum: ${formatDate(order.createdAt)}</p>
          </div>

          <h2 style="color: #BD0A0A; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">Bezorgadres</h2>
          <p style="color: #1c1408; margin: 0 0 24px; line-height: 1.6; font-weight: 500;">
            <strong>${order.customer.companyName}</strong><br>
            t.a.v. ${order.customer.contactName}<br>
            ${order.customer.deliveryAddress}<br>
            ${order.customer.deliveryPostcode} ${order.customer.deliveryCity}
          </p>

          <h2 style="color: #BD0A0A; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">Bestelde producten</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <thead>
              <tr style="border-bottom: 2px solid #1c1408;">
                <th style="text-align: left; padding: 8px 0; font-size: 12px; color: #4a3d2a; text-transform: uppercase; letter-spacing: 1px;">Product</th>
                <th style="text-align: center; padding: 8px 0; font-size: 12px; color: #4a3d2a; text-transform: uppercase; letter-spacing: 1px;">Aantal</th>
                <th style="text-align: right; padding: 8px 0; font-size: 12px; color: #4a3d2a; text-transform: uppercase; letter-spacing: 1px;">Prijs/st.</th>
                <th style="text-align: right; padding: 8px 0; font-size: 12px; color: #4a3d2a; text-transform: uppercase; letter-spacing: 1px;">Totaal</th>
              </tr>
            </thead>
            <tbody>${linesHtml}</tbody>
          </table>

          <div style="border-top: 2px solid #1c1408; padding-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #4a3d2a; font-size: 14px; font-weight: 600;">Subtotaal excl. BTW</span>
              <span style="color: #1c1408; font-size: 14px; font-weight: 600;">${formatEur(order.subtotalExclBtw)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #4a3d2a; font-size: 14px; font-weight: 600;">BTW (9%)</span>
              <span style="color: #1c1408; font-size: 14px; font-weight: 600;">${formatEur(order.btwAmount)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #1c1408; font-weight: 800; font-size: 18px; text-transform: uppercase;">Totaal incl. BTW</span>
              <span style="color: #BD0A0A; font-weight: 800; font-size: 18px;">${formatEur(order.totalInclBtw)}</span>
            </div>
          </div>

          <div style="background: #1c1408; border-radius: 12px; padding: 16px; margin-top: 24px;">
            <p style="margin: 0; color: #FFC61A; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Verwachte levering</p>
            <p style="margin: 4px 0 0; color: #F6EBD9; font-size: 15px; font-weight: 600;">3–5 werkdagen na betalingsbevestiging</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #F6EBD9; padding: 24px; border-top: 2px solid #1c1408; text-align: center;">
          <p style="margin: 0 0 4px; font-size: 13px; color: #4a3d2a; font-weight: 600;">Vragen over je bestelling?</p>
          <p style="margin: 0; font-size: 13px;">
            <a href="mailto:info@nacholito.nl" style="color: #BD0A0A; font-weight: 700;">info@nacholito.nl</a>
          </p>
          <p style="margin: 12px 0 0; font-size: 12px; color: #4a3d2a;">
            Sample Kitchen B.V. · Goeseelsstraat 16, Breda · KVK 84282495
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
