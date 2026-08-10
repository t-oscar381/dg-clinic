# DG Clinic — Image Slots & Generation Prompts (Temporary AI Assets)

Status: **temporary placeholders**, to be replaced by a real photo shoot.
Generate with: Gemini / ChatGPT Pro (GPT Image).
Target: `care.dokden.com`

---

## 0. Read this before generating

**Do NOT AI-generate Dr. Denish.** He is a real, named person with a real
medical licence. A synthetic face presented as him is a misrepresentation, not
a placeholder. Keep the existing `public/images/founder.avif` for every slot
that calls for the founder, and upgrade it in the real shoot.

**Do NOT generate patients receiving treatment and present them as testimonials,
outcomes, or before/after.** Indonesian medical advertising rules (Permenkes /
IDI ethics) restrict outcome claims, and a synthetic outcome image is the
highest-risk asset you could publish. Generated imagery here is **ambience and
process only** — never evidence.

**Consistency workflow.** Generate one "anchor" image first (Slot 4A, the
doctor's hands + case), then feed it back as a reference image for every
subsequent prompt so palette, wardrobe and lighting stay identical. Generating
each slot cold will give you 12 images that don't belong to the same brand.

**Export settings.** Longest edge 1600px, WebP or AVIF, target under 250 KB
each. Commit to `public/images/`. Total budget for the set: ~2.5 MB.

---

## Brand constraints — append to EVERY prompt

```
Photorealistic editorial photography, not illustration, not 3D render.
Indonesian / Southeast Asian subjects only.
Upscale contemporary Jakarta residential interior — warm wood, stone, linen,
large windows, soft natural daylight. No hospital, no clinic, no fluorescent
lighting, no white institutional walls.
Muted palette: warm cream, deep navy, soft teal accent, warm neutrals.
Calm, quiet, expensive. Shallow depth of field, natural light, no flash.
Composition leaves clean negative space for text overlay.
No text, no logos, no watermarks, no signage.
No stethoscope-around-neck clichés, no thumbs up, no crossed arms,
no smiling-at-camera stock poses, no blue latex-glove close-ups on white.
```

---

## Slot 1 — Hero (above the fold)

Replaces: nothing. This is net-new; the hero is currently type-only.
Aspect: **4:5 portrait** · Placement: right half of a split hero.

> A composed Indonesian male physician in his late 30s, wearing a well-tailored
> navy suit jacket over a soft grey clinical shirt, seated in a bright modern
> living room. Warm daylight from a large window behind him. A brown leather
> doctor's case rests beside him. He is looking slightly off-camera, relaxed and
> attentive. Quiet luxury. Negative space on the left third.

**Use the real founder photo here if it can be reshot.** This slot carries more
trust weight than every other image combined.

---

## Slot 2 — Four Paths panels (×4)

Replaces: `infusion-drip.svg` and `regenerative-yoga.svg`, currently reused
across two cards each. Every card needs its **own** image.
Aspect: **3:4 portrait** (panels are tall) · Dark overlay sits on top, so
generate slightly brighter than final and keep the subject in the upper half.

### 2A — Infusion Therapy → `paths-infusion.webp`
> An IV drip bag hanging on a slim stand beside a linen armchair in a sunlit
> Jakarta living room. Clear fluid, clean medical tubing, no branding. Soft
> shadows on a warm plaster wall. Nobody in frame. Serene and clinical-clean
> without feeling like a hospital.

### 2B — Regenerative Therapy → `paths-regenerative.webp`
> Gloved hands of a physician carefully preparing a small glass vial and syringe
> on a clean stone surface, shallow depth of field. Warm daylight. A folded
> linen cloth and a stainless tray nearby. Precise, scientific, calm. Cropped at
> the forearms, face not visible.

### 2C — Metabolic Wellness → `paths-metabolic.webp`
> An Indonesian woman in her 40s in soft neutral loungewear, seated at a bright
> kitchen counter in a modern Jakarta home, mid-conversation with a doctor
> partially visible in the foreground. A notebook and a glass of water on the
> counter. Consultative, warm, unhurried. Health and vitality, not weight loss.

### 2D — Aesthetics & Hair Growth → `paths-aesthetics.webp`
> Close portrait of an Indonesian woman in her 30s with healthy skin and hair,
> soft natural window light, neutral cream background, eyes closed or looking
> down, serene expression. Skincare-editorial mood. No treatment visible, no
> before/after framing, no procedure in progress.

---

## Slot 3 — "How a Visit Works" (×3) — NEW SECTION

The biggest missing block on the site. You ask people to let a stranger into
their home with a needle and show them nothing about what that looks like.
Aspect: **4:3 landscape** · Shown as three steps in a row.

### 3A — Book → `step-1-book.webp`
> A hand holding a smartphone in a bright modern Jakarta living room, screen
> angled away and not legible. Warm morning light, linen sofa and a plant
> softly out of focus behind. Calm, effortless, unhurried.

### 3B — Doctor arrives → `step-2-arrive.webp`
> An Indonesian physician in a smart navy jacket carrying a brown leather
> medical case, stepping through the doorway of an upscale Jakarta home.
> Photographed from inside, warm daylight spilling in behind him. Discreet and
> professional — reads as a welcome guest, not an emergency.

### 3C — Treatment at home → `step-3-treat.webp`
> Wide shot of a physician seated beside a patient in a bright, beautifully
> furnished living room, an IV stand nearby. Both relaxed, mid-conversation.
> Patient's face turned away or softly out of focus. Emphasis on the calm,
> private domestic setting rather than the medical procedure.

---

## Slot 4 — Trust block (navy section)

Aspect: **1:1** · Sits beside the "Care Built Around Privacy" statement.

### 4A — ANCHOR IMAGE — generate this first → `trust-case.webp`
> Detail shot of an open brown leather doctor's case on a dark wood surface,
> neatly organised medical instruments and vials inside. Single soft window
> light from the left, deep shadows, dark navy background. Still-life
> craftsmanship mood — like a watch or luggage advertisement, not a medical
> catalogue.

Use the accepted output of 4A as the reference image for all other prompts.

---

## Slot 5 — Service area

Aspect: **21:9 banner** · Sits above the Jakarta service-area copy.

> Elevated view of an upscale South Jakarta residential neighbourhood at golden
> hour — low-rise homes, mature trees, distant city towers softly hazy. Warm,
> calm, aspirational. No people, no cars in focus, no recognisable signage.

---

## Slot 6 — Instagram strip

**Generate nothing.** Pull live from @dg.clinic.hnw. Real posts outperform any
synthetic image here, and it refreshes itself.

---

## Summary

| # | Slot | File | Ratio | Generate? |
|---|------|------|-------|-----------|
| 1 | Hero founder | `founder.avif` (existing) | 4:5 | **No — real photo** |
| 2A | Infusion | `paths-infusion.webp` | 3:4 | Yes |
| 2B | Regenerative | `paths-regenerative.webp` | 3:4 | Yes |
| 2C | Metabolic | `paths-metabolic.webp` | 3:4 | Yes |
| 2D | Aesthetics | `paths-aesthetics.webp` | 3:4 | Yes |
| 3A | Step 1 book | `step-1-book.webp` | 4:3 | Yes |
| 3B | Step 2 arrive | `step-2-arrive.webp` | 4:3 | Yes |
| 3C | Step 3 treat | `step-3-treat.webp` | 4:3 | Yes |
| 4A | Case still-life | `trust-case.webp` | 1:1 | Yes — **first** |
| 5 | Service area | `service-area.webp` | 21:9 | Yes |
| 6 | Instagram | — | — | No — live feed |

**9 images to generate.** Start with 4A.

---

## Code changes these images depend on

1. Migrate raw `<img>` → `next/image` **before** adding any of these. Twelve
   tags retrofitted later is strictly more work than doing it once now.
2. Replace `export const dynamic = "force-dynamic"` on `app/page.tsx` with
   `export const revalidate = 300`. Removes a Supabase round-trip from every
   visitor's critical path — matters much more once images are in.
3. Give each Four Paths panel its own `image` value in `FourPathsSplit.tsx`
   (currently two SVGs shared across four cards).
4. Mobile: one tap to navigate. Keep hover-reveal for pointer devices only.
