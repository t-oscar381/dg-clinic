import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Partners — DG Clinic, Jakarta",
  description:
    "The accredited diagnostic laboratories DG Clinic works with for homecare testing across Jakarta: Prodia, Biotest, and Biomedika.",
};

const PARTNERS = [
  {
    name: "Prodia",
    blurb:
      "One of Indonesia's largest and longest-running clinical laboratory networks.",
  },
  {
    name: "Biotest",
    blurb: "Diagnostic laboratory partner supporting our homecare visits.",
  },
  {
    name: "Biomedika",
    blurb: "Diagnostic laboratory partner supporting our homecare visits.",
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
