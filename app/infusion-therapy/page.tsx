import type { Metadata } from "next";
import PricedCatalog from "@/components/PricedCatalog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { INFUSION_PRODUCTS, INFUSION_TIERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Infusion Therapy — Vitamin & Wellness IV Drips in Jakarta",
  description:
    "Denish Gunawan Clinic's homecare infusion therapy — from daily energy support to targeted recovery drips — delivered privately across Jakarta by licensed doctors.",
};

export default function InfusionTherapyPage() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{ backgroundImage: "url(/images/heroes/hero-infusion.webp)" }}
      >
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
        <PricedCatalog
          tiers={INFUSION_TIERS}
          products={INFUSION_PRODUCTS}
          ariaLabel="Infusion therapy tiers"
          ctaLabel="Book via WhatsApp"
          messageStyle="book"
        />
        <p className="price-note">
          Prices shown are per session. Home-care visits are quoted separately
          based on your location — message us on WhatsApp to confirm your final
          price.
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
