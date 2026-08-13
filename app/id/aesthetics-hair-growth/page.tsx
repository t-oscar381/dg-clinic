import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Perawatan Estetika & Pertumbuhan Rambut di Rumah — Denish Gunawan Clinic Jakarta",
  description:
    "Perawatan estetika klinis dan pertumbuhan rambut dari Denish Gunawan Clinic — skin booster, signature lifting, dan restorasi rambut, dilayani secara pribadi di Jakarta.",
};

const treatments: Treatment[] = [
  {
    id: "skin-booster-exosome",
    tab: "Skin Booster + Exosome",
    badge: "Skin Booster + Exosome",
    badgeClass: "badge-essential",
    name: "Hidrasi Bertemu Peremajaan",
    copy: "Perawatan kulit regeneratif yang menggabungkan hidrasi mendalam dengan dukungan peremajaan berbasis sel.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang perawatan Skin Booster + Exosome.",
  },
  {
    id: "hyperpigmentation",
    tab: "Hiperpigmentasi",
    badge: "Hiperpigmentasi",
    badgeClass: "badge-basic",
    name: "Perawatan Hiperpigmentasi",
    copy: "Perawatan klinis terarah untuk warna kulit tidak merata dan flek hitam.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Perawatan Hiperpigmentasi.",
  },
  {
    id: "hair-growth",
    tab: "Program Pertumbuhan Rambut",
    badge: "Pertumbuhan Rambut",
    badgeClass: "badge-sickness",
    name: "Program Pertumbuhan Rambut",
    copy: "Program rancangan dokter yang menggabungkan mesoterapi, dukungan oral, dan perawatan topikal untuk rambut yang lebih lebat dan sehat.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Program Pertumbuhan Rambut.",
  },
];

export default function AestheticsHairGrowthPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-aesthetics.webp)" }}
      >
        <span className="eyebrow">
          Estetika &amp; Pertumbuhan Rambut · Homecare Jakarta
        </span>
        <h1>
          Estetika Klinis, dengan{" "}
          <span className="em-teal">Privasi Penuh</span>
        </h1>
        <p className="lede">
          Perawatan estetika dengan presisi medis — ditangani dokter
          berlisensi dalam kenyamanan dan kerahasiaan rumah Anda.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={treatments}
          ariaLabel="Perawatan estetika dan pertumbuhan rambut"
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Harga dibagikan secara pribadi — hubungi kami di WhatsApp dan kami
          akan menjelaskannya.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Belum Tahu Harus Mulai dari Mana?</h2>
          <p>
            Ceritakan target kulit atau rambut Anda — tim kami akan
            merekomendasikan perawatan yang sesuai.
          </p>
          <WhatsAppButton
            label="Tanyakan perawatan yang cocok — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
