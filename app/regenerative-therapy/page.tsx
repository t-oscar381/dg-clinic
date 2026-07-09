import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Regenerative Therapy in Jakarta — Secretome, Exosome & Cellular Treatment",
  description:
    "Advanced regenerative therapy from DG Clinic — secretome, exosome, and cellular treatments administered privately at home by licensed doctors in Jakarta.",
};

const modalities: Treatment[] = [
  {
    id: "secretome-exosome",
    tab: "Secretome & Exosome",
    badge: "Secretome & Exosome Therapy",
    badgeClass: "badge-gold",
    name: "Cell-Derived Renewal",
    copy: "Cell-derived regenerative treatment designed to support your body's natural repair and recovery processes.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about Secretome & Exosome Therapy.",
  },
  {
    id: "stem-nk-cell",
    tab: "Stem Cell & NK Cell",
    badge: "Stem Cell & NK Cell Therapy",
    badgeClass: "badge-gold",
    name: "Cellular Recovery & Resilience",
    copy: "Advanced cellular therapy supporting recovery, resilience, and immune vitality — administered under full medical supervision.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about Stem Cell & NK Cell Therapy.",
  },
];

export default function RegenerativeTherapyPage() {
  return (
    <>
      <section className="hero container">
        <span className="eyebrow eyebrow-gold">
          Regenerative Therapy · Homecare Jakarta
        </span>
        <h1>
          Regenerative Therapy for <span className="em-gold">Long-Term</span>{" "}
          Vitality
        </h1>
        <p className="lede">
          The next generation of wellness works at the cellular level. DG
          Clinic brings advanced regenerative treatment to your home —
          doctor-administered, private, and personalized.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={modalities}
          ariaLabel="Regenerative therapy modalities"
          goldAccent
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Specific formulations and protocols are discussed one-on-one with
          our team via WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Every Program Begins With a Conversation</h2>
          <p>
            Every regenerative program begins with a conversation. Our
            doctors design each protocol around you.
          </p>
          <WhatsAppButton
            label="Start the conversation on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
