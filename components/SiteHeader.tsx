"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LOGO_SRC,
  NAV_CATEGORIES,
  NAV_SECONDARY,
  SITE_NAME,
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_SRC}
            alt={SITE_NAME}
            className="header-logo"
            height={64}
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
              Products
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
          {NAV_SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
