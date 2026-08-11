"use client";

import { useState } from "react";
import { formatIdr } from "@/lib/pricing";
import { waLink } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

export type CatalogTier = { id: string; label: string };

export type CatalogProduct = {
  id: string;
  tierId: string;
  name: string;
  desc: string;
  descId?: string;
  wasIdr?: number;
  nowIdr: number;
  saveIdr?: number;
};

/*
 * A6 — full-menu catalog with tap-to-filter tiers (docs/FEEDBACK-LOG.md
 * Round 3), replacing the old click-through-per-tier pattern. Shared by
 * Infusion Therapy and Vaccinations rather than duplicated, since both
 * are "show every SKU, filter by category" catalogs with the same card
 * shape — only the tier set, product list, and WhatsApp message differ.
 *
 * Filtering is single-select-toggle: tapping a tier narrows the grid,
 * tapping the same tier again (or "All") clears it. Reuses the existing
 * .tabs/.tab pill styling — no new filter-chip CSS needed.
 */
// "book" -> "I would like to book the X (price)."
// "ask"  -> "I would like to ask about the X (price)."
// A plain string union (not a function prop) so this stays serializable
// across the Server -> Client Component boundary — the page itself
// stays a server component.
type MessageStyle = "book" | "ask";

function buildMessage(
  product: CatalogProduct,
  locale: Locale,
  style: MessageStyle
): string {
  const price = formatIdr(product.nowIdr);
  if (locale === "id") {
    return style === "book"
      ? `Halo Denish Gunawan Clinic — saya ingin memesan ${product.name} (${price}).`
      : `Halo Denish Gunawan Clinic — saya ingin bertanya tentang ${product.name} (${price}).`;
  }
  return style === "book"
    ? `Hello Denish Gunawan Clinic — I would like to book the ${product.name} (${price}).`
    : `Hello Denish Gunawan Clinic — I would like to ask about the ${product.name} (${price}).`;
}

export default function PricedCatalog({
  tiers,
  products,
  locale = "en",
  ariaLabel,
  messageStyle = "book",
  ctaLabel,
}: {
  tiers: CatalogTier[];
  products: CatalogProduct[];
  locale?: Locale;
  ariaLabel: string;
  /** Which prefilled WhatsApp phrasing to use for every product here. */
  messageStyle?: MessageStyle;
  /** Button row label, e.g. "Book via WhatsApp" / "Pesan via WhatsApp". */
  ctaLabel: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? products.filter((p) => p.tierId === filter) : products;
  const tierLabel = (tierId: string) =>
    tiers.find((t) => t.id === tierId)?.label ?? tierId;

  return (
    <div>
      <div className="tabs" role="group" aria-label={ariaLabel}>
        <button
          type="button"
          className={`tab ${filter === null ? "is-active" : ""}`}
          onClick={() => setFilter(null)}
        >
          {locale === "id" ? "Semua" : "All"}
        </button>
        {tiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            className={`tab ${filter === tier.id ? "is-active" : ""}`}
            aria-pressed={filter === tier.id}
            onClick={() => setFilter((f) => (f === tier.id ? null : tier.id))}
          >
            {tier.label}
          </button>
        ))}
      </div>

      <div className="product-grid product-grid--catalog">
        {visible.map((product) => (
          <a
            key={product.id}
            className="product-card"
            href={waLink(buildMessage(product, locale, messageStyle))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${ctaLabel}: ${product.name}`}
          >
            <span className="product-card__rail" aria-hidden="true" />
            <span className="product-card__category">
              {tierLabel(product.tierId)}
            </span>
            <h3>{product.name}</h3>
            <p className="product-card__desc">
              {locale === "id" ? product.descId ?? product.desc : product.desc}
            </p>
            <div className="product-card__prices">
              {product.wasIdr && (
                <span className="price-was">{formatIdr(product.wasIdr)}</span>
              )}
              <span className="price-now">{formatIdr(product.nowIdr)}</span>
            </div>
            {product.saveIdr && (
              <span className="price-save">
                {locale === "id" ? "Hemat" : "Save"} {formatIdr(product.saveIdr)}
              </span>
            )}
            <div className="product-card__cta">
              <span>{ctaLabel}</span>
              <span className="product-card__arrow" aria-hidden="true">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
