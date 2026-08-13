import Image from "next/image";
import Link from "next/link";
import FourPathsSplit from "@/components/FourPathsSplit";
import InstagramGrid from "@/components/InstagramGrid";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteContent, pick } from "@/lib/cms";
import { INSTAGRAM_HANDLE, waLink } from "@/lib/site";

// Reads from Supabase, then serves the cached page for 5 minutes before
// re-rendering — admin edits at /dgc-master/content go live within that
// window instead of on every single request (supabase-js's fetch isn't
// tracked by Next's static-render analysis, so this must be explicit).
export const revalidate = 300;

export default async function HomePage() {
  const content = await getSiteContent("home");

  return (
    <>
      {/* Hero — full-bleed image per docs/HANDOFF-rebrand.md §3.1. Eyebrow
          and subtitle stay editable at /dgc-master/content; the headline is
          the approved copy and stays as code. */}
      <section className="dk-hero">
        <div className="dk-hero-media">
          <Image
            src="/images/dokden/hero-home-visit.webp"
            alt="Physician arriving for a private home visit"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="dk-hero-scrim" />
        </div>
        <div className="container dk-hero-content">
          <span className="eyebrow">
            {pick(content, "hero_eyebrow", "Premium Homecare Wellness · Jakarta")}
          </span>
          <h1 className="dk-hero-headline">
            Private Physician Services.
            <br />
            Uncompromising Care.
          </h1>
          <p className="lede">
            {pick(
              content,
              "hero_subtitle",
              "Doctor-led homecare across Greater Jakarta."
            )}
          </p>
          <div className="hero-actions">
            <a
              href={waLink("Hello DOKDEN — I'd like to request a doctor dispatch.")}
              className="btn btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dispatch a Doctor
            </a>
            <Link href="/infusion-therapy" className="btn btn-ghost">
              Explore Treatments
            </Link>
          </div>
          <div className="trust-line">
            <span>Est. 2021</span>
            <span>10,000+ Patients Served</span>
            <span>Doctor-Led Care</span>
          </div>
        </div>
      </section>

      {/* Showcase — mapped to the four real service categories, per
          docs/HANDOFF-rebrand.md §3.2 and docs/HANDOFF-showcase.md. */}
      <section className="dk-capability-band">
        <div className="container">
          <Reveal>
            <div className="center">
              <span className="eyebrow">What We Offer</span>
              <h2>Four Paths to Better Health</h2>
              <p className="lede">
                Whether you need daily wellness support or advanced
                regenerative care, Denish Gunawan Clinic brings the right treatment to
                you.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <FourPathsSplit />
            <p className="split-hint">
              Hover or tap a path to explore.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Homecare for Everyone — Round 3 feedback (B5, docs/FEEDBACK-LOG.md).
          Who it's for + why homecare, from the brand designer's Instagram
          creative. */}
      <section className="section container">
        <Reveal>
          <div className="center">
            <span className="eyebrow">Homecare for Everyone</span>
            <h2>Homecare, Built Around Who Needs It</h2>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="grid-2">
            <div className="region-card">
              <h3>Who Benefits Most</h3>
              <ul>
                <li>Busy professionals</li>
                <li>Elderly patients</li>
                <li>Chronic illness patients</li>
                <li>Post-hospitalisation patients</li>
                <li>Children with mild illnesses</li>
              </ul>
            </div>
            <div className="region-card">
              <h3>Why Choose Homecare</h3>
              <ul>
                <li>No travelling</li>
                <li>Holistic treatment</li>
                <li>Personalised care</li>
                <li>Family involvement</li>
                <li>Greater privacy</li>
                <li>Less exposure to illness</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why Denish Gunawan Clinic — restyled to the DOKDEN dark band, content unchanged
          per docs/HANDOFF-rebrand.md §3, §5 stage 5. */}
      <section className="navy-block dk-slate-block">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Why Denish Gunawan Clinic</span>
            <h2>Care Built Around Privacy</h2>
          </div>
          <p className="statement">
            We believe wellness should be private. Every visit is set and
            supervised by a{" "}
            <span className="em-teal">licensed doctor</span> — in the
            discretion of your own home.
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
                <p className="stat-label">Doctor-Led Care</p>
              </div>
            </Reveal>
          </div>
          <ul className="pillar-list">
            <li>
              <strong>Doctor-led care</strong> — every treatment plan is set
              and supervised by a hired, licensed physician; extended
              homecare is nurse-supported under that same doctor&rsquo;s
              direction.
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

      {/* Instagram grid — static curated tiles for v1, per
          docs/HANDOFF-rebrand.md §3.3. */}
      <section className="section container center">
        <Reveal>
          <span className="eyebrow">{INSTAGRAM_HANDLE}</span>
          <h2>Follow Along on Instagram</h2>
        </Reveal>
        <Reveal delay={90}>
          <InstagramGrid />
        </Reveal>
      </section>

      {/* Service area teaser */}
      <section className="section container center">
        <Reveal>
          <h2>Wherever You Are in Jakarta, We Come to You</h2>
          <p className="lede">
            Jakarta (all areas) · Tangerang · Surrounding areas across Greater
            Jakarta
          </p>
          <Link href="/service-area" className="btn btn-ghost">
            See Service Areas &amp; Contact
          </Link>
        </Reveal>
      </section>
    </>
  );
}
