"use client";

import { useEffect, useState } from "react";

/*
 * DOKDEN wordmark, Option 1 (docs/FEEDBACK-LOG.md Round 3, B6): collapses
 * "DOKDEN" to "DOK" and back, on a loop. "Dok" is how Indonesians address
 * a doctor, so the animation moves from the formal wordmark to how a
 * patient actually speaks.
 *
 * Transform + opacity only, one class toggled on an interval — no width/
 * layout animation. Hero/loading-state placement only, never the header
 * (see the doc for why).
 */
const HOLD_MS = 2100;

export default function DokdenCollapse() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCollapsed((c) => !c), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="dokden-collapse" aria-hidden="true">
      <span className="dokden-collapse__fixed">DOK</span>
      <span
        className={`dokden-collapse__fade ${collapsed ? "is-collapsed" : ""}`}
      >
        DEN
      </span>
    </span>
  );
}
