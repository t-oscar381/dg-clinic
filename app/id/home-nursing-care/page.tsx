import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Perawatan Rumah oleh Perawat — Homecare di Jakarta",
  description:
    "Perawatan keperawatan di rumah yang diarahkan dokter dari Denish Gunawan Clinic — perawat siaga 24 jam, pemasangan NGT dan kateter, perawatan luka, dan EKG, dilayani secara pribadi di Jakarta.",
};

const services: Treatment[] = [
  {
    id: "nurse-caregiver",
    tab: "Perawat & Caregiver 24 Jam",
    badge: "Perawatan 24 Jam",
    badgeClass: "badge-signature",
    name: "Perawat Siaga di Rumah",
    copy: "Perawat berlisensi mendampingi Anda di rumah selama yang Anda butuhkan — diarahkan dokter, dengan penawaran sesuai durasi.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Perawat & Caregiver 24 Jam.",
  },
  {
    id: "ngt",
    tab: "Pasang NGT",
    badge: "Prosedur Perawat",
    badgeClass: "badge-essential",
    name: "Pemasangan Selang NGT",
    copy: "Pemasangan dan perawatan selang nasogastrik di rumah, sesuai protokol keperawatan yang diarahkan dokter.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Pasang NGT.",
  },
  {
    id: "catheter",
    tab: "Pasang Kateter",
    badge: "Prosedur Perawat",
    badgeClass: "badge-gold",
    name: "Pemasangan Kateter Urin",
    copy: "Pemasangan dan perawatan kateter di rumah oleh perawat terlatih, di bawah arahan dokter.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Pasang Kateter.",
  },
  {
    id: "wound-care",
    tab: "Perawatan Luka",
    badge: "Prosedur Perawat",
    badgeClass: "badge-basic",
    name: "Perawatan Luka",
    copy: "Perawatan luka diabetes, pasca operasi, dan luka tekan, ditangani di rumah sesuai rencana dokter.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang Perawatan Luka.",
  },
  {
    id: "ekg",
    tab: "EKG",
    badge: "Diagnostik",
    badgeClass: "badge-sickness",
    name: "Elektrokardiogram (EKG)",
    copy: "EKG di rumah, dilakukan dan ditinjau sebagai bagian dari rencana perawatan dokter Anda.",
    ctaLabel: "Tanya via WhatsApp →",
    ctaMessage:
      "Halo Denish Gunawan Clinic — saya ingin bertanya tentang EKG di rumah.",
  },
];

export default function HomeNursingCarePageId() {
  return (
    <>
      <section className="hero container dk-page-hero">
        <span className="eyebrow">Perawatan Rumah oleh Perawat · Homecare Jakarta</span>
        <h1>
          Perawatan oleh Perawat, <span className="em-teal">Diarahkan Dokter</span>
        </h1>
        <p className="lede">
          Untuk pemulihan jangka panjang atau dukungan harian, perawat
          berlisensi dapat mendampingi Anda di rumah — setiap rencana
          perawatan tetap ditetapkan dan diawasi oleh dokter, dengan
          penawaran sesuai kebutuhan Anda.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs treatments={services} ariaLabel="Layanan perawatan rumah oleh perawat" />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Durasi, penempatan, dan harga dibahas langsung dengan tim kami via
          WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Butuh Perawatan Berkelanjutan di Rumah?</h2>
          <p>
            Ceritakan dukungan seperti apa yang Anda butuhkan — tim kami akan
            menyusun rencana dan penawaran.
          </p>
          <WhatsAppButton
            label="Tanyakan perawatan rumah oleh perawat — hubungi WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
