"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";
import CursorRing from "@/components/CursorRing";

/**
 * Decides whether the PUBLIC marketing chrome (nav, footer, WhatsApp/
 * Instagram bubbles, cursor effect) wraps a page. The admin tool at
 * /dgc-master is a separate internal app — it gets its own shell
 * (see the dashboard layout) and must never inherit customer-facing
 * navigation, a floating WhatsApp bubble, or decorative cursor effects.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/dgc-master") ?? false;

  if (isAdmin) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <FloatingActions />
      <CursorRing />
    </>
  );
}
