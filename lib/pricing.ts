/*
 * Single source of truth for published treatment prices (IDR).
 * The website menu and the payment framework both read from here so
 * displayed prices and invoiced amounts can never drift apart.
 *
 * Only Infusion Therapy prices are published. Other categories are
 * quoted individually via WhatsApp, so they have no entries here.
 */

export type TierId = "basic" | "essential" | "signature" | "sickness";

export type PricedProduct = {
  id: string;
  tierId: TierId;
  name: string;
  desc: string;
  wasIdr: number;
  nowIdr: number;
  saveIdr: number;
};

export const INFUSION_TIERS: { id: TierId; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "essential", label: "Essential" },
  { id: "signature", label: "Signature" },
  { id: "sickness", label: "Sickness Relief" },
];

export const INFUSION_PRODUCTS: PricedProduct[] = [
  {
    id: "vitamin-bc",
    tierId: "basic",
    name: "Vitamin B&C (IV)",
    desc: "Boost daily energy, reduce fatigue",
    wasIdr: 550_000,
    nowIdr: 450_000,
    saveIdr: 100_000,
  },
  {
    id: "silver-booster",
    tierId: "essential",
    name: "Silver Booster (IV)",
    desc: "Daily energy, immune health",
    wasIdr: 900_000,
    nowIdr: 750_000,
    saveIdr: 150_000,
  },
  {
    id: "gold-booster",
    tierId: "essential",
    name: "Gold Booster (IV)",
    desc: "Stable energy, stronger recovery",
    wasIdr: 1_000_000,
    nowIdr: 850_000,
    saveIdr: 150_000,
  },
  {
    id: "diamond-booster",
    tierId: "signature",
    name: "Diamond Booster (IV)",
    desc: "Cellular resilience, stable energy",
    wasIdr: 1_400_000,
    nowIdr: 1_150_000,
    saveIdr: 250_000,
  },
  {
    id: "bye-lergy",
    tierId: "sickness",
    name: "Bye-Lergy",
    desc: "Eases allergy symptoms",
    wasIdr: 250_000,
    nowIdr: 200_000,
    saveIdr: 50_000,
  },
  {
    id: "fever-away",
    tierId: "sickness",
    name: "Fever Away",
    desc: "Lowers fever safely",
    wasIdr: 250_000,
    nowIdr: 200_000,
    saveIdr: 50_000,
  },
  {
    id: "rehydrate",
    tierId: "sickness",
    name: "Rehydrate",
    desc: "Replenishes fluids and electrolytes",
    wasIdr: 650_000,
    nowIdr: 500_000,
    saveIdr: 150_000,
  },
  {
    id: "anti-gerd",
    tierId: "sickness",
    name: "Anti Gerd",
    desc: "Alleviates acid reflux and nausea",
    wasIdr: 750_000,
    nowIdr: 600_000,
    saveIdr: 150_000,
  },
];

export const findProduct = (id: string) =>
  INFUSION_PRODUCTS.find((p) => p.id === id);

export const formatIdr = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`;
