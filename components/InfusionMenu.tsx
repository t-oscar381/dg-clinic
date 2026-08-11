"use client";

import { useRef, useState } from "react";
import {
  formatIdr,
  INFUSION_PRODUCTS,
  INFUSION_TIERS,
} from "@/lib/pricing";
import { waLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export default function InfusionMenu({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + INFUSION_TIERS.length) % INFUSION_TIERS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") focusTab(active + 1);
    else if (e.key === "ArrowLeft") focusTab(active - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(INFUSION_TIERS.length - 1);
    else return;
    e.preventDefault();
  };

  const tier = INFUSION_TIERS[active];
  const products = INFUSION_PRODUCTS.filter((p) => p.tierId === tier.id);

  return (
    <div>
      <div
        className="tabs"
        role="tablist"
        aria-label={locale === "id" ? "Tingkatan terapi infus" : "Infusion therapy tiers"}
      >
        {INFUSION_TIERS.map((t, i) => (
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
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tier.id}`}
        aria-labelledby={`tab-${tier.id}`}
      >
        <div
          className={`product-grid ${products.length === 1 ? "is-single" : ""}`}
        >
          {products.map((product) => (
            <a
              key={product.id}
              className="product-card"
              href={waLink(
                locale === "id"
                  ? `Halo DG Clinic — saya ingin memesan ${product.name} (${formatIdr(
                      product.nowIdr
                    )}).`
                  : `Hello DG Clinic — I would like to book the ${product.name} (${formatIdr(
                      product.nowIdr
                    )}).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                locale === "id"
                  ? `Pesan ${product.name} via WhatsApp`
                  : `Book the ${product.name} on WhatsApp`
              }
            >
              <span className="product-card__rail" aria-hidden="true" />
              <span className="product-card__category">{tier.label}</span>
              <h3>{product.name}</h3>
              <p className="product-card__desc">
                {locale === "id" ? product.descId : product.desc}
              </p>
              <div className="product-card__prices">
                <span className="price-was">{formatIdr(product.wasIdr)}</span>
                <span className="price-now">{formatIdr(product.nowIdr)}</span>
              </div>
              <span className="price-save">
                Hemat {formatIdr(product.saveIdr)}
              </span>
              <div className="product-card__cta">
                <span>{locale === "id" ? "Pesan via WhatsApp" : "Book via WhatsApp"}</span>
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
