"use client";

import Link from "next/link";
import { useState } from "react";

type Side = "infusion" | "regen";

const PANELS: {
  side: Side;
  href: string;
  image: string;
  alt: string;
  kicker: string;
  kickerClass: string;
  title: string;
  copy: string;
  chips: string[];
  goLabel: string;
}[] = [
  {
    side: "infusion",
    href: "/infusion-therapy",
    image: "/images/infusion-drip.svg",
    alt: "Illustration of a clean IV infusion drip bag",
    kicker: "Infusion Therapy",
    kickerClass: "badge-essential",
    title: "Tiered IV Wellness",
    copy: "Tiered IV wellness — from daily energy support to targeted recovery.",
    chips: ["Basic", "Essential", "Signature", "Sickness Relief"],
    goLabel: "See Infusion Therapy →",
  },
  {
    side: "regen",
    href: "/stem-cell-weight-loss",
    image: "/images/regenerative-yoga.svg",
    alt: "Illustration of a woman meditating in yoga wear",
    kicker: "Regenerative & Advanced",
    kickerClass: "badge-gold",
    title: "Stem Cell & Weight Loss Therapy",
    copy: "Cellular recovery and weight management, delivered with medical precision.",
    chips: ["Stem Cell Therapy", "Weight Loss Therapy"],
    goLabel: "See Stem Cell & Weight Loss Therapy →",
  },
];

export default function TwoPathsSplit() {
  const [active, setActive] = useState<Side | null>(null);

  // On touch screens (no hover) the first tap selects a panel and the
  // second tap navigates; on pointer devices hover selects and click
  // navigates immediately.
  const handleClick = (side: Side) => (e: React.MouseEvent) => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (touchOnly && active !== side) {
      e.preventDefault();
      setActive(side);
    }
  };

  return (
    <div className="split" onMouseLeave={() => setActive(null)}>
      {PANELS.map((panel) => (
        <Link
          key={panel.side}
          href={panel.href}
          className={`split-panel ${active === panel.side ? "is-active" : ""}`}
          onMouseEnter={() => setActive(panel.side)}
          onFocus={() => setActive(panel.side)}
          onClick={handleClick(panel.side)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="split-img" src={panel.image} alt={panel.alt} />
          <div className="split-overlay" />
          <div className="split-content">
            <span className={`badge ${panel.kickerClass}`}>{panel.kicker}</span>
            <h3>{panel.title}</h3>
            <p className="split-copy">{panel.copy}</p>
            <div className="split-chips">
              {panel.chips.map((chip) => (
                <span className="split-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
            <span className="split-go">{panel.goLabel}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
