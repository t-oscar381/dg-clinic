export type Locale = "en" | "id";

/*
 * A2 — Indonesian version (docs/FEEDBACK-LOG.md). Deliberately NOT a
 * [locale] dynamic-segment rewrite of the whole app — that would touch
 * every existing route and risk breaking live URLs. Instead /id/* is a
 * parallel route tree for the pages that have a translation, sharing
 * components with the English originals. Untranslated routes (/blog,
 * /privacy, /dgc-master) simply have no /id counterpart.
 */
export function localeFromPathname(pathname: string | null | undefined): Locale {
  return pathname?.startsWith("/id") ? "id" : "en";
}

// Every English path that has a published Indonesian counterpart.
// Keep in sync with the routes actually created under app/id/.
const TRANSLATED_PATHS = [
  "/",
  "/infusion-therapy",
  "/regenerative-therapy",
  "/metabolic-wellness",
  "/aesthetics-hair-growth",
  "/our-story",
  "/service-area",
  "/hnw-concierge",
  "/lab-partners",
  "/reviews",
] as const;

/** English path -> its /id equivalent, for the language switcher. */
export function toIndonesianPath(englishPath: string): string {
  const path = englishPath === "/" ? "/" : englishPath;
  if (!TRANSLATED_PATHS.includes(path as (typeof TRANSLATED_PATHS)[number])) {
    return "/id";
  }
  return path === "/" ? "/id" : `/id${path}`;
}

/** /id path -> its English equivalent, for the language switcher. */
export function toEnglishPath(indonesianPath: string): string {
  if (indonesianPath === "/id") return "/";
  return indonesianPath.replace(/^\/id/, "") || "/";
}

// Indonesian labels for NAV_CATEGORIES (lib/site.ts), keyed by href so
// the English array stays the single source of truth for hrefs/order.
export const NAV_CATEGORY_LABELS_ID: Record<string, string> = {
  "/infusion-therapy": "Terapi Infus",
  "/regenerative-therapy": "Terapi Regeneratif",
  "/metabolic-wellness": "Kesehatan Metabolik",
  "/aesthetics-hair-growth": "Estetika & Pertumbuhan Rambut",
};

// Shared chrome strings (header, footer, common CTAs) — the smallest
// dictionary needed so SiteHeader/SiteFooter can render either
// language without every page having to pass every label down.
export const UI_STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    home: "Home",
    aboutFounder: "About Founder",
    services: "Services",
    labPartners: "Lab Partners",
    hnwConcierge: "HNW Concierge",
    requestConsultation: "Request Consultation",
    doctorDispatch: "Doctor Dispatch",
    explore: "Explore",
    findUs: "Find Us",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    sisterCompany: "Our sister company:",
    pricingNote: "Full pricing and quotes are shared via WhatsApp.",
    allRightsReserved: "All rights reserved.",
  },
  id: {
    home: "Beranda",
    aboutFounder: "Tentang Pendiri",
    services: "Layanan",
    labPartners: "Mitra Laboratorium",
    hnwConcierge: "Layanan HNW Concierge",
    requestConsultation: "Ajukan Konsultasi",
    doctorDispatch: "Kirim Dokter",
    explore: "Jelajahi",
    findUs: "Lokasi Kami",
    contact: "Kontak",
    privacyPolicy: "Kebijakan Privasi",
    sisterCompany: "Perusahaan afiliasi kami:",
    pricingNote: "Harga lengkap dan penawaran dibagikan melalui WhatsApp.",
    allRightsReserved: "Hak cipta dilindungi.",
  },
};
