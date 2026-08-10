import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "HNW Concierge — DG Clinic, Jakarta",
  description:
    "Private concierge homecare from Denish Gunawan Clinic. Details coming soon — message us on WhatsApp to discuss your requirements today.",
};

// Shell only — no approved copy exists yet for this route
// (docs/HANDOFF-rebrand.md §2, §6 item 4). Do not add service claims here
// until Tommy signs off on the concierge offering.
export default function HnwConciergePage() {
  return (
    <section
      className="hero container center dk-page-hero"
      style={{ backgroundImage: "url(/images/heroes/hero-hnw.webp)" }}
    >
      <span className="eyebrow">HNW Concierge</span>
      <h1>Private Concierge Care, Coming Soon</h1>
      <p className="lede">
        We&apos;re preparing a dedicated concierge offering for {SITE_NAME}.
        In the meantime, message us on WhatsApp and our team will discuss
        your requirements directly.
      </p>
      <div className="hero-actions">
        <WhatsAppButton label="Message Us on WhatsApp" />
      </div>
    </section>
  );
}
