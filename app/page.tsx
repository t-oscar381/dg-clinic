import Image from "next/image";
import Link from "next/link";
import FourPathsSplit from "@/components/FourPathsSplit";
import InstagramGrid from "@/components/InstagramGrid";
import Reveal from "@/components/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteContent, pick } from "@/lib/cms";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink } from "@/lib/site";

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
            <span>Doctor-Only Dispatch</span>
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
                regenerative care, DG Clinic brings the right treatment to
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

      {/* Why DG Clinic — restyled to the DOKDEN dark band, content unchanged
          per docs/HANDOFF-rebrand.md §3, §5 stage 5. */}
      <section className="navy-block dk-slate-block">
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

      {/* Instagram grid — live feed from @dg.clinic.hnw, with a mandatory
          static fallback. See docs/HANDOFF-instagram-feed.md. */}
      <section className="section container center">
        <Reveal>
          {/* Layer 4 of the failsafe (§4.1): the section heading itself
              links out, so there's always one working route to the
              account even if every tile below is degraded. */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow"
          >
            {INSTAGRAM_HANDLE}
          </a>
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
