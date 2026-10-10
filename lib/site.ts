export const SITE_NAME = "Denish Gunawan Clinic";
export const SHORT_NAME = "DG Clinic";
export const LEGAL_NAME = "Denish Gunawan Clinic";
export const LOGO_SRC = "/logo/Logo.svg";
export const TAGLINE = "Hospital-Level Excellence. Boutique-Level Care.";

// DOKDEN is a website/wordmark name only — not a legal or entity rename.
// SITE_NAME / LEGAL_NAME above stay unchanged; this is additive. See
// docs/HANDOFF-rebrand.md §0.1 before touching any naming constant.
export const WORDMARK = "DOKDEN";

// Set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is known.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgclinic.example.com";

// Distinct from the freeform blog `category` field — see
// docs/FEEDBACK-LOG.md A1 / §Reviews. Posts with this exact category are
// excluded from /blog and shown on /reviews instead. Lives here (not
// lib/cms.ts) so the "use client" admin form can import it without
// pulling in server-only Supabase client code.
export const REVIEW_CATEGORY = "review";

export const WHATSAPP_DISPLAY = "+62 811-9698-66";

// Deep link with a prefilled message so the WhatsApp conversation
// starts already qualified (per-treatment "checkout" path).
export const waLink = (message: string) =>
  "https://wa.me/62811969866?text=" + encodeURIComponent(message);

export const WHATSAPP_URL = waLink(
  "Hello Denish Gunawan Clinic — I would like to ask about your treatments."
);

export const INSTAGRAM_HANDLE = "@dg.clinic.hnw";
export const INSTAGRAM_URL = "https://www.instagram.com/dg.clinic.hnw";

// Contact address for privacy/data requests.
export const CONTACT_EMAIL = "dg.clinic.healthandwellness@gmail.com";

// Effective date shown on the Privacy Policy. Update when the policy changes.
export const PRIVACY_LAST_UPDATED = "10 October 2026";

// Clinic location shown on the map (keyless Google Maps embed).
export const CLINIC_AREA = "Duri Selatan, West Jakarta";
export const CLINIC_ADDRESS =
  "Jl. Duri Selatan II No.14AA, Tambora, West Jakarta";
export const clinicMapEmbedUrl = () =>
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.70274199999!2d106.8015!3d-6.1584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f67a216f9fbf%3A0xe7c569f4ebffc08!2sJl.%20Duri%20Selatan%20II%20No.14%2C%20RT.14%2FRW.2%2C%20Duri%20Sel.%2C%20Kec.%20Tambora%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011270!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

export const NAV_CATEGORIES = [
  { href: "/infusion-therapy", label: "Infusion Therapy" },
  { href: "/regenerative-therapy", label: "Regenerative Therapy" },
  { href: "/metabolic-wellness", label: "Metabolic Wellness" },
  { href: "/aesthetics-hair-growth", label: "Aesthetics & Hair Growth" },
  { href: "/vaccinations", label: "Vaccinations" },
  { href: "/home-nursing-care", label: "Home Nursing Care" },
] as const;

// Header nav (DOKDEN rebrand, HANDOFF-rebrand.md §2). Hrefs are unchanged
// from the previous site — only labels moved — so no redirects are needed.
// "About Founder" is a deliberate exception to the dr./Dr. naming rule
// below — see docs/FEEDBACK-LOG.md "Standing naming rules". The route
// itself (/our-story) is unaffected.
export const NAV_SECONDARY = [
  { href: "/our-story", label: "About Founder" },
  { href: "/lab-partners", label: "Lab Partners" },
  { href: "/service-area", label: "Request Consultation" },
] as const;

// Blog moved out of the header into the footer only (§2); the route and
// posts are untouched.
export const NAV_FOOTER_ONLY = [{ href: "/blog", label: "Blog" }] as const;

export const NAV_ITEMS = [
  ...NAV_CATEGORIES,
  ...NAV_SECONDARY,
  ...NAV_FOOTER_ONLY,
] as const;

// 3 boxes, no repeated cities across cards — see docs/FEEDBACK-LOG.md A5.
export const SERVICE_REGIONS = [
  {
    name: "Jakarta (all areas)",
    areas: [
      "Jakarta Barat",
      "Jakarta Pusat",
      "Jakarta Selatan",
      "Jakarta Timur",
      "Jakarta Utara",
    ],
  },
  {
    name: "Tangerang",
    areas: [
      "Tangerang",
      "Tangerang Selatan",
      "Alam Sutera",
      "BSD City",
      "Serpong",
      "Gading Serpong",
    ],
  },
  {
    name: "Surrounding Areas",
    areas: ["Selected areas across Greater Jakarta"],
  },
] as const;
