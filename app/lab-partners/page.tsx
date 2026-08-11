import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lab Partners — Denish Gunawan Clinic, Jakarta",
  description:
    "The accredited diagnostic laboratories Denish Gunawan Clinic works with for homecare testing across Jakarta: Prodia, Biotest, and Biomedika.",
};

// Logos are temporary — sourced from each partner's public site for now;
// HD versions to follow from sales (docs/FEEDBACK-LOG.md Round 3).
const PARTNERS = [
  {
    name: "Prodia",
    blurb:
      "One of Indonesia's largest and longest-running clinical laboratory networks.",
    logo: "/images/partners/prodia.png",
    logoWidth: 500,
    logoHeight: 163,
    url: "https://www.prodia.co.id",
  },
  {
    name: "Biotest",
    blurb: "Diagnostic laboratory partner supporting our homecare visits.",
    logo: "/images/partners/biotest.jpg",
    logoWidth: 694,
    logoHeight: 400,
    url: "https://biotest.co.id",
  },
  {
    name: "Biomedika",
    blurb: "Diagnostic laboratory partner supporting our homecare visits.",
    logo: "/images/partners/biomedika.png",
    logoWidth: 512,
    logoHeight: 75,
    url: "https://biomedika.co.id",
  },
] as const;

export default function LabPartnersPage() {
  return (
    <>
      <section className="hero container center dk-page-hero">
        <span className="eyebrow">Lab Partners</span>
        <h1>Diagnostic Labs We Work With</h1>
        <p className="lede">
          For homecare visits that require lab work, we coordinate sample
          collection and testing through accredited diagnostic partners.
        </p>
      </section>

      <section className="section-tight container">
        <div className="grid-3">
          {PARTNERS.map((partner) => (
            <a
              className="region-card partner-card"
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} — visit official website`}
            >
              <span className="partner-card__logo">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                />
              </span>
              <h3>{partner.name}</h3>
              <p>{partner.blurb}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
