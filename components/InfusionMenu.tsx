"use client";

import { useRef, useState } from "react";
import { waLink } from "@/lib/site";

type Product = {
  name: string;
  desc: string;
  was: string;
  now: string;
  save: string;
};

type Tier = {
  id: string;
  tab: string;
  products: Product[];
};

const TIERS: Tier[] = [
  {
    id: "basic",
    tab: "Basic",
    products: [
      {
        name: "Vitamin B&C (IV)",
        desc: "Boost daily energy, reduce fatigue",
        was: "Rp 550.000",
        now: "Rp 450.000",
        save: "Rp 100.000",
      },
    ],
  },
  {
    id: "essential",
    tab: "Essential",
    products: [
      {
        name: "Silver Booster (IV)",
        desc: "Daily energy, immune health",
        was: "Rp 900.000",
        now: "Rp 750.000",
        save: "Rp 150.000",
      },
      {
        name: "Gold Booster (IV)",
        desc: "Stable energy, stronger recovery",
        was: "Rp 1.000.000",
        now: "Rp 850.000",
        save: "Rp 150.000",
      },
    ],
  },
  {
    id: "signature",
    tab: "Signature",
    products: [
      {
        name: "Diamond Booster (IV)",
        desc: "Cellular resilience, stable energy",
        was: "Rp 1.400.000",
        now: "Rp 1.150.000",
        save: "Rp 250.000",
      },
    ],
  },
  {
    id: "sickness",
    tab: "Sickness Relief",
    products: [
      {
        name: "Bye-Lergy",
        desc: "Eases allergy symptoms",
        was: "Rp 250.000",
        now: "Rp 200.000",
        save: "Rp 50.000",
      },
      {
        name: "Fever Away",
        desc: "Lowers fever safely",
        was: "Rp 250.000",
        now: "Rp 200.000",
        save: "Rp 50.000",
      },
      {
        name: "Rehydrate",
        desc: "Replenishes fluids and electrolytes",
        was: "Rp 650.000",
        now: "Rp 500.000",
        save: "Rp 150.000",
      },
      {
        name: "Anti Gerd",
        desc: "Alleviates acid reflux and nausea",
        was: "Rp 750.000",
        now: "Rp 600.000",
        save: "Rp 150.000",
      },
    ],
  },
];

export default function InfusionMenu() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + TIERS.length) % TIERS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") focusTab(active + 1);
    else if (e.key === "ArrowLeft") focusTab(active - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(TIERS.length - 1);
    else return;
    e.preventDefault();
  };

  const tier = TIERS[active];

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Infusion therapy tiers">
        {TIERS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className={`tab ${i === active ? "is-active" : ""}`}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={handleKeyDown}
          >
            {t.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tier.id}`}
        aria-labelledby={`tab-${tier.id}`}
      >
        <div
          className={`product-grid ${
            tier.products.length === 1 ? "is-single" : ""
          }`}
        >
          {tier.products.map((product) => (
            <a
              key={product.name}
              className="product-card"
              href={waLink(
                `Hello DG Clinic — I would like to book the ${product.name} (${product.now}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book the ${product.name} on WhatsApp`}
            >
              <span className="product-card__rail" aria-hidden="true" />
              <span className="product-card__category">{tier.tab}</span>
              <h3>{product.name}</h3>
              <p className="product-card__desc">{product.desc}</p>
              <div className="product-card__prices">
                <span className="price-was">{product.was}</span>
                <span className="price-now">{product.now}</span>
              </div>
              <span className="price-save">Hemat {product.save}</span>
              <div className="product-card__cta">
                <span>Book via WhatsApp</span>
                <span className="product-card__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
