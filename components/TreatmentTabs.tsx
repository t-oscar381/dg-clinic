"use client";

import { useRef, useState } from "react";
import { waLink } from "@/lib/site";

export type Treatment = {
  id: string;
  tab: string;
  badge: string;
  badgeClass: string;
  name: string;
  copy: string;
  ctaLabel: string;
  ctaMessage: string;
};

export default function TreatmentTabs({
  treatments,
  ariaLabel,
  goldAccent = false,
}: {
  treatments: Treatment[];
  ariaLabel: string;
  goldAccent?: boolean;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + treatments.length) % treatments.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") focusTab(active + 1);
    else if (e.key === "ArrowLeft") focusTab(active - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(treatments.length - 1);
    else return;
    e.preventDefault();
  };

  const current = treatments[active];

  return (
    <div>
      <div className="tabs" role="tablist" aria-label={ariaLabel}>
        {treatments.map((treatment, i) => (
          <button
            key={treatment.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className={`tab ${i === active ? "is-active" : ""}`}
            role="tab"
            id={`tab-${treatment.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${treatment.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={handleKeyDown}
          >
            {treatment.tab}
          </button>
        ))}
      </div>
      <div
        className={`card tab-panel ${goldAccent ? "card-gold" : ""}`}
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
      >
        <span className={`badge ${current.badgeClass}`}>{current.badge}</span>
        <h3>{current.name}</h3>
        <p>{current.copy}</p>
        <a
          className="card-link"
          href={waLink(current.ctaMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {current.ctaLabel}
        </a>
      </div>
    </div>
  );
}
