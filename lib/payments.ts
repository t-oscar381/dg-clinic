import "server-only";
import { findProduct, formatIdr } from "@/lib/pricing";
import { createInvoice, type XenditInvoice } from "@/lib/xendit";

/*
 * Payment framework — Xendit, payment-link model.
 *
 * Flow: the patient agrees on a treatment in WhatsApp, our team creates
 * a payment link (Xendit invoice) through the internal API route, and
 * sends the link back in the chat. There is no public checkout; the
 * website conversion path stays WhatsApp-first.
 *
 * Everything is behind PAYMENTS_ENABLED so the framework can ship
 * inert and be switched on per environment when keys are configured.
 */

export const paymentsEnabled = () => process.env.PAYMENTS_ENABLED === "true";

/** Minimum invoice amount we accept (Xendit's own floor is Rp 10.000). */
export const MIN_INVOICE_IDR = 10_000;
export const MAX_INVOICE_IDR = 200_000_000;

export type PaymentLinkRequest = {
  /** A published catalogue product (infusion tiers). */
  treatmentId?: string;
  /**
   * Custom amount in IDR for individually quoted treatments
   * (regenerative, metabolic, aesthetics). Requires `description`.
   */
  amountIdr?: number;
  description?: string;
  /** Patient name to attach to the invoice (optional). */
  payerName?: string;
};

export type PaymentLink = {
  invoiceId: string;
  externalId: string;
  url: string;
  amountIdr: number;
  amountDisplay: string;
  description: string;
  expiresAt: string;
};

export class PaymentValidationError extends Error {}

function resolveAmountAndDescription(req: PaymentLinkRequest): {
  amountIdr: number;
  description: string;
  reference: string;
} {
  if (req.treatmentId) {
    const product = findProduct(req.treatmentId);
    if (!product) {
      throw new PaymentValidationError(
        `Unknown treatmentId: ${req.treatmentId}`
      );
    }
    // Catalogue items always use the published price from lib/pricing —
    // the caller cannot override it.
    return {
      amountIdr: product.nowIdr,
      description: `DG Clinic — ${product.name}`,
      reference: product.id,
    };
  }

  if (typeof req.amountIdr !== "number" || !req.description?.trim()) {
    throw new PaymentValidationError(
      "Provide either treatmentId, or amountIdr with a description"
    );
  }
  if (
    !Number.isInteger(req.amountIdr) ||
    req.amountIdr < MIN_INVOICE_IDR ||
    req.amountIdr > MAX_INVOICE_IDR
  ) {
    throw new PaymentValidationError(
      `amountIdr must be an integer between ${MIN_INVOICE_IDR} and ${MAX_INVOICE_IDR}`
    );
  }
  return {
    amountIdr: req.amountIdr,
    description: `DG Clinic — ${req.description.trim().slice(0, 250)}`,
    reference: "custom",
  };
}

export async function createPaymentLink(
  req: PaymentLinkRequest
): Promise<PaymentLink> {
  const { amountIdr, description, reference } =
    resolveAmountAndDescription(req);

  const externalId = `dgc-${reference}-${Date.now()}`;
  const invoice: XenditInvoice = await createInvoice({
    externalId,
    amountIdr,
    description,
    payerName: req.payerName,
  });

  return {
    invoiceId: invoice.id,
    externalId: invoice.external_id,
    url: invoice.invoice_url,
    amountIdr: invoice.amount,
    amountDisplay: formatIdr(invoice.amount),
    description,
    expiresAt: invoice.expiry_date,
  };
}
