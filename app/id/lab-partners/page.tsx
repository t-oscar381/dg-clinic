import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitra Laboratorium — DG Clinic, Jakarta",
  description:
    "Laboratorium diagnostik terakreditasi yang bekerja sama dengan DG Clinic untuk pemeriksaan homecare di Jakarta: Prodia, Biotest, dan Biomedika.",
};

const PARTNERS = [
  {
    name: "Prodia",
    blurb:
      "Salah satu jaringan laboratorium klinik terbesar dan terlama di Indonesia.",
  },
  {
    name: "Biotest",
    blurb: "Mitra laboratorium diagnostik yang mendukung kunjungan homecare kami.",
  },
  {
    name: "Biomedika",
    blurb: "Mitra laboratorium diagnostik yang mendukung kunjungan homecare kami.",
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
            <div className="region-card" key={partner.name}>
              <h3>{partner.name}</h3>
              <p>{partner.blurb}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
