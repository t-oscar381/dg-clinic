import type { Metadata } from "next";
import { WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DG Medika — Non-Prescription Medicines (Coming Soon)",
  description:
    "Non-prescription medicine requests from DG Medika — under development.",
  robots: { index: false, follow: false },
};

// Under-development shell for the future DG Medika pharmacy entity —
// no service yet, just a placeholder. See docs/FEEDBACK-LOG.md Round 3.
// TODO: swap the text wordmark below for the real DG Medika logo once
// it's copied somewhere this environment can read — the source SVG in
// OneDrive is blocked by an OS-level file permission, not a code issue.
export default function DgMedikaPage() {
  return (
    <section className="hero container center dk-page-hero">
      <span className="dg-medika-wordmark" aria-hidden="true">
        DG MEDIKA
      </span>
      <span className="eyebrow">Non-Prescription Medicines</span>
      <h1>Page Under Development</h1>
      <p className="lede">
        DG Medika is a separate pharmacy entity we&rsquo;re building out to
        handle non-prescription medicine requests. This page isn&rsquo;t
        live yet — in the meantime, message the clinic on WhatsApp and
        we&rsquo;ll point you in the right direction.
      </p>
      <div className="hero-actions">
        <a
          href={WHATSAPP_URL}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Message Us on WhatsApp
        </a>
      </div>
    </section>
  );
}
