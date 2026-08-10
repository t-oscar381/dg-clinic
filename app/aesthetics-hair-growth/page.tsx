import type { Metadata } from "next";
import TreatmentTabs, { type Treatment } from "@/components/TreatmentTabs";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Aesthetic & Hair Growth Treatment at Home — DG Clinic Jakarta",
  description:
    "Clinical aesthetic care and hair growth treatment from DG Clinic — skin boosters, signature lifting, and hair restoration delivered privately in Jakarta.",
};

const treatments: Treatment[] = [
  {
    id: "skin-booster-exosome",
    tab: "Skin Booster + Exosome",
    badge: "Skin Booster + Exosome",
    badgeClass: "badge-essential",
    name: "Hydration Meets Renewal",
    copy: "Regenerative skin treatment combining deep hydration with cell-derived renewal support.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about the Skin Booster + Exosome treatment.",
  },
  {
    id: "natural-tersembunyi",
    tab: "Natural Tersembunyi Skin Lift",
    badge: "Signature",
    badgeClass: "badge-signature",
    name: "Natural Tersembunyi Skin Lift",
    copy: "Our signature lifting treatment — subtle, natural-looking results that stay your secret.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about the Natural Tersembunyi Skin Lift.",
  },
  {
    id: "hyperpigmentation",
    tab: "Hyperpigmentation",
    badge: "Hyperpigmentation",
    badgeClass: "badge-basic",
    name: "Hyperpigmentation Treatment",
    copy: "Targeted clinical treatment for uneven tone and dark spots.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about the Hyperpigmentation Treatment.",
  },
  {
    id: "hair-growth",
    tab: "Hair Growth Protocol",
    badge: "Hair Growth",
    badgeClass: "badge-sickness",
    name: "Hair Growth Protocol",
    copy: "A doctor-designed program combining mesotherapy, oral support, and topical treatment for fuller, healthier hair.",
    ctaLabel: "Ask via WhatsApp →",
    ctaMessage:
      "Hello DG Clinic — I would like to ask about the Hair Growth Protocol.",
  },
];

export default function AestheticsHairGrowthPage() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-aesthetics.webp)" }}
      >
        <span className="eyebrow">
          Aesthetics &amp; Hair Growth · Homecare Jakarta
        </span>
        <h1>
          Clinical Aesthetics, In <span className="em-teal">Complete Privacy</span>
        </h1>
        <p className="lede">
          Aesthetic care with medical precision — administered by licensed
          doctors in the comfort and discretion of your home.
        </p>
      </section>

      <section className="section-tight container">
        <TreatmentTabs
          treatments={treatments}
          ariaLabel="Aesthetic and hair growth treatments"
        />
        <p className="center" style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Pricing is shared privately — message us on WhatsApp and we&rsquo;ll
          walk you through it.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Not Sure Where to Start?</h2>
          <p>
            Tell us your skin or hair goals — our team will recommend the
            treatment that fits.
          </p>
          <WhatsAppButton
            label="Ask what fits your goals — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
