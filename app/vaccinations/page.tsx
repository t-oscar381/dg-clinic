import type { Metadata } from "next";
import PricedCatalog from "@/components/PricedCatalog";
import WhatsAppButton from "@/components/WhatsAppButton";
import { VACCINE_GROUPS, VACCINES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Vaccinations — Adult & Travel Vaccines in Jakarta",
  description:
    "Denish Gunawan Clinic's vaccine menu — chickenpox, HPV, meningococcal, RSV, travel vaccines and more, administered at home by licensed doctors in Jakarta.",
};

export default function VaccinationsPage() {
  return (
    <>
      <section className="hero container dk-page-hero">
        <span className="eyebrow">Vaccinations · Homecare Jakarta</span>
        <h1>
          Vaccinations, <span className="em-teal">Delivered to Your Door</span>
        </h1>
        <p className="lede">
          A full vaccine menu administered at home by a licensed doctor — no
          clinic visit required.
        </p>
      </section>

      <section className="section-tight container">
        <PricedCatalog
          tiers={VACCINE_GROUPS}
          products={VACCINES}
          ariaLabel="Vaccine index"
          ctaLabel="Ask via WhatsApp"
          messageStyle="ask"
        />
        <p className="price-note">
          Prices listed are for in-clinic administration. Consultation and
          home-service fees are quoted separately — message us on WhatsApp
          for your final price. Administered by licensed medical
          professionals only.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Not Sure Which Vaccine You Need?</h2>
          <p>
            Tell us your age, travel plans, or medical history — our doctors
            will recommend what&rsquo;s appropriate for you.
          </p>
          <WhatsAppButton
            label="Ask about vaccines — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
