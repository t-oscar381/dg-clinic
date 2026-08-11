"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type Panel = {
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
};

// Chips are frozen: specific treatment/tier names, and one entry
// ("Stem Cell & NK Cell") is frozen wording that must never be altered
// — see docs/HANDOFF-rebrand.md §0.3. Kept identical across locales on
// purpose, not left untranslated by oversight.
const CHIPS = {
  infusion: ["Basic", "Essential", "Signature", "Sickness Relief"],
  regenerative: ["Secretome & Exosome", "Stem Cell & NK Cell"],
  metabolic: ["Weight Loss Program", "Sleep & Focus Boosters"],
  aesthetics: [
    "Skin Booster + Exosome",
    "Natural Tersembunyi Skin Lift",
    "Hyperpigmentation",
    "Hair Growth Protocol",
  ],
};

const PANELS_EN: Panel[] = [
  {
    number: "01",
    href: "/infusion-therapy",
    image: "/images/paths-infusion.webp",
    alt: "Infusion therapy administered in a home setting",
    kicker: "Infusion Therapy",
    kickerClass: "badge-essential",
    title: "Tiered IV Wellness",
    copy: "Tiered IV wellness — from daily energy support to targeted recovery.",
    chips: CHIPS.infusion,
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
    chips: CHIPS.regenerative,
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
    chips: CHIPS.metabolic,
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
    chips: CHIPS.aesthetics,
    goLabel: "Explore Aesthetics & Hair Growth →",
  },
];

const PANELS_ID: Panel[] = [
  {
    number: "01",
    href: "/infusion-therapy",
    image: "/images/paths-infusion.webp",
    alt: "Terapi infus diberikan di rumah pasien",
    kicker: "Terapi Infus",
    kickerClass: "badge-essential",
    title: "Kesehatan IV Bertingkat",
    copy: "Kesehatan IV bertingkat — dari dukungan energi harian hingga pemulihan yang terarah.",
    chips: CHIPS.infusion,
    goLabel: "Jelajahi Terapi Infus →",
  },
  {
    number: "02",
    href: "/regenerative-therapy",
    image: "/images/paths-regenerative.webp",
    alt: "Persiapan yang cermat sebelum kunjungan terapi regeneratif",
    kicker: "Terapi Regeneratif",
    kickerClass: "badge-gold",
    title: "Perawatan Selular Lanjutan",
    copy: "Perawatan selular lanjutan untuk pemulihan dan vitalitas jangka panjang.",
    chips: CHIPS.regenerative,
    goLabel: "Jelajahi Terapi Regeneratif →",
  },
  {
    number: "03",
    href: "/metabolic-wellness",
    image: "/images/paths-metabolic.webp",
    alt: "Konsultasi dokter untuk program kesehatan metabolik",
    kicker: "Kesehatan Metabolik",
    kickerClass: "badge-signature",
    title: "Perawatan Metabolik Dipandu Dokter",
    copy: "Penurunan berat badan medis dan dukungan performa, dipandu oleh dokter.",
    chips: CHIPS.metabolic,
    goLabel: "Jelajahi Kesehatan Metabolik →",
  },
  {
    number: "04",
    href: "/aesthetics-hair-growth",
    image: "/images/paths-aesthetics.webp",
    alt: "Perawatan estetika dan pertumbuhan rambut di rumah",
    kickerClass: "badge-basic",
    kicker: "Estetika & Pertumbuhan Rambut",
    title: "Kulit & Rambut, Presisi Klinis",
    copy: "Perawatan kulit dan rambut dengan presisi klinis, di rumah Anda.",
    chips: CHIPS.aesthetics,
    goLabel: "Jelajahi Estetika & Pertumbuhan Rambut →",
  },
];

export default function FourPathsSplit({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const [active, setActive] = useState<string | null>(null);
  const panels = locale === "id" ? PANELS_ID : PANELS_EN;

  return (
    <div className="split split-4" onMouseLeave={() => setActive(null)}>
      {panels.map((panel) => (
        <Link
          key={panel.href}
          href={locale === "id" ? `/id${panel.href}` : panel.href}
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
