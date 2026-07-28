"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dgc-master", label: "Overview", icon: IconGrid },
  { href: "/dgc-master/content", label: "Site Content", icon: IconFile },
  { href: "/dgc-master/posts", label: "Blog / News", icon: IconEdit },
  { href: "/dgc-master/records", label: "Patient Records", icon: IconTable },
  { href: "/dgc-master/knowledge", label: "Knowledge Bank", icon: IconBook },
] as const;

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-sidebar__nav" aria-label="Admin sections">
      {TABS.map(({ href, label, icon: Icon }) => {
        // Overview ("/dgc-master") must match exactly — every other route
        // starts with its href, so a prefix check alone would keep it lit.
        const isActive =
          href === "/dgc-master" ? pathname === href : pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`admin-sidebar__link${isActive ? " is-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* Minimal 20x20 stroke icons, one visual language, no icon library. */

function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6.5" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconFile() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 2.8h6.2L15 6.6v10.6a.7.7 0 0 1-.7.7H5a.7.7 0 0 1-.7-.7V3.5a.7.7 0 0 1 .7-.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M11.2 2.8V6.6H15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.3 10.4h6.4M6.3 13h6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M12.1 3.3 16.7 7.9 7.1 17.5 2.5 18l.5-4.6 9.1-10.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10.9 4.6 15.4 9.1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconTable() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="3.5" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8h15M7.5 8v8.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 4.2c1.9-.9 4-1 5.9 0v11.6c-1.9-1-4-.9-5.9 0V4.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 4.2c-1.9-.9-4-1-5.9 0v11.6c1.9-1 4-.9 5.9 0V4.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
