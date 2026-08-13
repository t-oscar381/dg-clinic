import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permintaan Lab — Denish Gunawan Clinic, Jakarta",
  description:
    "Butuh tes lab bersamaan dengan kunjungan homecare Anda? Hubungi kami di WhatsApp dan kami akan mengoordinasikan pengambilan sampel dan pengujian.",
};

// Demoted from a partner logo wall to a quiet trust line — see the EN
// page for the rationale (docs/FEEDBACK-LOG.md Round 3, B2).
export default function LabPartnersPageId() {
  return (
    <section className="hero container center">
      <span className="eyebrow">Permintaan Lab</span>
      <h1>Butuh Tes Lab Bersamaan Kunjungan Anda?</h1>
      <p className="lede">
        Untuk kunjungan homecare yang memerlukan pemeriksaan laboratorium,
        kami mengoordinasikan pengambilan sampel dan pengujian melalui mitra
        diagnostik terakreditasi — Prodia, Biotest, dan Biomedika.
      </p>
      <div className="hero-actions">
        <a
          href="/go/lab?t=general"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Minta Tes Lab via WhatsApp →
        </a>
      </div>
    </section>
  );
}
