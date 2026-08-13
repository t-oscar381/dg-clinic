"use client";

import { useEffect, useState } from "react";

/*
 * DOKDEN wordmark, Option 1 (docs/FEEDBACK-LOG.md Round 3, B6): collapses
 * "DOKDEN" to "DOK" and back, on a loop. "Dok" is how Indonesians address
 * a doctor, so the animation moves from the formal wordmark to how a
 * patient actually speaks.
 *
 * Transform + opacity only, one class toggled on an interval — no width/
 * layout animation. Now used in both the header and footer (moved out of
 * the homepage-only hero per direct owner request, so it's visible on
 * every page) — `className` lets each placement supply its own color/size
 * via a modifier class (see app/globals.css).
 */
const HOLD_MS = 2100;

export default function DokdenCollapse({
  className = "",
}: {
  className?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCollapsed((c) => !c), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`dokden-collapse ${className}`.trim()} aria-hidden="true">
      <span className="dokden-collapse__fixed">DOK</span>
      <span
        className={`dokden-collapse__fade ${collapsed ? "is-collapsed" : ""}`}
      >
        DEN
      </span>
    </span>
  );
}
