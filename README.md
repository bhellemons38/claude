# Nacholito B2B Bestelportaal

Een B2B groothandel bestelportaal voor Nacholito — Liquid Bumbu sauzen van Sample Kitchen B.V., Breda. Klanten (horeca ondernemers) plaatsen bestellingen via iDEAL, waarna automatisch een Exact Online factuur wordt aangemaakt en een bevestigingsmail wordt verstuurd.

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (navy + gold brandkleuren)
- **Mollie** — iDEAL betalingen
- **Exact Online** — automatische facturatie
- **Resend** — transactionele e-mail
- **better-sqlite3** — lokale opslag van bestellingen

---

## Snel starten

### 1. Installeer dependencies

```bash
npm install
```

### 2. Omgevingsvariabelen instellen

```bash
cp .env.local.example .env.local
```

Open `.env.local` en vul in:

| Variabele | Beschrijving |
|---|---|
| `BASE_URL` | URL van de deployment (bijv. `http://localhost:3000`) |
| `MOLLIE_API_KEY` | Mollie API key (`test_...` of `live_...`) |
| `EXACT_CLIENT_ID` | Exact Online OAuth2 client ID |
| `EXACT_CLIENT_SECRET` | Exact Online OAuth2 client secret |
| `EXACT_DIVISION` | Exact Online divisienummer |
| `RESEND_API_KEY` | Resend API key |

### 3. Development server starten

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirect naar `/bestellen`.

---

## Pagina's

| Route | Beschrijving |
|---|---|
| `/bestellen` | Bestelformulier (klantgegevens + productkeuze) |
| `/bevestiging?orderId=...` | Bedankpagina na betaling |
| `/admin/orders` | Admin overzicht van alle bestellingen |

## API routes

| Route | Methode | Beschrijving |
|---|---|---|
| `/api/order` | POST | Valideer bestelling, sla op, maak Mollie betaling aan |
| `/api/mollie/webhook` | POST | Verwerk Mollie betaalstatus, maak Exact factuur, stuur e-mail |
| `/api/orders` | GET | Alle bestellingen ophalen (admin) |
| `/api/orders/:orderId` | GET | Enkelvoudige bestelling ophalen |

---

## Mollie instellen

1. Maak een account op [mollie.com](https://mollie.com)
2. Ga naar **Developers → API-sleutels**
3. Kopieer de **test** API-sleutel naar `.env.local` als `MOLLIE_API_KEY`
4. Activeer iDEAL in **Settings → Website profiles**

> **Webhook lokaal testen:** gebruik [ngrok](https://ngrok.com) om webhooks lokaal te ontvangen. Start ngrok met `ngrok http 3000` en zet de tunnel-URL als `BASE_URL`.

---

## Exact Online instellen

### OAuth2 app registreren

1. Ga naar [apps.exactonline.com](https://apps.exactonline.com) → **Register app**
2. Kies **Server-to-server (client credentials)** als grant type
3. Sla de **Client ID** en **Client Secret** op in `.env.local`

### Divisienummer vinden

- Log in op Exact Online → **Instellingen → Bedrijf → Over**
- Of lees het uit de URL: `https://start.exactonline.nl/api/v1/{division}/...`

### BTW-code

De integratie gebruikt BTW-code `L` (laag tarief, 9%). Verifieer dit in **Boekhouding → BTW → BTW-codes**.

---

## Resend instellen

1. Maak een account op [resend.com](https://resend.com)
2. Voeg uw domein toe en verifieer via DNS (SPF, DKIM, DMARC)
3. Maak een API-sleutel aan en zet deze als `RESEND_API_KEY`
4. Pas het `from:` adres in `lib/email.ts` aan naar uw geverifieerde domein

---

## Productie deployen

Deze repo bevat twee deployables:

| Onderdeel | Map | Stack | Netlify-site |
|---|---|---|---|
| Marketing (chooser + /foodservice + /thuis) | `nacholito-site/` | Statische HTML | `nacholitopreviewsite` |
| Bestelportaal | repo-root (`app/`, `lib/`, …) | Next.js 14 | `nacholito-bestellen` *(nieuw)* |

### 1. Marketing-site (bestaand)

Wordt automatisch gedeployed vanaf `claude/nice-volta-TZVHa` via de bestaande `netlify.toml` (base = `nacholito-site`, publish = `.`).

### 2. Bestelportaal als tweede Netlify-site

1. **New site → Import an existing project** in Netlify
2. Selecteer dezelfde repo en branch
3. Configureer:
   - **Site name:** `nacholito-bestellen` (matcht de redirect in `netlify.toml` van de marketing-site)
   - **Base directory:** *(leeg laten — root van de repo)*
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** *(standaard)*
4. Installeer de **Next.js Runtime** plugin als die niet automatisch wordt voorgesteld
5. Environment variables (zelfde namen als in `.env.local.example`):
   - `MOLLIE_API_KEY`, `EXACT_CLIENT_ID`, `EXACT_CLIENT_SECRET`, `EXACT_DIVISION`, `RESEND_API_KEY`
   - `BASE_URL=https://nacholito-bestellen.netlify.app` (of je eigen subdomein)
6. Deploy en check `/bestellen`

> **Andere site-naam?** Pas dan ook `https://nacholito-bestellen.netlify.app` aan in `netlify.toml` van de marketing-site (3× in de redirects).

### Lokaal draaien

```bash
npm install && cp .env.local.example .env.local
npm run dev
```

Zorg dat de `data/` map schrijfbaar is (SQLite database).

---

## Admin

Ga naar `/admin/orders` voor een overzicht van alle bestellingen:
- Datum, bestelnummer, bedrijf, producten, totaal, betaalstatus
- Klant- en bezorggegevens uitklapbaar per bestelling
- Automatische refresh elke 30 seconden

> De admin is **niet beveiligd** — voeg authenticatie toe voor productie.

---

## Database

Bestellingen worden opgeslagen in `data/orders.db` (SQLite). Aangemaakt automatisch bij eerste gebruik.
