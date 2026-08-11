import type { Metadata } from "next";
import LocationMap from "@/components/LocationMap";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SERVICE_REGIONS,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Area Layanan & Kontak — DG Clinic Homecare Jakarta",
  description:
    "DG Clinic melayani Jabodetabek dengan homecare pribadi yang dipimpin dokter. Hubungi kami di WhatsApp untuk mengatur kunjungan Anda.",
};

// SERVICE_REGIONS (lib/site.ts) stays English-source — region names
// translated here rather than duplicating the whole array, since only
// the 3 names + one chip need it (city names inside are already
// Indonesian regardless of locale).
const REGION_NAME_ID: Record<string, string> = {
  "Jakarta (all areas)": "Jakarta (semua area)",
  Tangerang: "Tangerang",
  "Surrounding Areas": "Area Sekitar",
};
const AREA_LABEL_ID: Record<string, string> = {
  "Selected areas across Greater Jakarta": "Area terpilih di sekitar Jabodetabek",
};

export default function ServiceAreaPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{
          backgroundImage: "url(/images/heroes/hero-service-area.webp)",
        }}
      >
        <span className="eyebrow">Area Layanan · Jabodetabek</span>
        <h1>
          Di Mana Pun Anda di Jakarta, <br />
          <span className="em-teal">Kami Datang</span>
        </h1>
        <p className="lede">
          DG Clinic melayani pasien di seluruh Jabodetabek, menghadirkan
          perawatan pribadi yang dipimpin dokter di setiap kunjungan.
        </p>
      </section>

      <section className="section-tight container">
        <div className="grid-2">
          {SERVICE_REGIONS.map((region) => (
            <div className="region-card" key={region.name}>
              <h3>{REGION_NAME_ID[region.name] ?? region.name}</h3>
              <div className="chip-row">
                {region.areas.map((area) => (
                  <span className="chip" key={area}>
                    {AREA_LABEL_ID[area] ?? area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <span className="eyebrow">Kontak</span>
          <h2>Mulai dengan Pesan</h2>
          <p>
            Hubungi kami di WhatsApp untuk membahas perawatan Anda — tim kami
            akan merespons langsung dan membantu Anda menemukan perawatan
            yang tepat.
          </p>
          <p>
            Saat Anda menghubungi kami, harapkan percakapan yang lugas: kami
            akan menanyakan beberapa hal tentang kebutuhan Anda, lalu
            memandu dari sana. Tanpa formulir, tanpa menunggu.
          </p>
          <p>
            <a
              href={WHATSAPP_URL}
              style={{ color: "var(--color-white)", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <br />
            <a
              href={INSTAGRAM_URL}
              style={{ color: "var(--color-white)", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram {INSTAGRAM_HANDLE}
            </a>
          </p>
          <WhatsAppButton
            label="Hubungi DG Clinic di WhatsApp →"
            variant="light"
          />
        </div>
      </section>

      <section className="section-tight container">
        <Reveal>
          <div className="center">
            <span className="eyebrow">Lokasi Kami</span>
            <h2>Lokasi Klinik</h2>
          </div>
          <LocationMap locale="id" />
        </Reveal>
      </section>
    </>
  );
}
