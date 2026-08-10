# Handoff Brief — "DOKDEN" Website Rebrand

**Branch:** `feature/dokden-rebrand` (branch from `main`, keep separate from the
image-swap work in `docs/HANDOFF-images.md`)

**Work in stages. Stop after each stage and show the diff before continuing.**

Related docs: `docs/HANDOFF-images.md`, `docs/image-prompts.md`.

---

## 0. Non-negotiables — read before writing any code

These are the rules most likely to be lost in a large rewrite. They are not
documented anywhere else in the repo — this file is now their only home.

### 0.1 Naming

**DOKDEN is a website/wordmark name only. It is NOT a legal or entity rename.**

| Constant | Value | Change? |
|---|---|---|
| `SITE_NAME` | `Denish Gunawan Clinic` | **No** |
| `LEGAL_NAME` | `Denish Gunawan Clinic` | **No** |
| `SHORT_NAME` | `DG Clinic` | **No** |
| JSON-LD `legalName` | `Denish Gunawan Clinic` | **No** |
| JSON-LD `name` | `Denish Gunawan Clinic` | **No** |

Do **not** touch:
- `lib/site.ts` name constants
- JSON-LD `legalName` / `name` / `founder` in `app/layout.tsx`
- `app/privacy/` — the privacy policy names the legal entity and is tied to
  Meta / WhatsApp Business verification already approved under that name
- Anything referencing the HAKI filing

DOKDEN may appear as: the header wordmark, the browser/OG title, and display
headings. If you need a constant, **add** `export const WORDMARK = "DOKDEN"` to
`lib/site.ts`. Do not repurpose an existing one.

You may add `alternateName: "DOKDEN"` to the JSON-LD. That is the only
structured-data change permitted.

### 0.2 Medical compliance — carry over unchanged

These apply to all new copy:

1. **No guaranteed-outcome language.** No "will," "guaranteed," "permanent,"
   "cure." Use "supports," "designed to," "may help."
2. **No before/after imagery**, and no image presented as a patient outcome,
   result, or testimonial.
3. **No peptide names** pending BPOM clearance.
4. **No new prices** beyond the existing Infusion Therapy menu (see 0.3).
5. **No patient photographs** without written consent. None exist today.
6. **No claims of hospital equivalence** beyond the approved tagline
   "Hospital-Level Excellence. Boutique-Level Care."

### 0.3 Two standing exceptions — confirmed, do not "fix"

**Infusion Therapy prices are published deliberately.** `lib/pricing.ts` and
`components/InfusionMenu.tsx` are approved, including the was/now/save
presentation. Preserve them exactly. All other categories remain quote-via-
WhatsApp with no prices.

**"Stem Cell & NK Cell" wording is FROZEN, pending review.** It currently
appears in four places:

- `app/regenerative-therapy/page.tsx` — `tab`, `badge`, and prefilled WhatsApp
  message (lines ~25, 26, 32)
- `components/FourPathsSplit.tsx` — chip (line ~37)

Rules for this branch:
- **Do not remove or rename it.**
- **Do not introduce it anywhere new** — no new DOKDEN copy may use the phrase.
- If a rebranded section would naturally carry it over, use
  "Regenerative Therapy" instead and leave a `TODO(compliance)` comment.

Tommy is checking whether this wording is permitted. Treat it as radioactive:
preserve where it is, spread it nowhere.

---

## 1. Design tokens

**Extend `:root` in `app/globals.css`. Do not delete existing tokens** — the
four category pages, admin panel, and PDF renderer all depend on them, and this
branch does not restyle those.

Add a DOKDEN scope alongside the existing palette:

```css
/* DOKDEN — dark editorial surface */
--dk-ink:        #1c2226;  /* wordmark, headings on light */
--dk-slate:      #30373d;  /* dark band background */
--dk-slate-soft: #323b42;  /* card fill on dark band */
--dk-border:     #4a545c;  /* hairline card border */
--dk-gold:       #b49f74;  /* primary CTA + icon accent */
--dk-gold-deep:  #96825c;  /* CTA hover */
--dk-bone:       #f2f1ed;  /* light page surface */
--dk-muted:      #a9adb0;  /* secondary nav / meta text */
```

Values sampled from the reference mock. **Verify against the final brand art
before shipping** — the mock is a raster comp, not a spec.

### Typography

Current stack (keep — the licensed files load ahead of the standins):

- `--font-heading`: IvyPresto → Playfair Display standin
- `--font-subheading`: Quasimoda → Playfair standin
- `--font-body`: Montserrat

The mock's display face is a high-contrast serif set in **uppercase with wide
letter-spacing** — that is a *treatment*, not a new typeface. Achieve it with
IvyPresto plus:

```css
--dk-display-transform: uppercase;
--dk-display-tracking: 0.06em;
--dk-display-weight: 400;
```

**Do not add a new webfont.** IvyPresto is already licensed and paid for;
adding a fourth family costs load time and licensing risk for a look the
existing font can produce. If it genuinely cannot match, stop and ask.

### Layout

Keep the existing `.container` width and spacing scale. The DOKDEN look comes
from full-bleed imagery and the dark band, not from a new grid.

---

## 2. Navigation

New nav, **existing routes preserved**, redirects for anything renamed.

| DOKDEN label | Destination |
|---|---|
| About Dr. Denish | `/our-story` (existing) |
| Services | dropdown → the four existing `NAV_CATEGORIES` |
| HNW Concierge | `/hnw-concierge` (**new page**) |
| Request Consultation | `/service-area` (existing) |
| **Doctor Dispatch** (CTA button) | WhatsApp via `waLink()` |

- Update `NAV_SECONDARY` in `lib/site.ts`; leave `NAV_CATEGORIES` untouched.
- Move **Blog** to the footer. Do not delete `/blog` or any post.
- Every existing URL must still resolve. Add redirects in `next.config.ts`
  alongside the existing `/stem-cell-weight-loss` rule for anything you rename.
- `/hnw-concierge` is the only genuinely new route. If there is no approved copy
  for it, build the page shell and stop — do not invent service claims.

---

## 3. Homepage sections

Order top to bottom. **Preserve every existing section's content** unless the
table says replace.

| # | Section | Action |
|---|---|---|
| 1 | Hero — full-bleed image, headline, subhead, gold CTA | **Replace** current type-only hero |
| 2 | 3-column capability cards | **Replace** `FourPathsSplit` on the homepage |
| 3 | How a Visit Works | New — see `HANDOFF-images.md` commit 3 |
| 4 | Care Built Around Privacy (navy block) | **Keep**, restyle to `--dk-slate` |
| 5 | Instagram grid | New |
| 6 | Service area teaser | **Keep** as-is |

### 3.1 Hero

Headline: **PRIVATE PHYSICIAN SERVICES. UNCOMPROMISING CARE.**
Subhead: "Indonesia's leading doctor-led homecare, founded in 2021 by
Dr. Denish Gunawan. Registered Denish Gunawan Clinic."
CTA: **DISPATCH A DOCTOR** → `waLink()`, gold fill.

⚠️ **"Indonesia's leading" is an unsubstantiated superiority claim** and sits
badly against rule 0.2. Recommend "Jakarta's trusted doctor-led homecare" or
"Doctor-led homecare across Greater Jakarta." Flag to Tommy; do not ship
"leading" without his explicit sign-off.

### 3.2 Three capability cards

Gold icon, numbered, on `--dk-slate-soft` with a `--dk-border` hairline:

1. **Precise Homecare** — Doctor Visits · Nursing
2. **Cellular Wellness** — NAD+ · Longevity Therapies
3. **Advanced Diagnostics** — Mobile Lab · Imaging

⚠️ **These three do not match the four services the site actually sells**
(Infusion, Regenerative, Metabolic, Aesthetics & Hair Growth). "Mobile Lab,"
"Imaging," and "Nursing" are not offered anywhere on the current site.

**Do not build cards that advertise services the clinic may not provide.**
Either map them to the four real categories, or get written confirmation these
three are real offerings. Stop and ask before implementing.

Note the homepage `FourPathsSplit` is being replaced here, but the component
stays in the repo — the four category pages still use its patterns, and the
mobile two-tap fix in `HANDOFF-images.md` still applies.

### 3.3 Instagram grid

Six tiles, `@dg.clinic.hnw`, linking to `INSTAGRAM_URL`. Static curated images
are acceptable for v1; no API integration required. Label the section with the
handle, as in the mock.

---

## 4. Photography

**There is no licensed shoot.** Every image in
`~/Downloads/[C] - Dokden Website/Images for Dokden/cleaned/` is AI-generated
(Gemini), watermark-removed. They are temporary placeholders.

| Placement | Asset | Note |
|---|---|---|
| Hero | `Home Visit Doctor B.png` | Best available doctor-in-home frame |
| Trust block | `Bag A.png` | Leather case still-life |
| Capability cards ×3 | per `HANDOFF-images.md` | — |
| Founder portrait (`/our-story`) | `public/images/founder.avif` | **Real photo — keep** |

**Never AI-generate Dr. Denish.** He is a real, licensed physician; a synthetic
face presented as him is a misrepresentation, not a placeholder. `founder.avif`
stays until a real shoot replaces it.

⚠️ Several generated frames show the doctor **masked**, which dates the imagery
and hides the face. Prefer unmasked frames where available.

Any AI-generated image used as hero or section art must not be captioned or
framed as depicting real staff, real patients, or real treatments.

---

## 5. Staging

Stop after each stage.

1. **Tokens + wordmark** — add `--dk-*` tokens and `WORDMARK`. No layout change.
2. **Header/nav + footer** — new nav, Blog to footer, redirects, `/hnw-concierge`
   shell. All old URLs still resolve.
3. **Hero** — full-bleed image, headline, gold CTA. *Headline copy needs sign-off
   first (see 3.1).*
4. **Capability cards** — *blocked until 3.2 service mismatch is resolved.*
5. **Dark-band restyle** — recolour the existing privacy block. Content unchanged.
6. **Instagram grid.**
7. **Verify** — `next build` passes; JSON-LD `legalName` unchanged; the four
   category pages, `/blog`, `/privacy`, `/dgc-master` and the Infusion pricing
   menu all render exactly as on `main`.

---

## 6. Open items for Tommy — do not resolve unilaterally

1. **"Indonesia's leading"** — unsubstantiated superiority claim (3.1).
2. **Precise Homecare / Cellular Wellness / Advanced Diagnostics** — advertise
   services not currently offered (3.2). **Hard blocker on stage 4.**
3. **"Stem Cell & NK Cell"** — frozen pending compliance review (0.3).
4. **`/hnw-concierge`** — no approved copy exists.
5. **Real photography** — all current assets are AI placeholders.
