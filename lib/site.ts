export const SITE_NAME = "Denish Gunawan Clinic";
export const SHORT_NAME = "DG Clinic";
export const LEGAL_NAME = "Denish Gunawan Clinic";
export const LOGO_SRC = "/logo/Logo.svg";
export const TAGLINE = "Hospital-Level Excellence. Boutique-Level Care.";

// Set NEXT_PUBLIC_SITE_URL in Vercel once the production domain is known.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgclinic.example.com";

export const WHATSAPP_DISPLAY = "+62 811-9698-66";
export const WHATSAPP_URL =
  "https://wa.me/62811969866?text=" +
  encodeURIComponent(
    "Hello DG Clinic — I would like to ask about your treatments."
  );

export const INSTAGRAM_HANDLE = "@dg.clinic.hnw";
export const INSTAGRAM_URL = "https://www.instagram.com/dg.clinic.hnw";

export const NAV_ITEMS = [
  { href: "/infusion-therapy", label: "Infusion Therapy" },
  { href: "/stem-cell-weight-loss", label: "Stem Cell & Weight Loss" },
  { href: "/our-story", label: "Our Story" },
  { href: "/service-area", label: "Service Area & Contact" },
] as const;

export const SERVICE_REGIONS = [
  {
    name: "Jakarta (all areas)",
    areas: ["Jakarta Barat", "Jakarta Selatan", "Jakarta Pusat", "Jakarta Utara"],
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
