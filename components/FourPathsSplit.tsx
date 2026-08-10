"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PANELS: {
  number: string;
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
    number: "01",
    href: "/infusion-therapy",
    image: "/images/paths-infusion.webp",
    alt: "Infusion therapy administered in a home setting",
    kicker: "Infusion Therapy",
    kickerClass: "badge-essential",
    title: "Tiered IV Wellness",
    copy: "Tiered IV wellness — from daily energy support to targeted recovery.",
    chips: ["Basic", "Essential", "Signature", "Sickness Relief"],
    goLabel: "Explore Infusion Therapy →",
  },
  {
    number: "02",
    href: "/regenerative-therapy",
    image: "/images/paths-regenerative.webp",
    alt: "Careful preparation ahead of a regenerative therapy visit",
    kicker: "Regenerative Therapy",
    kickerClass: "badge-gold",
    title: "Advanced Cellular Treatment",
    copy: "Advanced cellular treatment for recovery and long-term vitality.",
    // "Stem Cell & NK Cell" is frozen wording, not new copy — see
    // docs/HANDOFF-rebrand.md §0.3. Do not remove or duplicate elsewhere.
    chips: ["Secretome & Exosome", "Stem Cell & NK Cell"],
    goLabel: "Explore Regenerative Therapy →",
  },
  {
    number: "03",
    href: "/metabolic-wellness",
    image: "/images/paths-metabolic.webp",
    alt: "Doctor consultation for a metabolic wellness plan",
    kicker: "Metabolic Wellness",
    kickerClass: "badge-signature",
    title: "Doctor-Guided Metabolic Care",
    copy: "Medical weight loss and performance support, guided by doctors.",
    chips: ["Weight Loss Program", "Sleep & Focus Boosters"],
    goLabel: "Explore Metabolic Wellness →",
  },
  {
    number: "04",
    href: "/aesthetics-hair-growth",
    image: "/images/paths-aesthetics.webp",
    alt: "Aesthetics and hair growth treatment, at-home setting",
    kickerClass: "badge-basic",
    kicker: "Aesthetics & Hair Growth",
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

  return (
    <div className="split split-4" onMouseLeave={() => setActive(null)}>
      {PANELS.map((panel) => (
        <Link
          key={panel.href}
          href={panel.href}
          className={`split-panel ${active === panel.href ? "is-active" : ""}`}
          onMouseEnter={() => setActive(panel.href)}
          onFocus={() => setActive(panel.href)}
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
            <span className="split-number">{panel.number}</span>
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
