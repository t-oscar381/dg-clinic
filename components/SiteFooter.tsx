"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  WORDMARK,
} from "@/lib/site";
import {
  localeFromPathname,
  NAV_CATEGORY_LABELS_ID,
  toIndonesianPath,
  UI_STRINGS,
} from "@/lib/i18n";

// Maps NAV_SECONDARY hrefs to their UI_STRINGS key — Blog isn't here on
// purpose: there's no /id/blog, so its footer link always stays English
// and unprefixed, same as the /blog route itself.
const SECONDARY_LABEL_KEYS: Record<string, keyof (typeof UI_STRINGS)["en"]> = {
  "/our-story": "aboutFounder",
  "/lab-partners": "labPartners",
  "/service-area": "requestConsultation",
};

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = UI_STRINGS[locale];
  const localize = (href: string) =>
    locale === "id" ? toIndonesianPath(href) : href;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Image
            src={LOGO_SRC}
            alt={SITE_NAME}
            className="footer-logo"
            width={171}
            height={88}
            loading="lazy"
          />
          <p className="footer-tagline">{TAGLINE}</p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="footer-heading">{t.explore}</p>
          <Link href={localize("/")} className="footer-link">
            {t.home}
          </Link>
          {NAV_ITEMS.map((item) => {
            const categoryLabel = NAV_CATEGORY_LABELS_ID[item.href];
            const secondaryKey = SECONDARY_LABEL_KEYS[item.href];
            const isTranslated = Boolean(categoryLabel || secondaryKey);
            const label =
              locale === "id"
                ? categoryLabel ?? (secondaryKey ? t[secondaryKey] : item.label)
                : item.label;
            const href = isTranslated ? localize(item.href) : item.href;
            return (
              <Link key={item.href} href={href} className="footer-link">
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="footer-map">
          <p className="footer-heading">{t.findUs}</p>
          <LocationMap compact />
        </div>

        <div className="footer-contact">
          <p className="footer-heading">{t.contact}</p>
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
          © {new Date().getFullYear()} {SITE_NAME}. {t.allRightsReserved}
        </p>
        <p>
          <Link href="/privacy" className="footer-sister">
            {t.privacyPolicy}
          </Link>
        </p>
        <p>
          {t.sisterCompany}{" "}
          <a
            href="https://mindfulnish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-sister"
          >
            Mindfulnish
          </a>
        </p>
        <p>{t.pricingNote}</p>
        {/* DOKDEN is the website wordmark only — not a legal or entity name.
            See docs/HANDOFF-rebrand.md §0.1. */}
        <span className="footer-wordmark" aria-hidden="true">
          {WORDMARK}
        </span>
      </div>
    </footer>
  );
}
