/*
 * Single source of truth for published treatment prices (IDR).
 * The website menu and the payment framework both read from here so
 * displayed prices and invoiced amounts can never drift apart.
 *
 * Infusion Therapy and Vaccinations are the only categories with
 * published prices — Vaccinations added per Tommy's direct instruction
 * (Round 3 feedback) with the official price sheet as the source; this
 * is an explicit, owner-authorized exception to the general "no new
 * prices" rule, not a default to repeat for other categories without
 * the same sign-off. All other categories stay quoted individually via
 * WhatsApp.
 */

export type TierId = "basic" | "essential" | "signature" | "sickness";

export type PricedProduct = {
  id: string;
  tierId: TierId;
  name: string;
  desc: string;
  // Indonesian description (A2, docs/FEEDBACK-LOG.md) — product names
  // stay in English (brand names, same pattern as "Gold Booster"
  // already mixing English into the name itself). Prices never change
  // by locale — see lib/pricing.ts header comment.
  descId: string;
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
    descId: "Meningkatkan energi harian, mengurangi kelelahan",
    wasIdr: 550_000,
    nowIdr: 450_000,
    saveIdr: 100_000,
  },
  {
    id: "silver-booster",
    tierId: "essential",
    name: "Silver Booster (IV)",
    desc: "Daily energy, immune health",
    descId: "Energi harian, kesehatan imun",
    wasIdr: 900_000,
    nowIdr: 750_000,
    saveIdr: 150_000,
  },
  {
    id: "gold-booster",
    tierId: "essential",
    name: "Gold Booster (IV)",
    desc: "Stable energy, stronger recovery",
    descId: "Energi stabil, pemulihan lebih optimal",
    wasIdr: 1_000_000,
    nowIdr: 850_000,
    saveIdr: 150_000,
  },
  {
    id: "diamond-booster",
    tierId: "signature",
    name: "Diamond Booster (IV)",
    desc: "Cellular resilience, stable energy",
    descId: "Ketahanan sel, energi stabil",
    wasIdr: 1_400_000,
    nowIdr: 1_150_000,
    saveIdr: 250_000,
  },
  {
    id: "bye-lergy",
    tierId: "sickness",
    name: "Bye-Lergy",
    desc: "Eases allergy symptoms",
    descId: "Meredakan gejala alergi",
    wasIdr: 250_000,
    nowIdr: 200_000,
    saveIdr: 50_000,
  },
  {
    id: "fever-away",
    tierId: "sickness",
    name: "Fever Away",
    desc: "Lowers fever safely",
    descId: "Menurunkan demam dengan aman",
    wasIdr: 250_000,
    nowIdr: 200_000,
    saveIdr: 50_000,
  },
  {
    id: "rehydrate",
    tierId: "sickness",
    name: "Rehydrate",
    desc: "Replenishes fluids and electrolytes",
    descId: "Mengembalikan cairan dan elektrolit tubuh",
    wasIdr: 650_000,
    nowIdr: 500_000,
    saveIdr: 150_000,
  },
  {
    id: "anti-gerd",
    tierId: "sickness",
    name: "Anti Gerd",
    desc: "Alleviates acid reflux and nausea",
    descId: "Meredakan asam lambung dan mual",
    wasIdr: 750_000,
    nowIdr: 600_000,
    saveIdr: 150_000,
  },
];

// --- Vaccinations --------------------------------------------------------
// Source: official DG Clinic vaccine price sheet (Round 3 attachment).
// In-clinic prices only; consultation and home-service fees are quoted
// separately, same as the sheet's own footer note.

export type VaccineGroupId = "a-h" | "i-p" | "q-z";

// Purely an alphabetical index so a 29-SKU list is browsable — like a
// contacts list, not a clinical grouping. Do not read "which group a
// vaccine sits in" as any kind of medical categorization.
export const VACCINE_GROUPS: { id: VaccineGroupId; label: string }[] = [
  { id: "a-h", label: "A–H" },
  { id: "i-p", label: "I–P" },
  { id: "q-z", label: "Q–Z" },
];

export type VaccineProduct = {
  id: string;
  tierId: VaccineGroupId;
  name: string;
  desc: string; // brand name, e.g. "Varivax" — same in both locales
  nowIdr: number;
};

export const VACCINES: VaccineProduct[] = [
  { id: "chickenpox", tierId: "a-h", name: "Chickenpox", desc: "Varivax", nowIdr: 890_000 },
  { id: "dbd", tierId: "a-h", name: "DBD", desc: "Qdenga", nowIdr: 780_000 },
  { id: "dtap", tierId: "a-h", name: "DTaP", desc: "Adacel", nowIdr: 680_000 },
  { id: "dtap-ipv", tierId: "a-h", name: "Dtap + IPV", desc: "Tetraxim", nowIdr: 680_000 },
  { id: "dtap-ipv-hib-hepb", tierId: "a-h", name: "DTaP + IPV + HiB + Hep B", desc: "Hexaxim", nowIdr: 1_020_000 },
  { id: "hep-a-adult", tierId: "a-h", name: "Hep A Adult", desc: "Avaxim 160U Adult", nowIdr: 690_000 },
  { id: "hep-a-junior", tierId: "a-h", name: "Hep A Junior", desc: "Avaxim 80U Pediatric", nowIdr: 620_000 },
  { id: "hep-b-adult", tierId: "a-h", name: "Hep B Adult", desc: "Euvax B Adult", nowIdr: 460_000 },
  { id: "hep-b-baby", tierId: "a-h", name: "Hep B Baby", desc: "Euvax B Ped", nowIdr: 390_000 },
  { id: "herpes-zoster", tierId: "a-h", name: "Herpes Zoster", desc: "Shingrix", nowIdr: 2_900_000 },
  { id: "hfmd", tierId: "i-p", name: "HFMD", desc: "Inlive", nowIdr: 1_150_000 },
  { id: "hpv-nonavalent", tierId: "i-p", name: "HPV Nonavalent", desc: "Gardasil 9", nowIdr: 2_400_000 },
  { id: "hpv-quadrivalent", tierId: "i-p", name: "HPV Quadrivalent", desc: "Gardasil 4", nowIdr: 1_400_000 },
  { id: "influenza-quadrivalent", tierId: "i-p", name: "Influenza Quadrivalent", desc: "Vaxigrip Tetra", nowIdr: 480_000 },
  { id: "japanese-encephalitis", tierId: "i-p", name: "Japanese Encephalitis", desc: "Imojev", nowIdr: 690_000 },
  { id: "meningococcal-conjugate-menquadfi", tierId: "i-p", name: "Meningococcal Conjugate", desc: "Menquadfi", nowIdr: 1_050_000 },
  { id: "meningococcal-conjugate-menactra", tierId: "i-p", name: "Meningococcal Conjugate", desc: "Menactra", nowIdr: 870_000 },
  { id: "meningococcal-polysaccharide", tierId: "i-p", name: "Meningococcal Polysaccharide", desc: "Menivax", nowIdr: 440_000 },
  { id: "mmr", tierId: "i-p", name: "MMR", desc: "MMR-II", nowIdr: 730_000 },
  { id: "pcv-15", tierId: "i-p", name: "PCV 15", desc: "Vaxneuvance", nowIdr: 1_150_000 },
  { id: "pcv-20", tierId: "i-p", name: "PCV 20", desc: "Prevenar 20", nowIdr: 1_200_000 },
  { id: "ppsv-23", tierId: "i-p", name: "PPSV 23", desc: "Pneumovax 23", nowIdr: 1_000_000 },
  { id: "rabies", tierId: "q-z", name: "Rabies", desc: "Verorab", nowIdr: 850_000 },
  { id: "rotavirus-monovalent", tierId: "q-z", name: "Rotavirus Monovalent", desc: "Rotarix", nowIdr: 640_000 },
  { id: "rotavirus-pentavalent", tierId: "q-z", name: "Rotavirus Pentavalent", desc: "Rotateq", nowIdr: 600_000 },
  { id: "rsv-over-60", tierId: "q-z", name: "RSV >60 yo", desc: "Arexyv", nowIdr: 3_500_000 },
  { id: "rsv-18-60", tierId: "q-z", name: "RSV 18-60 yo", desc: "Abrysvo", nowIdr: 3_600_000 },
  { id: "typhoid", tierId: "q-z", name: "Typhoid", desc: "Typhim Vi", nowIdr: 570_000 },
  { id: "yellow-fever", tierId: "q-z", name: "Yellow Fever", desc: "Stamaril Pasteur", nowIdr: 700_000 },
];

export const findProduct = (id: string) =>
  INFUSION_PRODUCTS.find((p) => p.id === id);

export const formatIdr = (amount: number) =>
  `Rp ${amount.toLocaleString("id-ID")}`;
