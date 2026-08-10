# Complete Work Order — DOKDEN Theme Rollout

**Branch:** `feature/dokden-rebrand`
**Run end to end. No stage gating — commit logically, report once at the end.**

Supersedes the outstanding items in `HANDOFF-showcase.md` and
`HANDOFF-inner-pages.md`. `HANDOFF-hydration-bug.md` is retracted — ignore it.

Everything below uses assets that **already exist**. Nothing is blocked on new
photography or new AI generation.

---

## 0. Constraints — read first, do not violate

### Naming
DOKDEN is a **website wordmark only**. Do not change `SITE_NAME`, `LEGAL_NAME`,
`SHORT_NAME`, JSON-LD `name`, JSON-LD `legalName`, or anything in
`app/privacy/`. Meta / WhatsApp Business verification depends on them.
Body copy saying "DG Clinic" is correct — leave all ~20 occurrences.

Header lockup is **already correct**: `Logo.svg` top-left, DOKDEN bottom-right
in the footer. Do not revert.

### Medical compliance
1. No guaranteed-outcome language ("will", "guaranteed", "permanent", "cure").
2. No before/after imagery; no image framed as a patient outcome or testimonial.
3. No peptide names pending BPOM.
4. No new prices. The Infusion Therapy menu (`lib/pricing.ts`,
   `components/InfusionMenu.tsx`) is an approved exception — preserve exactly.
5. No patient photographs — none exist.
6. **"Stem Cell & NK Cell" is frozen.** Preserve the four existing occurrences
   (`app/regenerative-therapy/page.tsx` ×3, `components/FourPathsSplit.tsx` ×1).
   Do not introduce it in any new copy.

### AI imagery
All photography in `public/images/` is AI-generated placeholder except
`founder.avif`, which is a **real photo of Dr. Denish**.

- **Never AI-generate Dr. Denish**, and never present a generated face as him.
- Generated images may be used as ambience, process, and background only.
- Never caption or frame them as real patients, real staff, or real treatments.

---

## 1. Image weight — do this first

`public/images/dokden/` is **9.7 MB across six PNGs**. This is the main cause of
slow cold compiles in dev.

- Convert all six to WebP, longest edge 1600px, **≤250 KB each**.
- Update `src` references in `app/page.tsx` and `components/InstagramGrid.tsx`.
- Delete the source PNGs.
- Target for `public/images/` overall: **under 3 MB**.

---

## 2. Founder portrait — `/our-story`

**The asset is fine; the presentation is wrong.** `founder.avif` is 847×1374,
but `.portrait-photo` crops it to a 200×200 circle — that is why it reads as
small and low-status.

Rebuild the `/our-story` hero as a **two-column split**:

- **Left:** eyebrow, `<h1>`, lede (existing copy).
- **Right:** `founder.avif` as a large portrait — roughly 420×680, rounded
  corners (`--radius-lg`), not a circle, `object-position: center top`.
  Keep `priority`.
- Stack to single column under 900px, portrait first, max-height ~460px.
- Retire `.portrait-photo` or scope it so nothing else regresses.

Do **not** substitute an AI doctor image for him anywhere on this page.

---

## 3. Inner page theme — match the homepage

Currently only `app/page.tsx` and `components/InstagramGrid.tsx` use `--dk-*`.
Every other public route is still the old cream/navy theme under a dark header.

Add a reusable **`.dk-page-hero`** band — `--dk-slate` background, `--dk-bone`
text, `--dk-gold` eyebrow, full-bleed background image behind a scrim — and
apply it to the existing `.hero.container` block on each page below.

**Body content below the hero stays light and unchanged.** Do not dark-theme
long-form reading surfaces.

### Hero images — use existing assets

Source: `~/Downloads/[C] - Dokden Website/Images for Dokden/cleaned/`
Process each to **WebP, 2400×1000, ≤250 KB**, into `public/images/heroes/`.
Crop wide, keep the subject to one side, leave the centre-left clear for the
headline. Darken slightly — text sits on top.

| Route | Source file | Output |
|---|---|---|
| `/infusion-therapy` | `Sunlit Home Care Living Room B.png` | `hero-infusion.webp` |
| `/regenerative-therapy` | `Careful Syringe and Vial Preparation A.png` | `hero-regenerative.webp` |
| `/metabolic-wellness` | `Consulation B.png` | `hero-metabolic.webp` |
| `/aesthetics-hair-growth` | `Patient Happy B.png` | `hero-aesthetics.webp` |
| `/our-story` | `Home Visit C.png` | `hero-our-story.webp` |
| `/service-area` | `Home Visit B.png` | `hero-service-area.webp` |
| `/hnw-concierge` | `Careful Syringe and Vial Preparation C.png` | `hero-hnw.webp` |

`/our-story`: the band sits **behind** the split hero from §2. `founder.avif`
remains the foreground portrait.

`/blog`, `/blog/[slug]`, `/privacy`: **light, no hero image.** Dark header and
footer only. These are reading pages.

Verify headline contrast passes **WCAG AA** over each image, not just over flat
`--dk-slate`. Deepen the scrim where it fails.

---

## 4. Footer

Restyle to `--dk-slate` so header and footer bracket every page consistently.
Migrate the logo `<img>` (`SiteFooter.tsx:20`) to `next/image` and drop the
`eslint-disable`. Keep the DOKDEN wordmark bottom-right.

---

## 5. Remaining `next/image` migration

Two raw `<img>` tags left outside admin: `app/blog/page.tsx:42` and
`app/blog/[slug]/page.tsx:59` — both CMS-supplied post covers.

Either add appropriate `remotePatterns` to `next.config.ts`, **or** keep `<img>`
and leave a comment explaining that covers are arbitrary remote URLs. Do not
leave this undecided. Admin-panel tags stay as-is.

---

## 6. Metadata

- `app/layout.tsx:32` — display title only:
  `"DOKDEN — Private Physician Services | Denish Gunawan Clinic"`
- `app/layout.tsx:52` — JSON-LD `alternateName` → `["DOKDEN", "DG Clinic"]`

Nothing else in the structured data changes.

---

## 7. Cleanup

- Remove the dead `.header-wordmark` rule from `globals.css` (no JSX refs).
- Run `Logo.svg` through SVGO — it is **353 KB** and loads on every page.
  Should land under ~20 KB.
- Delete `components/CapabilityCards.tsx` if `FourPathsSplit` is now the live
  homepage showcase. Do not leave both wired up.
- `public/images/archive/` holds the retired SVGs — leave it.

---

## 8. Known gaps — flag, do not resolve

1. Hero headline says **"Indonesia's leading"** — unsubstantiated superiority
   claim, conflicts with §0. Leave in place, flag in your report.
2. `/hnw-concierge` is a "Coming Soon" shell **live in the primary nav**.
   Leave the route; flag that Tommy should decide whether to hide the nav item.
3. Hero subhead renders wrapped in literal quote marks from the CMS default —
   looks odd in a hero. Flag it; the fix is a CMS content edit, not code.
4. All imagery except `founder.avif` is AI placeholder pending a real shoot.

---

## Verify before reporting

- `npm run build` passes.
- `public/images/` under 3 MB.
- Every public route: dark header → dark hero band → light body, no theme break.
- `/blog` and `/privacy` remain light and readable.
- Founder portrait renders large on `/our-story`, sharp, not a small circle.
- Service dropdown opens; the four showcase panels each show a distinct image;
  one tap navigates on a touch viewport.
- Infusion pricing menu, `/dgc-master`, and `/privacy` behave exactly as on
  `main`.
