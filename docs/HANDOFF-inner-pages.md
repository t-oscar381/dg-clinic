# Handoff Brief — Inner Pages & Brand Consistency

**Branch:** continue on `feature/dokden-rebrand`, **after** `HANDOFF-showcase.md`
**Work in stages. Stop after each stage and show the diff.**

## Audit result

The DOKDEN treatment reached **the homepage only**. `--dk-*` tokens appear in
exactly two files: `app/page.tsx` and `components/InstagramGrid.tsx`.

All eight other public routes still render the original light cream/navy design:

| Route | State |
|---|---|
| `/infusion-therapy` | light — old tokens |
| `/regenerative-therapy` | light — old tokens |
| `/metabolic-wellness` | light — old tokens |
| `/aesthetics-hair-growth` | light — old tokens |
| `/our-story` | light — old tokens |
| `/service-area` | light — old tokens |
| `/blog`, `/blog/[slug]` | light — old tokens |
| `/privacy` | light — old tokens |
| `/hnw-concierge` | light — placeholder shell |

Because `SiteHeader` is now the dark DOKDEN wordmark and ships site-wide, every
inner page currently renders a dark header sitting directly on a cream body.
That seam reads as a bug, not a design.

---

## Design decision — do NOT dark-theme everything

Take the dark treatment to **marketing surfaces only**. Long-form reading on a
dark background measurably hurts comprehension and is the wrong call for blog
posts and the privacy policy.

| Surface | Treatment |
|---|---|
| Homepage | Full dark — **done** |
| Four category pages | Dark hero band, light body below |
| `/hnw-concierge` | Full dark (it is a marketing page) |
| `/our-story` | Dark hero band, light body |
| `/service-area` | Dark hero band, light body |
| `/blog`, `/blog/[slug]` | Light — dark header/footer only |
| `/privacy` | Light — dark header/footer only |

The dark hero band is what makes the header seam intentional: the header sits on
a dark hero on every page, then the page opens into light content. That is the
unifying move — not repainting everything.

---

## Stage 1 — shared dark hero band

Add a reusable `.dk-page-hero` treatment (`--dk-slate` background,
`--dk-bone` text, `--dk-gold` eyebrow) and apply it to the existing
`.hero.container` block on:

`/infusion-therapy`, `/regenerative-therapy`, `/metabolic-wellness`,
`/aesthetics-hair-growth`, `/our-story`, `/service-area`, `/hnw-concierge`

Body content below the hero is untouched. Verify contrast passes WCAG AA on
`--dk-bone` over `--dk-slate`.

---

## Stage 2 — header/footer seam

- `components/SiteFooter.tsx` — restyle to `--dk-slate`. Migrate the logo
  `<img>` to `next/image` and drop the `eslint-disable`.
- Confirm the header renders correctly over both a dark hero and a light page
  top (`/blog`, `/privacy` have no hero band).

---

## Stage 3 — finish the `next/image` migration

Three raw `<img>` tags remain outside the admin panel:

- `components/SiteFooter.tsx:20` (logo)
- `app/blog/page.tsx:42` (post cover)
- `app/blog/[slug]/page.tsx:59` (post cover)

Blog covers come from the CMS, so add the appropriate `remotePatterns` to
`next.config.ts` — or keep `<img>` for those two **if** the covers are
arbitrary remote URLs, and leave a comment explaining why. Do not silently
leave them undone.

Admin-panel tags (`app/dgc-master/`, `components/admin/`) stay as-is.

---

## Stage 4 — brand metadata

Per `HANDOFF-rebrand.md` §0.1, DOKDEN is a website name only. Legal constants
stay untouched. But the wordmark currently appears nowhere in metadata:

- `app/layout.tsx:32` — title is still
  `"DG Clinic — Premium Homecare Wellness in Jakarta"`. Change the **display
  title only** to lead with DOKDEN, e.g.
  `"DOKDEN — Private Physician Services | Denish Gunawan Clinic"`.
- `app/layout.tsx:52` — JSON-LD `alternateName` is `"DG Clinic"`. Make it an
  array: `["DOKDEN", "DG Clinic"]`.

**Do not change** `SITE_NAME`, `LEGAL_NAME`, `SHORT_NAME`, JSON-LD `name`,
JSON-LD `legalName`, or anything in `app/privacy/`.

Body copy across the site says "DG Clinic" ~20 times. **Leave it.** That is the
clinic's name and is correct. DOKDEN is the site wordmark, not a replacement for
how the clinic refers to itself in prose.

---

## Stage 5 — `/hnw-concierge` decision (needs Tommy)

The page currently reads "Private Concierge Care, Coming Soon" and **is live in
the primary navigation**. For a high-net-worth audience, a nav item leading to a
coming-soon page is worse than no nav item — it signals the offering isn't real.

Two options, Tommy picks:

1. **Remove from primary nav** until approved copy exists. Keep the route
   reachable by direct link. *(Recommended — reversible in one line.)*
2. **Write the page**, which requires approved concierge service copy. Blocked
   until that exists; do not invent service claims (`HANDOFF-rebrand.md` §0.2).

Do not resolve this unilaterally.

---

## Constraints

Unchanged — re-read `HANDOFF-rebrand.md` §0.

- "Stem Cell & NK Cell" stays frozen: preserve the four existing occurrences,
  introduce it nowhere new.
- Infusion Therapy pricing menu stays exactly as-is.
- No guaranteed-outcome language, no before/after imagery, no peptide names.
- Legal name and privacy policy untouched.

## Verify

- Every public route renders a coherent header seam — no dark-on-cream break.
- `/blog` and `/privacy` remain light and readable.
- `next build` passes; Lighthouse contrast checks pass on the new dark bands.
- The four category pages, Infusion pricing, and `/dgc-master` behave exactly as
  on `main`.
