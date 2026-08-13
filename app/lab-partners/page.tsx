import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Requests — Denish Gunawan Clinic, Jakarta",
  description:
    "Need a lab test alongside your homecare visit? Message us on WhatsApp and we'll coordinate sample collection and testing.",
};

// Demoted from a partner logo wall to a quiet trust line (docs/FEEDBACK-LOG.md
// Round 3, B2) — advertising the labs by name invited "why not book direct
// with them?"; the action is a WhatsApp conversation instead. No dedicated
// hero treatment on purpose, to match.
export default function LabPartnersPage() {
  return (
    <section className="hero container center">
      <span className="eyebrow">Lab Requests</span>
      <h1>Need a Lab Test With Your Visit?</h1>
      <p className="lede">
        For homecare visits that require lab work, we coordinate sample
        collection and testing through accredited diagnostic partners —
        Prodia, Biotest, and Biomedika.
      </p>
      <div className="hero-actions">
        <a
          href="/go/lab?t=general"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Request a Lab Test on WhatsApp →
        </a>
      </div>
    </section>
  );
}
