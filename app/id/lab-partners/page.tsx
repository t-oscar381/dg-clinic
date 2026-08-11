import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mitra Laboratorium — Denish Gunawan Clinic, Jakarta",
  description:
    "Laboratorium diagnostik terakreditasi yang bekerja sama dengan Denish Gunawan Clinic untuk pemeriksaan homecare di Jakarta: Prodia, Biotest, dan Biomedika.",
};

const PARTNERS = [
  {
    name: "Prodia",
    blurb:
      "Salah satu jaringan laboratorium klinik terbesar dan terlama di Indonesia.",
    logo: "/images/partners/prodia.png",
    logoWidth: 500,
    logoHeight: 163,
    url: "https://www.prodia.co.id",
  },
  {
    name: "Biotest",
    blurb: "Mitra laboratorium diagnostik yang mendukung kunjungan homecare kami.",
    logo: "/images/partners/biotest.jpg",
    logoWidth: 694,
    logoHeight: 400,
    url: "https://biotest.co.id",
  },
  {
    name: "Biomedika",
    blurb: "Mitra laboratorium diagnostik yang mendukung kunjungan homecare kami.",
    logo: "/images/partners/biomedika.png",
    logoWidth: 512,
    logoHeight: 75,
    url: "https://biomedika.co.id",
  },
] as const;

export default function LabPartnersPageId() {
  return (
    <>
      <section className="hero container center dk-page-hero">
        <span className="eyebrow">Mitra Laboratorium</span>
        <h1>Laboratorium Diagnostik yang Kami Ajak Bekerja Sama</h1>
        <p className="lede">
          Untuk kunjungan homecare yang memerlukan pemeriksaan laboratorium,
          kami mengoordinasikan pengambilan sampel dan pengujian melalui
          mitra diagnostik terakreditasi.
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
              aria-label={`${partner.name} — kunjungi situs resmi`}
            >
              <span className="partner-card__logo">
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
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
