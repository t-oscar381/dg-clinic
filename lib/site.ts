export const SITE_NAME = "Denish Gunawan Clinic";
export const SHORT_NAME = "DG Clinic";
export const LEGAL_NAME = "Denish Gunawan Clinic";
export const LOGO_SRC = "/logo/Logo.svg";
export const TAGLINE = "Hospital-Level Excellence. Boutique-Level Care.";

// Set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is known.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgclinic.example.com";

export const WHATSAPP_DISPLAY = "+62 811-9698-66";

// Deep link with a prefilled message so the WhatsApp conversation
// starts already qualified (per-treatment "checkout" path).
export const waLink = (message: string) =>
  "https://wa.me/62811969866?text=" + encodeURIComponent(message);

export const WHATSAPP_URL = waLink(
  "Hello DG Clinic — I would like to ask about your treatments."
);

export const INSTAGRAM_HANDLE = "@dg.clinic.hnw";
export const INSTAGRAM_URL = "https://www.instagram.com/dg.clinic.hnw";

// Clinic location shown on the map. CLINIC_MAP_QUERY is a placeholder
// area query — replace with the exact street address or coordinates
// once confirmed. Uses the keyless Google Maps embed (no API key).
export const CLINIC_AREA = "Duri Selatan, West Jakarta";
export const CLINIC_MAP_QUERY = "Duri Selatan, Tambora, Jakarta Barat";
export const clinicMapEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    CLINIC_MAP_QUERY
  )}&z=15&output=embed`;

export const NAV_CATEGORIES = [
  { href: "/infusion-therapy", label: "Infusion Therapy" },
  { href: "/regenerative-therapy", label: "Regenerative Therapy" },
  { href: "/metabolic-wellness", label: "Metabolic Wellness" },
  { href: "/aesthetics-hair-growth", label: "Aesthetics & Hair Growth" },
] as const;

export const NAV_SECONDARY = [
  { href: "/our-story", label: "Our Story" },
  { href: "/service-area", label: "Service Area & Contact" },
] as const;

export const NAV_ITEMS = [...NAV_CATEGORIES, ...NAV_SECONDARY] as const;

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
    name: "BSD City & Serpong",
    areas: ["BSD City", "Serpong", "Gading Serpong", "Tangerang Selatan"],
  },
  {
    name: "Alam Sutera & Tangerang",
    areas: ["Alam Sutera", "Tangerang"],
  },
  {
    name: "Greater Jakarta",
    areas: ["Surrounding areas on request"],
  },
] as const;
