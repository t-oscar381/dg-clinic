"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LOGO_SRC,
  NAV_CATEGORIES,
  NAV_SECONDARY,
  SITE_NAME,
  waLink,
} from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isCategoryPage = NAV_CATEGORIES.some((item) => item.href === pathname);

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

  const linkClass = (href: string) =>
    `header-link ${pathname === href ? "is-active" : ""}`.trim();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="header-brand" aria-label={`${SITE_NAME} — Home`}>
          {/* Denish Gunawan Clinic mark. SVG — next/image adds nothing here,
              so a plain img is deliberate. DOKDEN wordmark lives in the
              footer bottom-right. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={SITE_NAME}
            className="header-logo"
            height={64}
            fetchPriority="high"
          />
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={linkClass("/")}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href={NAV_SECONDARY[0].href}
            className={linkClass(NAV_SECONDARY[0].href)}
            aria-current={pathname === NAV_SECONDARY[0].href ? "page" : undefined}
          >
            {NAV_SECONDARY[0].label}
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
              Services
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
                    href={item.href}
                    className={`nav-dropdown__link ${
                      pathname === item.href ? "is-active" : ""
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href={NAV_SECONDARY[1].href}
            className={linkClass(NAV_SECONDARY[1].href)}
            aria-current={pathname === NAV_SECONDARY[1].href ? "page" : undefined}
          >
            {NAV_SECONDARY[1].label}
          </Link>
          <Link
            href="/hnw-concierge"
            className={linkClass("/hnw-concierge")}
            aria-current={pathname === "/hnw-concierge" ? "page" : undefined}
          >
            HNW Concierge
          </Link>
          <Link
            href={NAV_SECONDARY[2].href}
            className={linkClass(NAV_SECONDARY[2].href)}
            aria-current={pathname === NAV_SECONDARY[2].href ? "page" : undefined}
          >
            {NAV_SECONDARY[2].label}
          </Link>
          <a
            href={waLink("Hello DOKDEN — I'd like to request a doctor dispatch.")}
            className="btn btn-gold btn-sm header-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Doctor Dispatch
          </a>
        </nav>
      </div>
    </header>
  );
}
