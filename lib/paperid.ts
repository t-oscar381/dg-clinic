import "server-only";

/*
 * Server-side client shape for the Paper.id API — not yet wired to a
 * real account. Paper.id is the intended financial/invoicing partner
 * (per Tommy's direction); this file mirrors lib/xendit.ts's shape so
 * swapping in real credentials later is a drop-in change, not a
 * rewrite.
 *
 * Until PAPERID_API_KEY is set, callers should use
 * lib/finance-simulator.ts instead, which fabricates a receipt for
 * internal learning/demo purposes and never calls out to Paper.id.
 *
 * Docs (for future integration): https://developers.paper.id
 */

export type PaperIdInvoice = {
  id: string;
  reference_id: string;
  status: "PENDING" | "PAID" | "EXPIRED";
  amount: number;
  currency: string;
  payment_url: string;
};

export type CreatePaperIdInvoiceInput = {
  referenceId: string;
  amountIdr: number;
  description: string;
  customerName?: string;
};

function apiKey(): string {
  const key = process.env.PAPERID_API_KEY;
  if (!key) {
    throw new Error(
      "PAPERID_API_KEY is not configured — Paper.id is not yet connected"
    );
  }
  return key;
}

export async function createPaperIdInvoice(
  _input: CreatePaperIdInvoiceInput
): Promise<PaperIdInvoice> {
  // Not implemented: no Paper.id account/credentials exist yet. This
  // throws deliberately so it's never called by mistake in place of
  // the simulator.
  apiKey();
  throw new Error(
    "Paper.id integration is not implemented yet — use lib/finance-simulator.ts for demos"
  );
}
