"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PANELS: {
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
    href: "/infusion-therapy",
    image: "/images/infusion-drip.svg",
    alt: "Illustration of a clean IV infusion drip bag",
    kicker: "Infusion Therapy",
    kickerClass: "badge-essential",
    title: "Tiered IV Wellness",
    copy: "Tiered IV wellness — from daily energy support to targeted recovery.",
    chips: ["Basic", "Essential", "Signature", "Sickness Relief"],
    goLabel: "Explore Infusion Therapy →",
  },
  {
    href: "/regenerative-therapy",
    image: "/images/regenerative-yoga.svg",
    alt: "Illustration of a woman meditating in yoga wear",
    kicker: "Regenerative Therapy",
    kickerClass: "badge-gold",
    title: "Advanced Cellular Treatment",
    copy: "Advanced cellular treatment for recovery and long-term vitality.",
    chips: ["Secretome & Exosome", "Stem Cell & NK Cell"],
    goLabel: "Explore Regenerative Therapy →",
  },
  {
    href: "/metabolic-wellness",
    image: "/images/infusion-drip.svg",
    alt: "Illustration of a clean IV infusion drip bag",
    kicker: "Metabolic Wellness",
    kickerClass: "badge-signature",
    title: "Doctor-Guided Metabolic Care",
    copy: "Medical weight loss and performance support, guided by doctors.",
    chips: ["Weight Loss Program", "Sleep & Focus Boosters"],
    goLabel: "Explore Metabolic Wellness →",
  },
  {
    href: "/aesthetics-hair-growth",
    image: "/images/regenerative-yoga.svg",
    alt: "Illustration of a woman meditating in yoga wear",
    kicker: "Aesthetics & Hair Growth",
    kickerClass: "badge-basic",
    title: "Skin & Hair, Clinical Precision",
    copy: "Skin and hair treatment with clinical precision, at home.",
    chips: [
      "Skin Booster + Exosome",
      "Natural Tersembunyi Skin Lift",
      "Hyperpigmentation",
      "Hair Growth Protocol",
    ],
    goLabel: "Explore Aesthetics & Hair Growth →",
  },
];

export default function FourPathsSplit() {
  const [active, setActive] = useState<string | null>(null);

  // On touch screens (no hover) the first tap selects a panel and the
  // second tap navigates; on pointer devices hover selects and click
  // navigates immediately.
  const handleClick = (href: string) => (e: React.MouseEvent) => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (touchOnly && active !== href) {
      e.preventDefault();
      setActive(href);
    }
  };

  return (
    <div className="split split-4" onMouseLeave={() => setActive(null)}>
      {PANELS.map((panel) => (
        <Link
          key={panel.href}
          href={panel.href}
          className={`split-panel ${active === panel.href ? "is-active" : ""}`}
          onMouseEnter={() => setActive(panel.href)}
          onFocus={() => setActive(panel.href)}
          onClick={handleClick(panel.href)}
        >
          <Image
            className="split-img"
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
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
