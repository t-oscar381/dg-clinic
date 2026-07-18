import "server-only";
import { findProduct, formatIdr } from "@/lib/pricing";

/*
 * Internal learning sandbox for the admin finance simulator. It never
 * calls Paper.id — it fabricates a paid invoice and receipt so the
 * team can rehearse the cart → payment → receipt flow before a real
 * Paper.id account is connected (see lib/paperid.ts).
 *
 * No real charges, no real invoices. Every artifact this produces is
 * tagged "SIMULATED" so it can never be mistaken for a live receipt.
 */

export type CartLine = { productId: string; qty: number };

export type ReceiptLine = {
  name: string;
  unitPriceIdr: number;
  qty: number;
  lineTotalIdr: number;
};

export type SimulatedReceipt = {
  receiptNo: string;
  provider: "Paper.id (Simulated)";
  status: "PAID";
  customerName: string;
  issuedAt: string;
  lines: ReceiptLine[];
  totalIdr: number;
  totalDisplay: string;
};

export class CartValidationError extends Error {}

function receiptNumber(): string {
  const now = new Date();
  const stamp = now
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DGC-SIM-${stamp}-${rand}`;
}

export function buildSimulatedReceipt(
  cart: CartLine[],
  customerName: string
): SimulatedReceipt {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new CartValidationError("Cart is empty");
  }

  const lines: ReceiptLine[] = cart.map(({ productId, qty }) => {
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      throw new CartValidationError(
        `Invalid quantity for ${productId}: must be 1-20`
      );
    }
    const product = findProduct(productId);
    if (!product) {
      throw new CartValidationError(`Unknown productId: ${productId}`);
    }
    return {
      name: product.name,
      unitPriceIdr: product.nowIdr,
      qty,
      lineTotalIdr: product.nowIdr * qty,
    };
  });

  const totalIdr = lines.reduce((sum, l) => sum + l.lineTotalIdr, 0);
  const name = customerName.trim().slice(0, 80) || "Walk-in patient";

  return {
    receiptNo: receiptNumber(),
    provider: "Paper.id (Simulated)",
    status: "PAID",
    customerName: name,
    issuedAt: new Date().toISOString(),
    lines,
    totalIdr,
    totalDisplay: formatIdr(totalIdr),
  };
}
