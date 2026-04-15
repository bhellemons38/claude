import { redirect } from 'next/navigation'

// Mollie redirects back to /bevestiging?orderId=... directly.
// This page exists as a named route but forwards back to the order form.
export default function BetalingPage() {
  redirect('/bestellen')
}
