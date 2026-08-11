import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "HNW Concierge — DG Clinic, Jakarta",
  description:
    "Layanan concierge homecare pribadi dari Denish Gunawan Clinic. Detail segera hadir — hubungi kami di WhatsApp untuk membahas kebutuhan Anda hari ini.",
};

// Shell only — no approved copy exists yet for this route, same as the
// EN version (docs/HANDOFF-rebrand.md §2, §6 item 4).
export default function HnwConciergePageId() {
  return (
    <section
      className="hero container center dk-page-hero"
      style={{ backgroundImage: "url(/images/heroes/hero-hnw.webp)" }}
    >
      <span className="eyebrow">HNW Concierge</span>
      <h1>Layanan Concierge Pribadi, Segera Hadir</h1>
      <p className="lede">
        Kami sedang menyiapkan layanan concierge khusus untuk {SITE_NAME}.
        Sementara itu, hubungi kami di WhatsApp dan tim kami akan membahas
        kebutuhan Anda secara langsung.
      </p>
      <div className="hero-actions">
        <WhatsAppButton label="Hubungi Kami di WhatsApp" />
      </div>
    </section>
  );
}
