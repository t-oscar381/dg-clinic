import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Infusion Therapy — Vitamin & Wellness IV Drips in Jakarta",
  description:
    "DG Clinic's homecare infusion therapy — from daily energy support to targeted recovery drips — delivered privately across Jakarta by licensed doctors.",
};

const tiers: Treatment[] = [
  {
    id: "basic",
    tab: "Basic",
    badge: "Basic",
    badgeClass: "badge-basic",
    name: "Vitamin B&C Infusion",
    copy: "A foundational boost for daily energy and reduced fatigue — ideal for quick, reliable recovery.",
    ctaLabel: "Book via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to book the Vitamin B&C Infusion (Basic tier).",
  },
  {
    id: "essential",
    tab: "Essential",
    badge: "Essential",
    badgeClass: "badge-essential",
    name: "Silver & Gold Booster",
    copy: "Multivitamin support for sustained daily energy, immune health, and stronger recovery — built for a demanding lifestyle.",
    ctaLabel: "Book via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to book the Silver & Gold Booster (Essential tier).",
  },
  {
    id: "signature",
    tab: "Signature",
    badge: "Signature",
    badgeClass: "badge-signature",
    name: "Diamond Booster",
    copy: "Our most comprehensive formulation, designed to support cellular resilience and stable energy for sustained, all-day performance.",
    ctaLabel: "Book via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to book the Diamond Booster (Signature tier).",
  },
  {
    id: "sickness-relief",
    tab: "Sickness Relief",
    badge: "Sickness Relief",
    badgeClass: "badge-sickness",
    name: "Bye-Lergy, Fever Away, Rehydrate, Anti Gerd",
    copy: "Fast, doctor-administered relief for allergy symptoms, fever, dehydration, and digestive discomfort — without leaving your home.",
    ctaLabel: "Book via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to book a Sickness Relief infusion (Bye-Lergy, Fever Away, Rehydrate, or Anti Gerd).",
  },
];

export default function InfusionTherapyPage() {
  return (
    <>
      <section className="hero container">
        <span className="eyebrow">Infusion Therapy · Homecare Jakarta</span>
        <h1>
          Infusion Therapy, Tailored to <span className="em-teal">Your Day</span>
        </h1>
        <p className="lede">
          From everyday energy to targeted recovery, our infusion tiers are
          designed around how you actually live — administered at home, by a
          licensed doctor.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs treatments={tiers} ariaLabel="Infusion therapy tiers" />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Pricing is shared privately — message us on WhatsApp and we&rsquo;ll
          walk you through it.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Not Sure Which Tier Fits You?</h2>
          <p>
            Tell us how you&rsquo;re feeling and what your week looks like —
            our team will recommend the right infusion for you.
          </p>
          <WhatsAppButton
            label="Ask us which tier fits you — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
