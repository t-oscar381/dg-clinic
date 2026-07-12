import "server-only";

/*
 * Thin server-side client for the Xendit Invoices API (payment-link
 * model). No SDK dependency — the REST surface we need is small.
 *
 * Auth: HTTP Basic with the secret key as username and empty password.
 * Docs: https://developers.xendit.co/api-reference/#create-invoice
 */

const XENDIT_API_BASE = "https://api.xendit.co";

export type XenditInvoice = {
  id: string;
  external_id: string;
  status: "PENDING" | "PAID" | "SETTLED" | "EXPIRED";
  amount: number;
  currency: string;
  description?: string;
  invoice_url: string;
  expiry_date: string;
};

export type CreateInvoiceInput = {
  externalId: string;
  amountIdr: number;
  description: string;
  payerName?: string;
  /** Seconds until the payment link expires. Default 24 hours. */
  durationSeconds?: number;
};

function secretKey(): string {
  const key = process.env.XENDIT_SECRET_KEY;
  if (!key) {
    throw new Error("XENDIT_SECRET_KEY is not configured");
  }
  return key;
}

function authHeader(): string {
  return "Basic " + Buffer.from(`${secretKey()}:`).toString("base64");
}

export async function createInvoice(
  input: CreateInvoiceInput
): Promise<XenditInvoice> {
  const res = await fetch(`${XENDIT_API_BASE}/v2/invoices`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_id: input.externalId,
      amount: input.amountIdr,
      currency: "IDR",
      description: input.description,
      invoice_duration: input.durationSeconds ?? 60 * 60 * 24,
      ...(input.payerName
        ? { customer: { given_names: input.payerName } }
        : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Xendit create invoice failed (${res.status}): ${body}`);
  }
  return (await res.json()) as XenditInvoice;
}

export async function getInvoice(invoiceId: string): Promise<XenditInvoice> {
  const res = await fetch(`${XENDIT_API_BASE}/v2/invoices/${invoiceId}`, {
    headers: { Authorization: authHeader() },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Xendit get invoice failed (${res.status}): ${body}`);
  }
  return (await res.json()) as XenditInvoice;
}
