# Handoff Brief — Restore the Service Showcase (fix bento regression)

**Branch:** continue on `feature/dokden-rebrand`
**Work in stages. Stop after each stage and show the diff.**

## Why this exists

`components/CapabilityCards.tsx` currently renders four outlined boxes
containing a number, a title, and a paragraph — no imagery. It replaced
`FourPathsSplit`, which at least had image panels and a reveal interaction.

This was a briefing error, not an implementation error:
`docs/HANDOFF-rebrand.md` §3.2 said to replace `FourPathsSplit` and deferred
the imagery to `docs/HANDOFF-images.md` commit 2 — **which never ran.** With no
images on disk, a text grid was the only possible output.

The design intent is a **visual showcase of the four services**. Text-in-a-box
does not carry that intent. Restore it.

---

## Stage 1 — unblock the dev server (do this first)

`public/images/dokden/` is **9.7 MB across six PNGs**, 1–2 MB each. The spec was
WebP ≤250 KB. In dev, `next/image` optimises each PNG through sharp on first
request, which currently stalls the page long enough that it never finishes
loading.

- Convert all six to WebP, longest edge 1600px, **≤250 KB each**.
- Update the `src` references in `app/page.tsx` and
  `components/InstagramGrid.tsx`.
- Delete the source PNGs from `public/`.
- Target for the whole directory: **under 1.5 MB**.

Confirm `http://localhost:3000/` loads in under 2s before continuing.

---

## Stage 2 — produce the four category images

Source assets: `~/Downloads/[C] - Dokden Website/Images for Dokden/cleaned/`
(AI placeholders, watermark-free — see §4 of `HANDOFF-rebrand.md`).

| Card | Source file | Output | Ratio |
|---|---|---|---|
| Infusion Therapy | `Sunlit Home Care Living Room A.png` | `public/images/paths-infusion.webp` | 3:4 |
| Regenerative Therapy | `Careful Syringe and Vial Preparation B.png` | `public/images/paths-regenerative.webp` | 3:4 |
| Metabolic Wellness | `Consultation A.png` | `public/images/paths-metabolic.webp` | 3:4 |
| Aesthetics & Hair Growth | `Patient Happy A.png` | `public/images/paths-aesthetics.webp` | 3:4 |

Same budget: ≤250 KB each. Crop to 3:4 — check subject placement before
cropping, several were composed with deliberate negative space.

Then delete `public/images/infusion-drip.svg` and
`public/images/regenerative-yoga.svg` — no longer referenced.

---

## Stage 3 — restore the showcase

Bring back the panel-reveal treatment, restyled for DOKDEN.

- Reinstate `FourPathsSplit` on the homepage in place of `CapabilityCards`, or
  fold its panel markup into `CapabilityCards`. Either is fine — **the output
  must be four image panels, not text boxes.**
- Each panel gets its **own** image from stage 2. No reuse.
- Restyle to the `--dk-*` tokens: `--dk-slate-soft` fill, `--dk-border`
  hairline, `--dk-gold` for the number and the "Explore →" link.
- Keep the `01–04` numbering and the serif titles from `CapabilityCards` —
  those parts are good and match the mock.
- Image sits behind a scrim; text stays legible at all viewport widths.
- Retire whichever component ends up unused. Do not leave both wired up.

### Interaction

- **Pointer devices:** hover expands one panel, the other three compress.
  This is the existing `FourPathsSplit` behaviour — keep it.
- **Touch devices (`hover: none`):** render four plain stacked cards, **one tap
  navigates.** The current two-tap pattern (first tap selects, second
  navigates) reads as broken. This fix was specified in
  `HANDOFF-images.md` commit 3 and has not been done yet.

---

## Constraints

Unchanged from `docs/HANDOFF-rebrand.md` §0 — re-read it. Specifically:

- Do not introduce "Stem Cell & NK Cell" into any new copy. The existing four
  occurrences stay frozen. If a card would carry it over, use "Regenerative
  Therapy" and leave a `TODO(compliance)` comment.
- No prices on these cards. The Infusion Therapy pricing menu stays where it is.
- No guaranteed-outcome language in card copy.
- These images are AI placeholders — never caption or frame them as real
  patients, real staff, or real treatments.

---

## Verify

- Homepage loads under 2s locally.
- Four distinct images, one per card, no reuse.
- One tap navigates on a touch viewport.
- `public/images/` total under 3 MB.
- `next build` passes; `/blog`, `/privacy`, `/dgc-master`, the four category
  pages and the Infusion pricing menu are unchanged from `main`.
