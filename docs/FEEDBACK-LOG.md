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

> **Status (11 Oct 2026):** Apotek DG Medika is live at **apotek.dokden.com**, operated by PT Lentera Harmoni Utama. `/dg-medika` on this site redirects there; the placeholder page was removed. Drug-request flow (P9) is still undecided — see the pharmacy handoff sheet.
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

## Round 3 — 13 Aug 2026 · dr. Denish + Tommy · APPROVED, build these

### B1 — Remove "Natural Tersembunyi Skin Lift"

Delete the chip from Aesthetics & Hair Growth in `components/FourPathsSplit.tsx`
and from `app/aesthetics-hair-growth/page.tsx` (tab, badge, prefilled WhatsApp
message). Name was unclear to the founder himself. Remove, don't rename.

### B2 — Lab requests go to WhatsApp, not a page

**Rationale (dr. Denish):** if the site advertises Prodia / Biotest / Biomedika
prominently, the visitor asks "why book through you instead of going direct?"
Keep partners as quiet credibility, make the *action* a conversation.

- Demote the partner names to a single small trust line. No logo wall, no
  dedicated hero treatment.
- Every lab CTA opens WhatsApp with a prefilled, parameterised message:
  `Halo DG Clinic — saya mau lab test: {test}`

**Implementation — redirect route, not a raw `wa.me` link:**

`/go/lab?t=<key>` → records the click → 302 to the `wa.me` deep link.

- Keep a **whitelist map** of `key → label` in `lib/labs.ts`. Look the label up
  from the key; never interpolate raw query text into the WhatsApp message.
  Unknown key → fall back to a generic message. This prevents message injection
  and an open-redirect.
- Works with JavaScript disabled, and the tracking can't be blocked by an
  ad-blocker the way a client-side event can.

### B3 — Click counting, deduplicated per browser

Requirement: count one click per user/browser; a later click by the same person
counts as new.

**Approach — first-party cookie + time window. Minimal logic, no new vendor.**

- On first hit to `/go/*`, set a first-party cookie `dgc_vid` = random UUID,
  `httpOnly`, `SameSite=Lax`, 1-year expiry.
- Insert into a Supabase table:

```sql
create table link_clicks (
  id         bigserial primary key,
  link_key   text not null,          -- e.g. 'lab:vitamin-d'
  visitor_id text not null,
  clicked_at timestamptz not null default now()
);
create unique index link_clicks_dedup
  on link_clicks (link_key, visitor_id, date_trunc('day', clicked_at));
```

- The unique index does the dedup **in the database** — one row per
  visitor / link / day. Re-clicking tomorrow counts as new. Insert with
  `on conflict do nothing`; the redirect fires regardless of insert result.
- Window is a single line to change if 24h turns out wrong.

This is deliberately the low-code option: one table, one index, one route.
No analytics SDK, no client JS, no consent banner implications beyond a
first-party functional cookie.

⚠️ Mention the cookie in `app/privacy/` — one sentence, it's first-party and
functional but it should be disclosed.

**Cheaper alternative if even this is too much:** Vercel Web Analytics custom
events via `track()`. ~5 lines, but no dedup, no ownership of the data, and
blocked by ad-blockers. Not recommended given the requirement is specifically
about counting unique clicks.

### B4 — Indonesian copy is too literal

dr. Denish: *"Bahasa indonesianya perlu direview karena terlalu direct
translation."* These are machine-literal renderings, not how Indonesians speak.

**Suggested revisions — for dr. Denish / Nicole to confirm, not to ship blind:**

| Current | Issue | Suggested |
|---|---|---|
| **Kirim Dokter** | "Kirim" = to ship/send an object. Reads like parcel delivery | **Panggil Dokter** — the natural phrase for calling a doctor to the house |
| **Jelajahi Perawatan** | "Jelajahi" = explore/roam. Very literal | **Lihat Layanan** |
| **BERDIRI 2021** | Literal "established". Stiff | **SEJAK 2021** |
| **10.000+ PASIEN TERLAYANI** | "Terlayani" is awkward passive | **10.000+ PASIEN DILAYANI** |
| **Layanan Dokter Pribadi. Perawatan Tanpa Kompromi.** | Direct translation of the English | dr. Denish suggested *pelayanan dengan standar terbaik*. e.g. **Dokter Pribadi ke Rumah Anda. Standar Perawatan Terbaik.** |
| **Homecare yang dipimpin dokter di seluruh Jabodetabek** | "dipimpin" = led/commanded, odd for care | **Perawatan di rumah, langsung ditangani dokter — se-Jabodetabek** |

"Jabodetabek" is correct and natural — keep it.

Use the `humanizer` and `product-marketing` skills for the remaining pages
(A2), not raw translation. **Every Bahasa string needs a native read before
launch** — this round proves the machine pass isn't sufficient.

### B5 — "Homecare untuk siapa saja" section

From the brand designer's Instagram creative. Add to the homepage (and/or a
homecare page).

**Who benefits most:**
Busy professionals · Elderly patients · Chronic illness patients ·
Post-hospitalisation patients · Children with mild illnesses

**Why homecare:**
No travelling · Holistic treatment · Personalised care · Family involvement ·
Greater privacy · Less exposure to illness

**Additional services to add as a category:**
- Pasang NGT — nasogastric tube placement
- Pasang kateter — indwelling urinary catheter placement
- Perawatan luka — wound care (diabetic, post-operative, decubitus ulcers)
- EKG — electrocardiogram
- 24-hour nurse / caregiver care

⚠️ **CONFLICT — must be resolved before this ships.** See §Doctor-only below.

---

## §Doctor-only claim vs 24-hour nurse care — BLOCKER

The site currently states, in the trust block and the stat cards:

- *"Every visit is conducted by a licensed doctor — **never a nurse-only
  visit**"*
- *"**100% DOCTOR-ONLY DISPATCH**"*
- *"Doctor-only dispatch — every treatment is administered by a hired, licensed
  physician"*

B5 adds **"24-hour nurse or caregiver care"** as a service, and NGT placement,
catheter placement and wound care are ordinarily nursing procedures.

**These cannot both be true on the same website.** "100%" and "never" are
absolute claims; publishing a nursing service directly beside them is a
factual contradiction a competitor or regulator could point at — and it
undercuts the single strongest differentiator on the site (Nicole's R1 item
1.4: highlight "Doctor-led").

Do **not** ship B5 until Tommy/dr. Denish choose:

1. **Doctor-led, nurse-supported** — soften the absolutes: *"Every treatment
   plan is set and supervised by a licensed doctor."* Keeps the differentiator,
   accommodates nursing services. *(Recommended.)*
2. **Keep the absolutes** — do not publish nurse/caregiver services on this
   site; route them elsewhere.
3. **Split the claim by service line** — doctor-only for medical treatments,
   clearly labelled nursing for the new category. Honest, but weakens the
   headline message.

### B6 — DOKDEN logo animation, Option 1 (approved)

**Collapse the wordmark to "DOK", then expand back.** "Dok" is how Indonesians
address a doctor, so the animation moves from formal name to how a patient
actually speaks. Modelled on the Anthropic wordmark→monogram collapse.

Spec:

- Letters `D O K` are fixed. `D E N` fade out while collapsing their width to
  zero, so the mark contracts leftward to `DOK`.
- Transition: opacity `.5s ease`; width/transform `.6s cubic-bezier(.6,0,.2,1)`.
- Hold roughly 2.1s at each state, loop.
- CSS transforms and opacity only — no layout thrash, no JS animation loop.
  A single class toggle on an interval is enough.
- **Must respect `prefers-reduced-motion: reduce`** — render static `DOKDEN`,
  no animation.
- Uses `--font-heading`, `--dk-bone`; sits on `--dk-slate`.

**Placement:** hero or a loading state — **not** the persistent site header.
The header already carries the real Denish Gunawan Clinic logo, and a wordmark
animating on every page view alongside a static clinical mark reads as busy.
One appearance, high impact.

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
