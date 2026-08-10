import type { Metadata } from "next";
import LocationMap from "@/components/LocationMap";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SERVICE_REGIONS,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas & Contact — DG Clinic Homecare Jakarta",
  description:
    "DG Clinic serves Greater Jakarta with private, doctor-led home-care. Message us on WhatsApp to arrange your visit.",
};

export default function ServiceAreaPage() {
  return (
    <>
      <section
        className="hero container dk-page-hero"
        style={{
          backgroundImage: "url(/images/heroes/hero-service-area.webp)",
        }}
      >
        <span className="eyebrow">Service Areas · Greater Jakarta</span>
        <h1>
          Wherever You Are in Jakarta, <br />
          <span className="em-teal">We Come to You</span>
        </h1>
        <p className="lede">
          DG Clinic serves patients across Greater Jakarta, bringing the same
          private, doctor-led care to every visit.
        </p>
      </section>

      <section className="section-tight container">
        <div className="grid-2">
          {SERVICE_REGIONS.map((region) => (
            <div className="region-card" key={region.name}>
              <h3>{region.name}</h3>
              <div className="chip-row">
                {region.areas.map((area) => (
                  <span className="chip" key={area}>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <span className="eyebrow">Contact</span>
          <h2>Start With a Message</h2>
          <p>
            Reach out on WhatsApp to discuss your care — a member of our team
            will respond directly and help you find the right treatment.
          </p>
          <p>
            When you message us, expect a straightforward conversation:
            we&rsquo;ll ask a few questions about what you&rsquo;re looking
            for, and guide you from there. No forms, no waiting.
          </p>
          <p>
            <a
              href={WHATSAPP_URL}
              style={{ color: "var(--color-white)", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <br />
            <a
              href={INSTAGRAM_URL}
              style={{ color: "var(--color-white)", fontWeight: 600 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram {INSTAGRAM_HANDLE}
            </a>
          </p>
          <WhatsAppButton
            label="Message DG Clinic on WhatsApp →"
            variant="light"
          />
        </div>
      </section>

      <section className="section-tight container">
        <Reveal>
          <div className="center">
            <span className="eyebrow">Find Us</span>
            <h2>Our Location</h2>
          </div>
          <LocationMap />
        </Reveal>
      </section>
    </>
  );
}
