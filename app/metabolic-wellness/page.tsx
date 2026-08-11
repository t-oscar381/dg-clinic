import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Metabolic Wellness — Medical Weight Loss Program in Jakarta",
  description:
    "Doctor-guided weight loss and performance support from Denish Gunawan Clinic — injectable and oral programs, delivered privately at home in Jakarta.",
};

const programs: Treatment[] = [
  {
    id: "weight-loss",
    tab: "Weight Loss Program",
    badge: "Weight Loss Program",
    badgeClass: "badge-signature",
    name: "Doctor-Supervised Weight Management",
    copy: "Doctor-supervised weight management combining injectable and oral medicine with lifestyle guidance — built as an ongoing program, not a one-off treatment.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about the Weight Loss Program.",
  },
  {
    id: "sleep-focus",
    tab: "Sleep & Focus Boosters",
    badge: "Sleep & Focus Boosters",
    badgeClass: "badge-essential",
    name: "Rest, Clarity & Performance",
    copy: "Targeted support for rest, clarity, and daily performance.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello Denish Gunawan Clinic — I would like to ask about Sleep & Focus Boosters.",
  },
];

export default function MetabolicWellnessPage() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-metabolic.webp)" }}
      >
        <span className="eyebrow">Metabolic Wellness · Homecare Jakarta</span>
        <h1>
          Metabolic Health, <span className="em-teal">Managed by Doctors</span>
        </h1>
        <p className="lede">
          Sustainable results come from medical guidance, not guesswork. DG
          Clinic&rsquo;s metabolic programs are designed, supervised, and
          adjusted by licensed doctors — privately, at home.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={programs}
          ariaLabel="Metabolic wellness programs"
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Specific formulations and protocols are discussed one-on-one with
          our team via WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>A Program Built Around You</h2>
          <p>
            Tell us your goals and your routine — our doctors will design a
            program that fits, and adjust it as you go.
          </p>
          <WhatsAppButton
            label="Ask about a program built for you — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
