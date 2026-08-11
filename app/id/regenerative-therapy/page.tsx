import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Terapi Regeneratif di Jakarta — Secretome, Exosome & Perawatan Selular",
  description:
    "Terapi regeneratif lanjutan dari DG Clinic — perawatan secretome, exosome, dan selular, dilayani secara pribadi di rumah oleh dokter berlisensi di Jakarta.",
};

// "Stem Cell & NK Cell" is frozen wording (docs/HANDOFF-rebrand.md §0.3) —
// it must not be translated or otherwise re-introduced in new copy. Per
// the doc's own guidance for this exact situation, this modality is
// labelled "Terapi Regeneratif Lanjutan" instead.
// TODO(compliance): if "Stem Cell & NK Cell" is cleared, decide whether
// the Indonesian page should then use the same frozen English phrase
// (matching the EN page exactly) or a reviewed Indonesian equivalent.
const modalities: Treatment[] = [
  {
    id: "secretome-exosome",
    tab: "Secretome & Exosome",
    badge: "Terapi Secretome & Exosome",
    badgeClass: "badge-gold",
    name: "Pemulihan Berbasis Sel",
    copy: "Perawatan regeneratif berbasis sel yang dirancang untuk mendukung proses perbaikan dan pemulihan alami tubuh Anda.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo DG Clinic — saya ingin bertanya tentang Terapi Secretome & Exosome.",
  },
  {
    id: "advanced-regenerative",
    tab: "Regeneratif Lanjutan",
    badge: "Terapi Regeneratif Lanjutan",
    badgeClass: "badge-gold",
    name: "Pemulihan & Ketahanan Selular",
    copy: "Terapi selular lanjutan yang mendukung pemulihan, ketahanan tubuh, dan vitalitas imun — dilakukan di bawah pengawasan medis penuh.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo DG Clinic — saya ingin bertanya tentang Terapi Regeneratif Lanjutan.",
  },
];

export default function RegenerativeTherapyPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{
          backgroundImage: "url(/images/heroes/hero-regenerative.webp)",
        }}
      >
        <span className="eyebrow eyebrow-gold">
          Terapi Regeneratif · Homecare Jakarta
        </span>
        <h1>
          Terapi Regeneratif untuk{" "}
          <span className="em-gold">Vitalitas Jangka Panjang</span>
        </h1>
        <p className="lede">
          Generasi kesehatan berikutnya bekerja di tingkat selular. DG Clinic
          menghadirkan terapi regeneratif lanjutan ke rumah Anda — ditangani
          dokter, bersifat pribadi, dan disesuaikan untuk Anda.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={modalities}
          ariaLabel="Modalitas terapi regeneratif"
          goldAccent
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Formulasi dan protokol spesifik dibahas langsung dengan tim kami
          melalui WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Setiap Program Dimulai dari Percakapan</h2>
          <p>
            Setiap program regeneratif dimulai dari percakapan. Dokter kami
            merancang setiap protokol khusus untuk Anda.
          </p>
          <WhatsAppButton
            label="Mulai percakapan di WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
