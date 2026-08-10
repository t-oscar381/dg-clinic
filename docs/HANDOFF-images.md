# Handoff Brief — Homepage Imagery

Context doc: `docs/image-prompts.md` (slot definitions and rationale).
Source assets: `~/Downloads/[C] - Dokden Website/Images for Dokden/cleaned/`
(16 files, watermark-free, PNG. Originals in the parent folder — do not use those,
they carry a Gemini watermark bottom-right.)

**Do these as three separate commits, in order.** Do not combine them.

---

## Commit 1 — image infrastructure (no new images)

No visual change expected. This must land first; retrofitting it after 10 images
are in is strictly more work.

1. Migrate existing raw `<img>` tags to `next/image`:
   - `app/our-story/page.tsx` (founder portrait)
   - `components/FourPathsSplit.tsx` (`.split-img`)
   - Leave the two admin-panel logo tags in `app/dgc-master/` and
     `components/admin/FinanceSimulator.tsx` alone — not user-facing.
   - Remove the now-unnecessary `eslint-disable @next/next/no-img-element`
     comments as you go.
2. In `app/page.tsx`, replace `export const dynamic = "force-dynamic"` with
   `export const revalidate = 300`.
   - Verify admin edits at `/dgc-master/content` still appear within 5 min.
   - This removes a Supabase round-trip from every visitor's critical path.
3. Confirm `next build` passes and CLS is unchanged.

**Do not** add `remotePatterns` or Supabase Storage config. Images are local in
`public/` for now — that's deliberate, revisit when the real photo shoot lands.

---

## Commit 2 — process images and place them

Convert each selection to WebP, longest edge 1600px, **under 250 KB each**.
Output to `public/images/`. Total budget for the set: ~2.5 MB.

| Slot | Source file (from `cleaned/`) | Output | Ratio |
|---|---|---|---|
| Four Paths — Infusion | `Sunlit Home Care Living Room A.png` | `paths-infusion.webp` | 3:4 |
| Four Paths — Regenerative | `Careful Syringe and Vial Preparation B.png` | `paths-regenerative.webp` | 3:4 |
| Four Paths — Metabolic | `Consultation A.png` | `paths-metabolic.webp` | 3:4 |
| Four Paths — Aesthetics | `Patient Happy A.png` | `paths-aesthetics.webp` | 3:4 |
| Step 1 — Book | `Smartphone B.png` | `step-1-book.webp` | 4:3 |
| Step 2 — Arrive | `Home Visit B.png` | `step-2-arrive.webp` | 4:3 |
| Step 3 — Treat | `Home Visit C.png` | `step-3-treat.webp` | 4:3 |
| Trust block | `Bag A.png` | `trust-case.webp` | 1:1 |

Crop to ratio from centre unless the subject sits off-centre — several of these
were composed with deliberate negative space for text overlay, so check before
cropping rather than blind centre-cropping.

**Not used:** `Luxury ... Collage.png` (moodboard only, redundant),
plus the unused A/B/C variants — leave them out of the repo entirely.

---

## Commit 3 — wire into components

1. `components/FourPathsSplit.tsx` — give each of the four panels its **own**
   `image` value. Currently `infusion-drip.svg` and `regenerative-yoga.svg` are
   each reused across two cards, so Metabolic shows an IV bag and Aesthetics
   shows a meditating woman. Update the `alt` text to match the new photos.
   Delete the two now-unused SVGs.
2. Mobile interaction fix: the current `handleClick` requires two taps on touch
   devices (first selects, second navigates). Users read that as broken. On
   `(hover: none)`, render four plain stacked cards where one tap navigates.
   Keep the hover-reveal for pointer devices only.
3. Add a new **"How a Visit Works"** section to `app/page.tsx`, between the
   Four Paths section and the navy trust block. Three steps, using
   `step-1/2/3`. Copy direction: book on WhatsApp → licensed doctor arrives →
   treatment in your own home.
4. Add `trust-case.webp` to the navy "Care Built Around Privacy" block.
5. Do **not** touch the hero. The founder portrait stays as-is pending a real
   photo — see constraints below.

---

## Constraints — do not violate

- **Never AI-generate Dr. Denish.** He is a real, licensed physician. Keep
  `public/images/founder.avif`. A synthetic face presented as him is a
  misrepresentation, not a placeholder.
- **No generated image may be presented as a patient outcome, testimonial, or
  before/after.** Indonesian medical advertising rules (Permenkes / IDI ethics)
  restrict outcome claims. These assets are ambience and process only.
- All imagery here is **temporary**, pending a real shoot. Keep the mapping in
  this file updated so swapping is a one-line change per slot.

---

## Known gaps — not blockers, flag to Tommy

- **Masks.** `Careful Syringe A/B`, `Consultation A`, `Home Visit Doctor B` and
  `Home Visit C` show the doctor masked. Reads as 2021–22 and hides the face,
  which is the point of the image. Worth regenerating unmasked.
- **No dedicated aesthetics/hair-growth image.** `Patient Happy A` is being
  borrowed for slot 2D above; it was generated for a different purpose.
- **Slot 5 (aerial Jakarta neighbourhood) was never generated.** Section is
  currently text-only — leave it that way rather than substituting.
