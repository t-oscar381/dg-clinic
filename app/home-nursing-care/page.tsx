import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Home Nursing Care — Nurse-Supported Homecare in Jakarta",
  description:
    "Doctor-directed nursing care at home from Denish Gunawan Clinic — 24-hour nurse support, NGT and catheter placement, wound care, and EKG, delivered privately in Jakarta.",
};

// Round 3 feedback (docs/FEEDBACK-LOG.md B5): a nurse-on-duty add-on, not
// the core doctor-dispatch product — every plan here is still set and
// supervised by a doctor, per the resolved doctor-led framing on the
// homepage. Quote-based like every non-Infusion/Vaccination category —
// no prices published.
const services: Treatment[] = [
  {
    id: "nurse-caregiver",
    tab: "Nurse & Caregiver Care",
    badge: "24-Hour Care",
    badgeClass: "badge-signature",
    name: "Nurse On Duty at Home",
    copy: "A licensed nurse stays with you at home for as long as you need — doctor-directed, quoted per duration.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about Nurse & Caregiver Care.",
  },
  {
    id: "ngt",
    tab: "NGT Placement",
    badge: "Nursing Procedure",
    badgeClass: "badge-essential",
    name: "Nasogastric Tube (NGT) Placement",
    copy: "Nasogastric tube placement and ongoing care, performed at home under a doctor-directed nursing protocol.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about NGT Placement.",
  },
  {
    id: "catheter",
    tab: "Catheter Placement",
    badge: "Nursing Procedure",
    badgeClass: "badge-gold",
    name: "Indwelling Urinary Catheter",
    copy: "Catheter placement and ongoing care at home, performed by a trained nurse under doctor direction.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about Catheter Placement.",
  },
  {
    id: "wound-care",
    tab: "Wound Care",
    badge: "Nursing Procedure",
    badgeClass: "badge-basic",
    name: "Wound Care",
    copy: "Diabetic, post-operative, and pressure-ulcer wound care, managed at home under a doctor's plan.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about Wound Care.",
  },
  {
    id: "ekg",
    tab: "EKG",
    badge: "Diagnostic",
    badgeClass: "badge-sickness",
    name: "Electrocardiogram (EKG)",
    copy: "At-home EKG, performed and reviewed as part of your doctor-led care plan.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about an at-home EKG.",
  },
];

// No dedicated hero image yet — flat dk-page-hero, following the
// /vaccinations precedent.
export default function HomeNursingCarePage() {
  return (
    <>
      <section className="hero container dk-page-hero">
        <span className="eyebrow">Home Nursing Care · Homecare Jakarta</span>
        <h1>
          Nurse-Supported Care, <span className="em-teal">Doctor-Directed</span>
        </h1>
        <p className="lede">
          For extended recovery or daily support, a licensed nurse can stay
          with you at home — every plan is still set and supervised by a
          doctor, quoted to fit your needs.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs treatments={services} ariaLabel="Home nursing care services" />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Duration, staffing, and pricing are discussed one-on-one with our
          team via WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Need Ongoing Care at Home?</h2>
          <p>
            Tell us what kind of support you need — our team will put
            together a plan and a quote.
          </p>
          <WhatsAppButton
            label="Ask about home nursing care — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
