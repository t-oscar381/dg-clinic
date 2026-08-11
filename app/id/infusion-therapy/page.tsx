import type { Metadata } from "next";
import PricedCatalog from "@/components/PricedCatalog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { INFUSION_PRODUCTS, INFUSION_TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Terapi Infus — IV Vitamin & Kesehatan di Jakarta",
  description:
    "Terapi infus homecare DG Clinic — dari dukungan energi harian hingga infus pemulihan terarah — dilayani secara pribadi di Jakarta oleh dokter berlisensi.",
};

export default function InfusionTherapyPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-infusion.webp)" }}
      >
        <span className="eyebrow">Terapi Infus · Homecare Jakarta</span>
        <h1>
          Terapi Infus, Disesuaikan dengan{" "}
          <span className="em-teal">Hari Anda</span>
        </h1>
        <p className="lede">
          Dari energi harian hingga pemulihan terarah, tingkatan infus kami
          dirancang sesuai gaya hidup Anda — diberikan di rumah, oleh dokter
          berlisensi.
        </p>
      </section>

      <section className="section-tight container">
        <PricedCatalog
          tiers={INFUSION_TIERS}
          products={INFUSION_PRODUCTS}
          locale="id"
          ariaLabel="Tingkatan terapi infus"
          ctaLabel="Pesan via WhatsApp"
          messageStyle="book"
        />
        <p className="price-note">
          Harga yang tertera adalah per sesi. Kunjungan homecare dihitung
          terpisah sesuai lokasi Anda — hubungi kami di WhatsApp untuk
          konfirmasi harga akhir.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Belum Yakin Tingkatan Mana yang Cocok?</h2>
          <p>
            Ceritakan kondisi Anda dan aktivitas minggu ini — tim kami akan
            merekomendasikan infus yang tepat untuk Anda.
          </p>
          <WhatsAppButton
            label="Tanyakan tingkatan yang cocok — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
