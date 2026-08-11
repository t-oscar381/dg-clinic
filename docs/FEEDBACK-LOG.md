# Feedback Log — DOKDEN Website

Running record of stakeholder feedback. Append each round; do not overwrite.
Claude Code should read this before any copy or styling change.

---

## Standing naming rules (apply everywhere, permanently)

**`dr. Denish` — lowercase `dr.`, always.**

In Indonesian convention `dr.` (lowercase) denotes a medical doctor (*dokter*),
while `Dr.` (capitalised) denotes an academic doctorate (*Doktor*). Writing
"Dr. Denish" is factually the wrong title. This is deliberate — **do not
"correct" it back to `Dr.`**, and do not let a linter or find-and-replace
normalise it.

Applies to body copy, alt text, metadata, JSON-LD `founder.name`, and prefilled
WhatsApp messages. Existing correct usages such as
`dr. Denish Gunawan, MPH` stay as they are.

**Exception — navigation and page heading:** the nav item and `<h1>` currently
reading "About Dr. Denish" become **"About Founder"**. Route stays
`/our-story`. Update `NAV_SECONDARY` in `lib/site.ts` and the footer link label.

---

## Round 1 — 11 Aug 2026 · Nicole Trisha (Neunyx branding)

Source: Neunyx Branding Group WhatsApp thread. Reviewed the live merge on
`care.dokden.com`, desktop and mobile.

### Copy & content

| # | Item | Detail | Status |
|---|---|---|---|
| 1.1 | Hero headline all-caps reads as shouting | "PRIVATE PHYSICIAN SERVICES. UNCOMPROMISING CARE." → sentence/title case | Open |
| 1.2 | "Why DG Clinic" → **"Why DG Clinic?"** | Add question mark | Open |
| 1.3 | Highlight **"Privacy"** in the trust block | Emphasis treatment, same as existing `.em-teal` | Open |
| 1.4 | Highlight **"Doctor-led"** on the homepage | Nicole's strongest point: it's the core differentiator vs nurse-led competitors, and skimmers miss it | Open |
| 1.5 | Footer bottom text "a bit weird" on **mobile** | Fine on laptop — mobile wrapping issue only | Open |
| 1.6 | Indonesian language version? | Raised as a question, not a request | **Decision needed** |
| 1.7 | Customer reviews section | See compliance note below | **Blocked — see §Reviews** |

### Design & styling

| # | Item | Detail | Status |
|---|---|---|---|
| 2.1 | **Footer logo has no contrast** on the dark background | Needs a white/reversed version of `Logo.svg`. Highest-priority visual fix — the logo is currently near-invisible | Open |
| 2.2 | "Doctor Dispatch" button text colour | Try white or beige to match the header background | Open |
| 2.3 | Category badge colours look identical | Regenerative vs Metabolic badges read as the same colour. Confirm whether `badge-gold` / `badge-signature` are intentionally close | Open |
| 2.4 | Introduce **mint** accents on the homepage | Palette is currently navy/gold-dominant. `--color-teal: #4fbdae` already exists and is unused in the dark theme | Open |
| 2.5 | "licensed doctor" emphasis → try mint | Currently `.em-teal`; Nicole wants to see a mint variant | Open |
| 2.6 | WhatsApp CTA button icon is small on **mobile** | Both homepage and About Founder page | Open |

### Navigation / UX

| # | Item | Detail | Status |
|---|---|---|---|
| 3.1 | **Confused about which page she was on** | Thought she was on a "Doctor Dispatch" page, not Home. Suggests an explicit **Home** nav item; logo-as-home wasn't obvious | Open |
| 3.2 | Mobile navigation needs rethinking | Raised generally, not specced | Open |

### Positive — preserve these

- Overall design "sleek and clean, not overwhelming."
- **Hover/unblur reveal on the four service cards** — explicitly praised. Do not
  replace this with a flat grid.
- Colours read as "luxurious."
- Footer map embed.
- "Home" link present in the footer Explore column.
- **About Founder page** — called out as the strongest page: personality, builds
  trust, humanises the clinic.

---

## Round 2 — 11 Aug 2026 · dr. Denish, Olivia Belinda, Nicole (+ Tommy)

Source: same WhatsApp thread, later session. **This round supersedes Round 1
where they conflict.** Tommy's direction: items below marked APPROVED are to be
built; the rest join the pending list.

### APPROVED — build these

| # | Item | Detail |
|---|---|---|
| A1 | **Reviews via the blog CMS** | Reuse the existing `posts` infrastructure in `/dgc-master` so reviews are editable without code. See §Reviews for the content constraints — the *mechanism* is approved, the *wording rules* still apply |
| A2 | **Indonesian version** | Language switcher **top right**. Translate with the `humanizer` + `product-marketing` skills, not raw machine translation. Copy to be checked later — ship the switcher and structure first |
| A3 | **Add "Home" to the nav** | Agreed by Nicole and Olivia. Resolves the Round 1 confusion (3.1) |
| A4 | **Add "Lab Partners" to the nav** | New section. Partners: **Prodia, Biotest, Biomedika** |
| A5 | **Fix the Tangerang bubbles** | Service-area boxes repeat Tangerang across two cards. Collapse to **3 boxes**: 1) Jakarta (all areas) 2) Tangerang — Tangerang, Tangerang Selatan, Alam Sutera, BSD City, Serpong, Gading Serpong 3) Surrounding areas — selected areas across Greater Jakarta |
| A6 | **Make the IV menu more compact** | Show the full menu rather than click-through per tier, so prices compare directly. Detailed spec to follow from Tommy — **do not invent the layout** |

### PENDING — logged, not yet approved

| # | Raised by | Item |
|---|---|---|
| P1 | dr. Denish | Replace AI imagery with **real Instagram photos** — "the AI one is too unrealistic". Applies to the IG grid *and* the hero background (Olivia agreed) |
| P2 | dr. Denish | **20 real customer reviews** available. Plan: pick per category, send them questions. Questions to be drafted — general + per-category |
| P3 | dr. Denish | `/our-story` summary is incomplete — should read **dr. Denish Gunawan, MPH**, continuing a master's in Public Health at **Brown University** |
| P4 | dr. Denish | Metabolic Wellness sub-categories: Weight loss (tirze, reta, tesa, motsc) · Performance enhancement (nicotinamide adenosine dinucleotide — **prefers unabbreviated for safety**, motsc, cjc-ipamorelin, bpc-157, tb-500, ghk-cu) · Sleep & cognitive (selank). ⚠️ **Peptide names are BPOM-blocked** — see §Compliance conflict |
| P5 | dr. Denish | "Natural Tersembunyi Skin Lift" — unclear name, queried. Add **slimming mesotherapy** to Aesthetics, linking through to the weight-loss program |
| P6 | dr. Denish | **Vaccinations** missing as a category. Audit for other missing services |
| P7 | dr. Denish | Mindfulness consultation → redirect to **mindfulnish** |
| P8 | dr. Denish | **Change the site phone number to `0811 969 966`** — the current number moves to pharmacy |
| P9 | dr. Denish | Future: drug requests linked to dg medika pharmacy — non-prescription and prescribed |
| P10 | dr. Denish | Privacy policy edits: add **voice recording** and **procedure pictures by request**; "Health information you volunteer" reads oddly → use **medical history** |
| P11 | Olivia | Rephrase the header CTA to match the hero — **"Dispatch a Doctor"** in both places |
| P12 | Olivia | **"Infusion" vs "Injection" pricing may mislead.** Suggest **"IV Therapy"** as the broader term, or align the prices. Terminology decision needed |
| P13 | Olivia | Add an **FAQ** section |
| P14 | dr. Denish | Get comments from 3 more people — international, recurring patient, occasional patient |

### ⚠️ Compliance conflict — P4 peptide names

`HANDOFF-rebrand.md` §0.2 rule 3 bans peptide names pending BPOM clearance.
P4 lists tirzepatide, retatrutide, semaglutide-class compounds, CJC-1295,
ipamorelin, BPC-157, TB-500, GHK-Cu and selank as public category copy.

These are directly contradictory. **Do not publish peptide names until Tommy
confirms BPOM status in writing.** dr. Denish's own instinct — write compounds
unabbreviated "if it's safer" — suggests he is already uneasy here.

Note also that several of these are **not BPOM-registered for the indications
implied**, and publishing them as an advertised menu is a materially higher
exposure than the naming question alone. This needs a regulatory answer, not a
design decision.

---

## §Reviews — customer testimonials (mechanism approved, wording still constrained)

**Build mechanism (approved):** reuse the blog/`posts` CMS in `/dgc-master` so
reviews are editable without a deploy. Reviews are content, not code.

**Content constraint (unchanged, still applies).** The blocker was never
authenticity — dr. Denish has 20 real customers willing to give reviews, and
that's genuinely better than most sites have. The constraint is regulatory:
Indonesian medical advertising rules (Permenkes / IDI ethics) restrict patient
testimonials about medical treatment, and this site bans outcome claims
(`HANDOFF-rebrand.md` §0.2). **A real testimonial saying a treatment worked is
still an outcome claim.**

So the reviews must be **service-experience testimonials**: punctuality,
discretion, the doctor's manner, ease of booking, the comfort of being treated
at home. No results, no symptoms, no conditions, no named treatments.

This shapes P2 — the questions sent to those 20 customers. **Ask about the
experience, not the outcome**, or the answers come back unusable.

Safe question examples:
- How did the booking process compare to visiting a clinic?
- How did you find the doctor's manner during the visit?
- What did having care at home mean for your schedule or privacy?
- Would you describe the visit as punctual and professional?

Avoid: "Did the treatment work?", "How do you feel now?", "What results did you
see?", "Which treatment did you have?"

Also required: written consent from any named patient; initials or first name
only is safer; no patient photographs (none exist).

---

## Open decisions for Tommy

1. **P4 peptide names vs the BPOM ban** — hard blocker, regulatory answer
   needed. Highest-stakes item in the log.
2. **P12 "Infusion" vs "IV Therapy"** — terminology affects pricing honesty,
   not just wording. Olivia's concern about injection prices under an
   "infusion" label is a fair one.
3. **P8 phone number change to `0811 969 966`** — appears in `lib/site.ts`,
   every WhatsApp deep link, and JSON-LD `telephone`. Confirm before switching;
   it's a single constant but it touches every CTA on the site.
4. **P1 replacing AI imagery with real Instagram photos** — dr. Denish and
   Olivia both want this, including the hero. Depends on real photos existing
   at usable resolution.
5. **A6 IV menu layout** — Tommy to supply the spec.
6. Category badge colours — intentional or a bug (2.3).
7. Carried over from `HANDOFF-rebrand.md` §6:
   - "Indonesia's leading" — unsubstantiated superiority claim, still live.
   - `/hnw-concierge` — "Coming Soon" page still in the primary nav.
   - Hero subhead renders wrapped in literal quote marks (CMS content issue).
