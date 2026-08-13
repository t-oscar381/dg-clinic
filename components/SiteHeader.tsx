"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DokdenCollapse from "@/components/DokdenCollapse";
import {
  LOGO_SRC,
  NAV_CATEGORIES,
  NAV_SECONDARY,
  SITE_NAME,
  waLink,
} from "@/lib/site";
import {
  localeFromPathname,
  NAV_CATEGORY_LABELS_ID,
  toEnglishPath,
  toIndonesianPath,
  UI_STRINGS,
} from "@/lib/i18n";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const locale = localeFromPathname(pathname);
  const t = UI_STRINGS[locale];
  // Canonical (English) path, used for active-state comparisons so the
  // same logic works regardless of which locale is currently showing.
  const canonicalPath =
    locale === "id" ? toEnglishPath(pathname ?? "/") : pathname ?? "/";
  const localize = (href: string) =>
    locale === "id" ? toIndonesianPath(href) : href;

  const isCategoryPage = NAV_CATEGORIES.some(
    (item) => item.href === canonicalPath
  );

  // Blog, privacy, and lab-partners render a plain light hero (or none
  // at all), not the dark dk-hero/dk-page-hero band every other page
  // has — so there's nothing for a transparent header to blend into
  // there. Keep the header solid on those instead of going transparent
  // over a light background (Round 4 feedback; lab-partners lost its
  // dark hero in Round 3 B2's demotion to a quiet trust line).
  const path = pathname ?? "/";
  const hasHeroBand = !(
    path === "/blog" ||
    path.startsWith("/blog/") ||
    path === "/id/blog" ||
    path.startsWith("/id/blog/") ||
    path === "/privacy" ||
    path === "/id/privacy" ||
    path === "/lab-partners" ||
    path === "/id/lab-partners"
  );

  // The header is fixed (not sticky) so it can float transparently over
  // the hero photo at rest; main-content's padding-top is measured off
  // its real rendered height and hero sections pull up under it with a
  // matching negative margin (see globals.css).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`
      );
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-hiding header on scroll (Round 3 feedback — "cascade" like the
  // reference app screenshots): hides on scroll-down past the hero,
  // reappears on scroll-up or near the top. Direction-based, not a
  // shrink/collapse — simplest reading of "hides" that doesn't require
  // reworking the header's layout.
  const [hidden, setHidden] = useState(false);
  // Transparent at rest over the hero, solid the moment the page
  // scrolls at all (Round 4 feedback). Starts true — the page always
  // loads at the top.
  const [atTop, setAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      const pastHero = currentY > 120;
      setHidden(scrollingDown && pastHero);
      setAtTop(currentY <= 8);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const hoverable = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const linkClass = (englishHref: string) =>
    `header-link ${canonicalPath === englishHref ? "is-active" : ""}`.trim();

  const dispatchMessage =
    locale === "id"
      ? "Halo DOKDEN — saya ingin meminta pengiriman dokter."
      : "Hello DOKDEN — I'd like to request a doctor dispatch.";

  return (
    <>
      {/* Small breathing indicator pinned to the very top edge, mobile
          only — a quiet "still alive" pulse (Round 4 feedback). Purely
          decorative, hidden from assistive tech. */}
      <div className="haptic-pulse" aria-hidden="true" />
      <header
        ref={headerRef}
        className={`site-header ${hidden ? "is-hidden" : ""} ${
          atTop && hasHeroBand ? "is-top" : ""
        }`}
      >
        <div className="container header-inner">
        <Link
          href={localize("/")}
          className="header-brand"
          aria-label={`${SITE_NAME} — ${t.home}`}
        >
          {/* Denish Gunawan Clinic mark. SVG — next/image adds nothing here,
              so a plain img is deliberate. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={SITE_NAME}
            className="header-logo"
            height={64}
            fetchPriority="high"
          />
        </Link>
        {/* Moved out of the homepage-only hero so it's visible on every
            page (direct owner request) — also appears in the footer. */}
        <DokdenCollapse className="dokden-collapse--header" />
        <nav className="header-nav" aria-label="Main navigation">
          <Link
            href={localize("/")}
            className={linkClass("/")}
            aria-current={canonicalPath === "/" ? "page" : undefined}
          >
            {t.home}
          </Link>
          <Link
            href={localize(NAV_SECONDARY[0].href)}
            className={linkClass(NAV_SECONDARY[0].href)}
            aria-current={
              canonicalPath === NAV_SECONDARY[0].href ? "page" : undefined
            }
          >
            {t.aboutFounder}
          </Link>
          <div
            className={`nav-dropdown ${open ? "is-open" : ""}`}
            ref={dropdownRef}
            onMouseEnter={() => hoverable() && setOpen(true)}
            onMouseLeave={() => hoverable() && setOpen(false)}
          >
            <button
              type="button"
              className={`header-link nav-dropdown__btn ${
                isCategoryPage ? "is-active" : ""
              }`}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((o) => (hoverable() ? true : !o))}
            >
              {t.services}
              <svg
                className="nav-dropdown__chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 3.5 L5 6.5 L8 3.5" />
              </svg>
            </button>
            <div className="nav-dropdown__menu">
              <div className="nav-dropdown__card">
                {NAV_CATEGORIES.map((item) => (
                  <Link
                    key={item.href}
                    href={localize(item.href)}
                    className={`nav-dropdown__link ${
                      canonicalPath === item.href ? "is-active" : ""
                    }`}
                    aria-current={
                      canonicalPath === item.href ? "page" : undefined
                    }
                    onClick={() => setOpen(false)}
                  >
                    {locale === "id"
                      ? NAV_CATEGORY_LABELS_ID[item.href] ?? item.label
                      : item.label}
                  </Link>
                ))}
                {/* Mindfulness redirects out to the sister company's own
                    site rather than an internal page — Round 3 feedback. */}
                <a
                  href="https://www.mindfulnish.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-dropdown__link"
                  onClick={() => setOpen(false)}
                >
                  Mindfulness
                </a>
              </div>
            </div>
          </div>
          <Link
            href={localize(NAV_SECONDARY[1].href)}
            className={linkClass(NAV_SECONDARY[1].href)}
            aria-current={
              canonicalPath === NAV_SECONDARY[1].href ? "page" : undefined
            }
          >
            {t.labPartners}
          </Link>
          <Link
            href={localize(NAV_SECONDARY[2].href)}
            className={linkClass(NAV_SECONDARY[2].href)}
            aria-current={
              canonicalPath === NAV_SECONDARY[2].href ? "page" : undefined
            }
          >
            {t.requestConsultation}
          </Link>
          <a
            href={waLink(dispatchMessage)}
            className="btn btn-gold btn-sm header-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.doctorDispatch}
          </a>
          {/* A2 — language switcher, top right (docs/FEEDBACK-LOG.md). */}
          <div className="lang-switch" aria-label="Language">
            <Link
              href={canonicalPath}
              className={locale === "en" ? "is-active" : ""}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={toIndonesianPath(canonicalPath)}
              className={locale === "id" ? "is-active" : ""}
              aria-current={locale === "id" ? "page" : undefined}
            >
              ID
            </Link>
          </div>
        </nav>
      </div>
      </header>
    </>
  );
}
