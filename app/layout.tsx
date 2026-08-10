import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import {
  INSTAGRAM_URL,
  LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Heading serif; the licensed brand fonts take over via the CSS font
// stack once self-hosted.
const serifStandin = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-standin",
});

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Display title only — SITE_NAME/LEGAL_NAME below are unchanged.
  title: "DOKDEN — Private Physician Services | Denish Gunawan Clinic",
  description:
    "DG Clinic brings doctor-led home-care to Jakarta — infusion, regenerative therapy, metabolic wellness, and aesthetics, delivered privately to your door. Trusted since 2021.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  alternateName: ["DOKDEN", "DG Clinic"],
  legalName: LEGAL_NAME,
  url: SITE_URL,
  slogan: "Hospital-Level Excellence. Boutique-Level Care.",
  description:
    "Doctor-led home-care wellness clinic serving Greater Jakarta: infusion therapy, regenerative therapy, metabolic wellness, and aesthetics & hair growth, delivered privately at home.",
  logo: `${SITE_URL}/logo/Logo.svg`,
  image: `${SITE_URL}/images/founder.avif`,
  foundingDate: "2021",
  founder: {
    "@type": "Person",
    name: "dr. Denish Gunawan, MPH",
  },
  telephone: "+62811969866",
  sameAs: [INSTAGRAM_URL],
  areaServed: [
    "Jakarta Barat",
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Utara",
    "BSD City",
    "Serpong",
    "Gading Serpong",
    "Tangerang Selatan",
    "Alam Sutera",
    "Tangerang",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${serifStandin.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
