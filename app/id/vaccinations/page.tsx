import type { Metadata } from "next";
import PricedCatalog from "@/components/PricedCatalog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { VACCINE_GROUPS, VACCINES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Vaksinasi — Vaksin Dewasa & Perjalanan di Jakarta",
  description:
    "Menu vaksin Denish Gunawan Clinic — cacar air, HPV, meningokokus, RSV, vaksin perjalanan, dan lainnya, diberikan di rumah oleh dokter berlisensi di Jakarta.",
};

export default function VaccinationsPageId() {
  return (
    <>
      <section className="hero container dk-page-hero">
        <span className="eyebrow">Vaksinasi · Homecare Jakarta</span>
        <h1>
          Vaksinasi, <span className="em-teal">Diantar ke Rumah Anda</span>
        </h1>
        <p className="lede">
          Menu vaksin lengkap yang diberikan di rumah oleh dokter berlisensi —
          tanpa perlu ke klinik.
        </p>
      </section>

      <section className="section-tight container">
        <PricedCatalog
          tiers={VACCINE_GROUPS}
          products={VACCINES}
          locale="id"
          ariaLabel="Indeks vaksin"
          ctaLabel="Tanya via WhatsApp"
          messageStyle="ask"
        />
        <p className="price-note">
          Harga yang tertera adalah untuk pemberian di klinik. Biaya
          konsultasi dan kunjungan homecare dihitung terpisah — hubungi kami
          di WhatsApp untuk harga akhir. Hanya diberikan oleh tenaga medis
          berlisensi.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Belum Yakin Vaksin Mana yang Anda Perlukan?</h2>
          <p>
            Ceritakan usia, rencana perjalanan, atau riwayat medis Anda —
            dokter kami akan merekomendasikan yang sesuai untuk Anda.
          </p>
          <WhatsAppButton
            label="Tanya tentang vaksin — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
