import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FourPathsSplit from "@/components/FourPathsSplit";
import InstagramGrid from "@/components/InstagramGrid";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { INSTAGRAM_HANDLE, waLink } from "@/lib/site";

// A2 — Indonesian version (docs/FEEDBACK-LOG.md). Structure mirrors
// app/page.tsx; copy is a first-pass translation for Tommy's review,
// not yet wired to the Supabase CMS (hero_eyebrow/hero_subtitle stay
// EN-only for now — see the A2 note in the final report).
export const metadata: Metadata = {
  title: "DOKDEN — Layanan Dokter Pribadi | Denish Gunawan Clinic",
  description:
    "Denish Gunawan Clinic menghadirkan perawatan homecare yang dipimpin dokter di Jakarta — infus, terapi regeneratif, kesehatan metabolik, dan estetika, dilayani secara pribadi ke tempat Anda.",
};

export const revalidate = 300;

export default function HomePageId() {
  return (
    <>
      <section className="dk-hero">
        <div className="dk-hero-media">
          <Image
            src="/images/dokden/hero-home-visit.webp"
            alt="Dokter tiba untuk kunjungan homecare pribadi"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="dk-hero-scrim" />
        </div>
        <div className="container dk-hero-content">
          <span className="eyebrow">Kesehatan Homecare Premium · Jakarta</span>
          <h1 className="dk-hero-headline">
            Dokter Pribadi ke Rumah Anda.
            <br />
            Standar Perawatan Terbaik.
          </h1>
          <p className="lede">
            Perawatan di rumah, langsung ditangani dokter — se-Jabodetabek.
          </p>
          <div className="hero-actions">
            <a
              href={waLink("Halo DOKDEN — saya ingin meminta pengiriman dokter.")}
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Panggil Dokter
            </a>
            <Link href="/id/infusion-therapy" className="btn btn-ghost">
              Lihat Layanan
            </Link>
          </div>
          <div className="trust-line">
            <span>Sejak 2021</span>
            <span>10.000+ Pasien Dilayani</span>
            <span>Perawatan Dipimpin Dokter</span>
          </div>
        </div>
      </section>

      <section className="dk-capability-band">
        <div className="container">
          <Reveal>
            <div className="center">
              <span className="eyebrow">Layanan Kami</span>
              <h2>Empat Jalan Menuju Kesehatan Lebih Baik</h2>
              <p className="lede">
                Baik Anda memerlukan dukungan kesehatan harian maupun
                perawatan regeneratif lanjutan, Denish Gunawan Clinic menghadirkan
                perawatan yang tepat untuk Anda.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <FourPathsSplit locale="id" />
            <p className="split-hint">Arahkan kursor atau ketuk untuk menjelajahi.</p>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <div className="center">
            <span className="eyebrow">Homecare untuk Siapa Saja</span>
            <h2>Homecare, Dibangun untuk yang Membutuhkannya</h2>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="grid-2">
            <div className="region-card">
              <h3>Siapa yang Paling Diuntungkan</h3>
              <ul>
                <li>Profesional sibuk</li>
                <li>Pasien lansia</li>
                <li>Pasien penyakit kronis</li>
                <li>Pasien pasca rawat inap</li>
                <li>Anak-anak dengan sakit ringan</li>
              </ul>
            </div>
            <div className="region-card">
              <h3>Mengapa Memilih Homecare</h3>
              <ul>
                <li>Tanpa perlu bepergian</li>
                <li>Perawatan holistik</li>
                <li>Perawatan personal</li>
                <li>Melibatkan keluarga</li>
                <li>Privasi lebih terjaga</li>
                <li>Risiko paparan penyakit lebih rendah</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="navy-block dk-slate-block">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Mengapa Denish Gunawan Clinic</span>
            <h2>Perawatan yang Menjunjung Privasi</h2>
          </div>
          <p className="statement">
            Kami percaya kesehatan seharusnya bersifat pribadi. Setiap
            kunjungan direncanakan dan diawasi oleh{" "}
            <span className="em-teal">dokter berlisensi</span> — dengan
            kerahasiaan penuh di rumah Anda sendiri.
          </p>
          <div className="stat-cards">
            <Reveal delay={0}>
              <div className="stat-card">
                <p className="stat-value">Sejak 2021</p>
                <p className="stat-label">Dipercaya Sejak</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="stat-card">
                <p className="stat-value">10.000+</p>
                <p className="stat-label">Pasien Dilayani</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="stat-card">
                <p className="stat-value">100%</p>
                <p className="stat-label">Perawatan Dipimpin Dokter</p>
              </div>
            </Reveal>
          </div>
          <ul className="pillar-list">
            <li>
              <strong>Perawatan dipimpin dokter</strong> — setiap rencana
              perawatan ditetapkan dan diawasi oleh dokter berlisensi;
              perawatan jangka panjang di rumah didampingi perawat di bawah
              arahan dokter yang sama.
            </li>
            <li>
              <strong>Kerahasiaan penuh</strong> — tanpa kunjungan klinik,
              tanpa ruang tunggu, tanpa terlihat orang lain.
            </li>
            <li>
              <strong>Terbukti sejak 2021</strong> — 10.000+ pasien
              mempercayai Denish Gunawan Clinic di seluruh Jakarta.
            </li>
          </ul>
          <div className="center">
            <WhatsAppButton
              label="Hubungi kami di WhatsApp untuk membahas perawatan Anda →"
              variant="light"
            />
          </div>
        </div>
      </section>

      <section className="section container center">
        <Reveal>
          <a
            href="https://www.instagram.com/dg.clinic.hnw"
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <h2>Ikuti Kami di Instagram</h2>
        </Reveal>
        <Reveal delay={90}>
          <InstagramGrid />
        </Reveal>
      </section>

      <section className="section container center">
        <Reveal>
          <h2>Di Mana Pun Anda di Jakarta, Kami Datang</h2>
          <p className="lede">
            Jakarta (semua area) · Tangerang · Area sekitar Jabodetabek
          </p>
          <Link href="/id/service-area" className="btn btn-ghost">
            Lihat Area Layanan &amp; Kontak
          </Link>
        </Reveal>
      </section>
    </>
  );
}
