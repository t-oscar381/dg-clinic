import Link from "next/link";
import LocationMap from "@/components/LocationMap";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOGO_SRC,
  NAV_ITEMS,
  SITE_NAME,
  TAGLINE,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={SITE_NAME}
            className="footer-logo"
            height={88}
            loading="lazy"
          />
          <p className="footer-tagline">{TAGLINE}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="footer-heading">Explore</p>
          <Link href="/" className="footer-link">
            Home
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer-map">
          <p className="footer-heading">Find Us</p>
          <LocationMap compact />
        </div>

        <div className="footer-contact">
          <p className="footer-heading">Contact</p>
          <a
            href={WHATSAPP_URL}
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a
            href={INSTAGRAM_URL}
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <p>
          <Link href="/privacy" className="footer-sister">
            Privacy Policy
          </Link>
        </p>
        <p>
          Our sister company:{" "}
          <a
            href="https://mindfulnish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-sister"
          >
            Mindfulnish
          </a>
        </p>
        <p>Full pricing and quotes are shared via WhatsApp.</p>
      </div>
    </footer>
  );
}
