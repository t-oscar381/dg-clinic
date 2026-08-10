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

## Instagram feed (@dg.clinic.hnw)

The homepage grid (`components/InstagramGrid.tsx`) pulls the latest 6
posts from Supabase, kept in sync by a daily cron. Full spec:
`docs/HANDOFF-instagram-feed.md`. Ships with the feed off — until
`INSTAGRAM_FEED_ENABLED=true` and the credentials below exist, the grid
renders the static fallback images with no code changes needed.

**Setup, in order:**

1. `@dg.clinic.hnw` must be a Professional (Business/Creator) account —
   free to switch in the Instagram app, required by the API regardless
   of plan.
2. Create a Meta app at [developers.facebook.com](https://developers.facebook.com),
   add the **Instagram** product using **Instagram API with Instagram
   Login** (not Basic Display — permanently shut down Dec 2024). Copy
   `INSTAGRAM_APP_ID` / `INSTAGRAM_APP_SECRET` from Basic Settings into
   Vercel.
3. In development mode, add `@dg.clinic.hnw` as a tester: App Roles →
   Roles → Instagram Testers.
4. Add the OAuth redirect URI in the Meta app:
   `https://<domain>/api/instagram/oauth/callback`.
5. Sign into `/dgc-master` as an admin, open the **Instagram Feed** tab,
   and click **Connect / Reconnect Instagram** — this is
   `GET /api/instagram/oauth/start`, which redirects to Instagram's
   consent screen. Approve it as the `@dg.clinic.hnw` tester. **This is
   the flow to film for the App Review screencast.**
6. The callback (`/api/instagram/oauth/callback`) exchanges the code for
   a long-lived token, writes it to the Supabase `integration_tokens`
   row (never a Vercel env var — those can't be written at runtime), and
   returns the Instagram user id in its JSON response. Copy that into
   `INSTAGRAM_USER_ID` in Vercel.
7. Set `INSTAGRAM_FEED_ENABLED=true` and redeploy.
8. From the same admin tab, click **Sync Now** to populate the feed
   immediately rather than waiting for the 2am cron — it logs fetched /
   upserted / skipped / pruned counts. The same sync is also reachable
   directly for scripted verification:
   `curl -H "Authorization: Bearer $CRON_SECRET" https://<domain>/api/instagram/sync`

The token is refreshed automatically every ~30 days
(`/api/instagram/refresh-token`, well inside the 60-day expiry) and
re-persisted to the same Supabase row — no manual step after the
initial OAuth exchange. See `lib/instagram.ts` for the full token
lifecycle and `docs/HANDOFF-instagram-feed.md` §4.1 for the layered
failsafe that keeps every grid tile clickable even when the feed,
Storage, or a single image breaks.

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variable
`NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the
sitemap, and structured data resolve correctly.

---

© Denish Gunawan Clinic. All rights reserved.
