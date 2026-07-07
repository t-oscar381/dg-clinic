import type { Metadata } from "next";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Stem Cell & Weight Loss Therapy — Denish Gunawan Clinic Jakarta",
  description:
    "Advanced stem cell and weight loss therapy from Denish Gunawan Clinic (DG Clinic) — administered privately at home by licensed doctors in Jakarta.",
};

/*
 * Compliance: function-only copy — no product or brand names shown
 * publicly. Specific formulations and protocols are discussed via
 * WhatsApp, not on-site. No disease claims, no guaranteed outcomes.
 */

export default function StemCellWeightLossPage() {
  return (
    <>
      <section className="hero container">
        <span className="eyebrow eyebrow-gold">
          Regenerative &amp; Advanced Care
        </span>
        <h1>
          Advanced Care for the <span className="em-gold">Next Level</span> of
          Wellness
        </h1>
        <p className="lede">
          Beyond daily infusion, DG Clinic offers advanced treatment for
          cellular recovery and weight management — administered with the same
          doctor-only, private care you expect from us.
        </p>
      </section>

      <section className="section-tight container">
        <div className="grid-2">
          <div className="card card-gold">
            <span className="badge badge-gold">Stem Cell Therapy</span>
            <h3>Cellular Repair &amp; Recovery</h3>
            <p>
              Regenerative treatment designed to support cellular repair and
              recovery — a next-generation approach to long-term wellness,
              delivered privately at home.
            </p>
          </div>
          <div className="card card-gold">
            <span className="badge badge-gold">Weight Loss Therapy</span>
            <h3>Medical Weight Management</h3>
            <p>
              Medical support for weight management, administered under the
              same doctor-led, private care standard as every DG Clinic
              treatment.
            </p>
          </div>
        </div>
        <p style={{ marginTop: 28, fontSize: "0.88rem", opacity: 0.7 }}>
          Specific formulations and protocols are discussed one-on-one with
          our team via WhatsApp.
        </p>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Ready for the Next Step?</h2>
          <p>
            Both therapies are available and bookable now. Message us and
            we&rsquo;ll help you find the option that fits your goals.
          </p>
          <WhatsAppButton
            label="Ask us which option fits you — message on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
