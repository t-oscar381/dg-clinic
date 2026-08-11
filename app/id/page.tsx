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
    "DG Clinic menghadirkan perawatan homecare yang dipimpin dokter di Jakarta — infus, terapi regeneratif, kesehatan metabolik, dan estetika, dilayani secara pribadi ke tempat Anda.",
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
            Layanan Dokter Pribadi.
            <br />
            Perawatan Tanpa Kompromi.
          </h1>
          <p className="lede">
            Homecare yang dipimpin dokter di seluruh Jabodetabek.
          </p>
          <div className="hero-actions">
            <a
              href={waLink("Halo DOKDEN — saya ingin meminta pengiriman dokter.")}
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kirim Dokter
            </a>
            <Link href="/id/infusion-therapy" className="btn btn-ghost">
              Jelajahi Perawatan
            </Link>
          </div>
          <div className="trust-line">
            <span>Berdiri 2021</span>
            <span>10.000+ Pasien Terlayani</span>
            <span>Hanya Dikirim Dokter</span>
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
                perawatan regeneratif lanjutan, DG Clinic menghadirkan
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

      <section className="navy-block dk-slate-block">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Mengapa DG Clinic</span>
            <h2>Perawatan yang Menjunjung Privasi</h2>
          </div>
          <p className="statement">
            Kami percaya kesehatan seharusnya bersifat pribadi. Setiap
            kunjungan ditangani oleh{" "}
            <span className="em-teal">dokter berlisensi</span> — bukan
            kunjungan perawat semata — dengan kerahasiaan penuh di rumah Anda
            sendiri.
          </p>
          <div className="stat-cards">
            <Reveal delay={0}>
              <div className="stat-card">
                <p className="stat-value">Berdiri 2021</p>
                <p className="stat-label">Dipercaya Sejak</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="stat-card">
                <p className="stat-value">10.000+</p>
                <p className="stat-label">Pasien Terlayani</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="stat-card">
                <p className="stat-value">100%</p>
                <p className="stat-label">Hanya Dikirim Dokter</p>
              </div>
            </Reveal>
          </div>
          <ul className="pillar-list">
            <li>
              <strong>Hanya dikirim dokter</strong> — setiap perawatan
              ditangani oleh dokter berlisensi yang dihadirkan khusus untuk
              Anda.
            </li>
            <li>
              <strong>Kerahasiaan penuh</strong> — tanpa kunjungan klinik,
              tanpa ruang tunggu, tanpa terlihat orang lain.
            </li>
            <li>
              <strong>Terbukti sejak 2021</strong> — 10.000+ pasien
              mempercayai DG Clinic di seluruh Jakarta.
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
