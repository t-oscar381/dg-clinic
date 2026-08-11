import type { Metadata } from "next";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Tentang Pendiri — DG Clinic, Jakarta",
  description:
    "Kisah berdirinya DG Clinic: komitmen di masa pandemi untuk perawatan homecare yang mudah diakses dan pribadi, didirikan oleh dr. Denish Gunawan, MPH.",
};

export default function OurStoryPageId() {
  return (
    <>
      <section
        className="hero container dk-page-hero founder-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-our-story.webp)" }}
      >
        <div className="founder-hero-copy">
          <span className="eyebrow">Tentang Pendiri</span>
          <h1>Kenali Sosok di Balik DG Clinic</h1>
          <p className="lede">
            dr. Denish Gunawan memulai perjalanan medisnya di Universitas
            Atma Jaya, meraih gelar sebagai dokter umum.
          </p>
        </div>
        <div className="founder-hero-portrait">
          <Image
            src="/images/founder.avif"
            alt="dr. Denish Gunawan, MPH — pendiri Denish Gunawan Clinic"
            className="founder-portrait-large"
            width={420}
            height={680}
            priority
          />
        </div>
      </section>

      <section className="section-tight container">
        <div className="story-block">
          <span className="eyebrow">Awal Mula</span>
          <h2>Perawatan yang Mendatangi Pasien</h2>
          <p>
            Selama pandemi COVID-19, ia menyaksikan langsung betapa
            pentingnya akses terhadap perawatan kesehatan. Ia pun mulai
            mengunjungi pasien secara langsung — merawat mereka dengan aman
            dan penuh privasi di rumah masing-masing.
          </p>
          <p>
            Dari misi itulah DG Clinic lahir: sebuah ruang yang diciptakan
            untuk menghubungkan lebih banyak dokter dengan pasien,
            menghadirkan perawatan yang terasa personal namun tetap berpijak
            pada profesionalisme medis.
          </p>
        </div>

        <div className="story-block">
          <span className="eyebrow">Perkembangan</span>
          <h2>Pikiran, Tubuh, dan Jiwa yang Selaras</h2>
          <p>
            Menyadari pentingnya merawat pikiran, tubuh, dan jiwa secara
            bersamaan, dr. Denish melanjutkan studinya dengan beasiswa di
            Brown University, Amerika Serikat, meraih gelar Master di bidang
            Kesehatan Masyarakat dengan konsentrasi Mindfulness.
          </p>
        </div>

        <div className="story-block">
          <span className="eyebrow">Hari Ini</span>
          <h2>Kembali ke Jakarta, Memimpin DG Clinic</h2>
          <p>
            Kini kembali di Jakarta, dr. Denish memimpin DG Clinic dengan
            pemahaman yang lebih mendalam, kepedulian yang lebih besar, dan
            komitmen baru terhadap komunitas yang membentuk misinya.
          </p>
        </div>
      </section>

      <section className="navy-block">
        <div className="container quote-block">
          <blockquote>
            &ldquo;Penyembuhan dimulai dari memahami bahwa penderitaan
            seseorang perlu didengarkan.&rdquo;
          </blockquote>
          <cite>— dr. Denish Gunawan, MPH</cite>
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Perawatan Anda, Sesuai Keinginan Anda</h2>
          <p>
            Setiap kunjungan DG Clinic membawa komitmen awal ini — perawatan
            pribadi yang dipimpin dokter dan selalu mendengarkan lebih dulu.
          </p>
          <WhatsAppButton
            label="Bicarakan perawatan Anda — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
