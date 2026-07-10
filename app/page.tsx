import Link from "next/link";
import FourPathsSplit from "@/components/FourPathsSplit";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero container">
        <span className="eyebrow">Premium Homecare Wellness · Jakarta</span>
        <h1>
          Premium Wellness, Delivered <span className="em-teal">Privately</span>{" "}
          to Your Door
        </h1>
        <p className="lede">
          Since 2021, DG Clinic has brought doctor-led home-care to over 10,000
          patients across Jakarta. No waiting rooms. No compromise on care.
          Just medical treatment on your terms, in your own space.
        </p>
        <div className="hero-actions">
          <WhatsAppButton label="Message Us on WhatsApp" />
          <Link href="/infusion-therapy" className="btn btn-ghost">
            Explore Treatments
          </Link>
        </div>
        <div className="trust-line">
          <span>Est. 2021</span>
          <span>10,000+ Patients Served</span>
          <span>Doctor-Only Dispatch</span>
        </div>
      </section>

      {/* Four-category architecture — the site's core structure */}
      <section className="section container">
        <Reveal>
          <div className="center">
            <h2>Four Paths to Better Health</h2>
            <p className="lede">
              Whether you need daily wellness support or advanced regenerative
              care, DG Clinic brings the right treatment to you.
            </p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <FourPathsSplit />
          <p className="split-hint">
            Hover or tap a path to bring it into focus — select again to
            explore.
          </p>
        </Reveal>
      </section>

      {/* Why DG Clinic — navy trust block */}
      <section className="navy-block">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Why DG Clinic</span>
            <h2>Care Built Around Privacy</h2>
          </div>
          <p className="statement">
            We believe wellness should be private. Every visit is conducted by
            a <span className="em-teal">licensed doctor</span> — never a
            nurse-only visit — in the discretion of your own home.
          </p>
          <div className="stat-cards">
            <Reveal delay={0}>
              <div className="stat-card">
                <p className="stat-value">Est. 2021</p>
                <p className="stat-label">Trusted Since</p>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="stat-card">
                <p className="stat-value">10,000+</p>
                <p className="stat-label">Patients Served</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="stat-card">
                <p className="stat-value">100%</p>
                <p className="stat-label">Doctor-Only Dispatch</p>
              </div>
            </Reveal>
          </div>
          <ul className="pillar-list">
            <li>
              <strong>Doctor-only dispatch</strong> — every treatment is
              administered by a hired, licensed physician.
            </li>
            <li>
              <strong>Complete discretion</strong> — no clinic visit, no
              waiting room, no exposure.
            </li>
            <li>
              <strong>Proven since 2021</strong> — 10,000+ patients trust DG
              Clinic across Jakarta.
            </li>
          </ul>
          <div className="center">
            <WhatsAppButton
              label="Message us on WhatsApp to discuss your care →"
              variant="light"
            />
          </div>
        </div>
      </section>

      {/* Service area teaser */}
      <section className="section container center">
        <Reveal>
          <h2>Wherever You Are in Jakarta, We Come to You</h2>
          <p className="lede">
            All Jakarta areas · BSD City &amp; Serpong · Alam Sutera &amp;
            Tangerang · Greater Jakarta surrounding areas
          </p>
          <Link href="/service-area" className="btn btn-ghost">
            See Service Areas &amp; Contact
          </Link>
        </Reveal>
      </section>
    </>
  );
}
