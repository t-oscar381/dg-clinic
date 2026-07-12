# Denish Gunawan Clinic

Official website of Denish Gunawan Clinic (DG Clinic) — premium,
doctor-led home-care wellness serving Greater Jakarta.

Instagram: [@dg.clinic.hnw](https://www.instagram.com/dg.clinic.hnw)

## Pages

- `/` — Home
- `/infusion-therapy` — Infusion Therapy
- `/regenerative-therapy` — Regenerative Therapy
- `/metabolic-wellness` — Metabolic Wellness
- `/aesthetics-hair-growth` — Aesthetics & Hair Growth
- `/our-story` — Our Story
- `/service-area` — Service Areas & Contact

## Tech

Built with [Next.js](https://nextjs.org) (App Router). All pages are
statically rendered, with per-page metadata, `sitemap.xml`,
`robots.txt`, and structured data.

## Development

```bash
npm install
npm run dev   # http://localhost:3000
```

## Payments (framework)

Payment links are issued through [Xendit](https://www.xendit.co)
invoices: the team agrees on a treatment with the patient in WhatsApp,
creates a link via the internal `POST /api/payments/create-link`
endpoint (guarded by `PAYMENTS_ADMIN_TOKEN`), and sends it in the chat.
Paid/expired callbacks arrive at `POST /api/payments/webhook`, verified
with `XENDIT_WEBHOOK_TOKEN`.

The framework is disabled by default — set `PAYMENTS_ENABLED=true` and
the Xendit keys (see `.env.example`) per environment to activate it.
Published treatment prices live in `lib/pricing.ts`, shared by the
website menu and the invoice amounts so they cannot drift.

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variable
`NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the
sitemap, and structured data resolve correctly.

---

© Denish Gunawan Clinic. All rights reserved.
