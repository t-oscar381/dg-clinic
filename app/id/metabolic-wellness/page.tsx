import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Kesehatan Metabolik — Program Penurunan Berat Badan Medis di Jakarta",
  description:
    "Dukungan penurunan berat badan dan performa yang dipandu dokter dari DG Clinic — program suntik dan oral, dilayani secara pribadi di rumah di Jakarta.",
};

const programs: Treatment[] = [
  {
    id: "weight-loss",
    tab: "Program Penurunan Berat Badan",
    badge: "Program Penurunan Berat Badan",
    badgeClass: "badge-signature",
    name: "Manajemen Berat Badan Diawasi Dokter",
    copy: "Manajemen berat badan yang diawasi dokter, menggabungkan obat suntik dan oral dengan panduan gaya hidup — dirancang sebagai program berkelanjutan, bukan perawatan sekali jalan.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo DG Clinic — saya ingin bertanya tentang Program Penurunan Berat Badan.",
  },
  {
    id: "sleep-focus",
    tab: "Penunjang Tidur & Fokus",
    badge: "Penunjang Tidur & Fokus",
    badgeClass: "badge-essential",
    name: "Istirahat, Ketajaman Pikiran & Performa",
    copy: "Dukungan terarah untuk istirahat, ketajaman pikiran, dan performa harian.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo DG Clinic — saya ingin bertanya tentang Penunjang Tidur & Fokus.",
  },
];

export default function MetabolicWellnessPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-metabolic.webp)" }}
      >
        <span className="eyebrow">Kesehatan Metabolik · Homecare Jakarta</span>
        <h1>
          Kesehatan Metabolik,{" "}
          <span className="em-teal">Dikelola oleh Dokter</span>
        </h1>
        <p className="lede">
          Hasil yang berkelanjutan datang dari panduan medis, bukan
          tebak-tebakan. Program metabolik DG Clinic dirancang, diawasi, dan
          disesuaikan oleh dokter berlisensi — secara pribadi, di rumah Anda.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={programs}
          ariaLabel="Program kesehatan metabolik"
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Formulasi dan protokol spesifik dibahas langsung dengan tim kami
          melalui WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Program yang Dirancang Khusus untuk Anda</h2>
          <p>
            Ceritakan target dan rutinitas Anda — dokter kami akan merancang
            program yang sesuai, dan menyesuaikannya seiring waktu.
          </p>
          <WhatsAppButton
            label="Tanyakan program yang cocok untuk Anda — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
