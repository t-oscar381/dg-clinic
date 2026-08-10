# Inner Page Image Prompts — Dark Hero Bands

Companion to `docs/image-prompts.md` (homepage) and
`docs/HANDOFF-inner-pages.md` (the layout plan).

Generate with Gemini / ChatGPT Pro. **8 images.**

These sit behind the `.dk-page-hero` dark band on each inner page, under a
scrim with headline text on top. That changes what makes a good image:

- **Composition must be quiet.** The subject sits to one side or is
  atmospheric. No busy centre — the headline goes there.
- **Generate darker than feels right.** A scrim goes over the top; a bright
  image fights white text.
- **Wide crops.** These are bands, not portraits.

---

## Shared constraint block — append to EVERY prompt

```
Photorealistic editorial photography, not illustration, not 3D render.
Indonesian / Southeast Asian subjects only.
Upscale contemporary Jakarta residential interior — warm wood, stone, linen,
large windows, soft natural daylight. No hospital, no clinic, no fluorescent
lighting, no white institutional walls.
Muted palette: warm cream, deep slate, soft gold accent, warm neutrals.
Moody and low-key — deep shadows, light falling from one side.
Calm, quiet, expensive. Shallow depth of field, natural light, no flash.
Wide cinematic composition with clean empty space in the centre-left for a
headline overlay.
No text, no logos, no watermarks, no signage.
No stethoscope-around-neck clichés, no thumbs up, no crossed arms,
no smiling-at-camera stock poses, no blue latex-glove close-ups on white.
```

**Consistency:** reuse `Bag A` (the leather case still-life) as a reference
image on every prompt so the whole set shares one lighting and palette.

**Export:** 2400×1000, WebP, **≤250 KB each**, into `public/images/heroes/`.

---

## 1 — Infusion Therapy → `hero-infusion.webp`

> A slim IV stand with a clear drip bag beside a linen armchair, positioned to
> the right of frame in a dimly lit upscale Jakarta living room at late
> afternoon. Warm light rakes in from a window on the right; the left half of
> the frame falls into soft shadow. Nobody in frame. Serene, still, clinical-
> clean without feeling like a hospital.

## 2 — Regenerative Therapy → `hero-regenerative.webp`

> Gloved hands of a physician preparing a small glass vial on a dark stone
> surface, framed to the right of centre. Single hard light source from the
> upper right, deep shadow filling the left of the frame. Precise and
> scientific. Cropped at the forearms, face not visible.

⚠️ Compliance: nothing suggesting cell cultures, laboratory branding, or
"stem cell" iconography. This page's naming is frozen pending review
(`HANDOFF-rebrand.md` §0.3).

## 3 — Metabolic Wellness → `hero-metabolic.webp`

> An Indonesian woman in her 40s in soft neutral loungewear, seated at a bright
> kitchen counter, shot wide from a distance so she occupies the right third of
> the frame. A notebook and a glass of water beside her. Early morning light.
> Calm and unhurried — health and vitality, not weight loss.

⚠️ Compliance: no scales, no measuring tape, no body-comparison framing, no
before/after implication.

## 4 — Aesthetics & Hair Growth → `hero-aesthetics.webp`

> Close side-profile of an Indonesian woman in her 30s with healthy skin and
> hair, positioned at the right edge of a wide frame, eyes closed, serene.
> Soft window light from the right; the rest of the frame is a smooth, dark,
> out-of-focus neutral wall. Skincare-editorial mood.

⚠️ Compliance: **no treatment in progress, no needles, no before/after
framing.** This is the highest-risk page — ambience only.

## 5 — Our Story → `hero-our-story.webp`

> A quiet, empty upscale Jakarta living room at golden hour — linen sofa, warm
> wood, a leather doctor's case resting closed on a side table. Nobody in
> frame. Nostalgic and warm, deep shadows in the corners.

⚠️ **Do not generate Dr. Denish.** The real `founder.avif` portrait stays as
the page's foreground image; this is only the band behind it.

## 6 — Service Area → `hero-service-area.webp`

> Elevated wide view of an upscale South Jakarta residential neighbourhood at
> dusk — low-rise homes, mature trees, distant city towers hazy in the
> background, warm window lights beginning to glow. No people, no cars in
> focus, no recognisable signage or number plates.

## 7 — HNW Concierge → `hero-hnw-concierge.webp`

> A private residence entrance hall at night — dark stone, warm pooled lamp
> light, a single orchid, polished surfaces. Empty, hushed, discreet.
> Luxury-hotel arrival mood rather than medical.

⚠️ Page copy is still unapproved (`HANDOFF-rebrand.md` §6). Generate the image;
do not let it imply services that haven't been signed off.

## 8 — Blog fallback cover → `blog-fallback.webp`

For posts where `cover_image_url` is empty. **16:9, 1600×900.**

> An abstract, softly out-of-focus warm interior texture — linen weave and
> pale wood in raking window light. No subject, no people, no medical objects.
> Neutral enough to sit under any article title.

---

## Summary

| # | File | Size | Page |
|---|---|---|---|
| 1 | `hero-infusion.webp` | 2400×1000 | `/infusion-therapy` |
| 2 | `hero-regenerative.webp` | 2400×1000 | `/regenerative-therapy` |
| 3 | `hero-metabolic.webp` | 2400×1000 | `/metabolic-wellness` |
| 4 | `hero-aesthetics.webp` | 2400×1000 | `/aesthetics-hair-growth` |
| 5 | `hero-our-story.webp` | 2400×1000 | `/our-story` |
| 6 | `hero-service-area.webp` | 2400×1000 | `/service-area` |
| 7 | `hero-hnw-concierge.webp` | 2400×1000 | `/hnw-concierge` |
| 8 | `blog-fallback.webp` | 1600×900 | `/blog` |

**`/privacy` gets no image** — legal page, plain and readable.

---

## Standing rules

- All AI imagery is a temporary placeholder pending a real shoot.
- Never AI-generate Dr. Denish.
- No image may be captioned or framed as real patients, real staff, real
  treatments, or treatment outcomes.
- Watermark check: Gemini exports carry a sparkle bottom-right at roughly
  92px in from the right and 91px up from the bottom. Remove before use.
