import { NextResponse } from "next/server";
import { paymentsEnabled } from "@/lib/payments";

export const runtime = "nodejs";

type InvoiceCallback = {
  id: string;
  external_id: string;
  status: "PAID" | "SETTLED" | "EXPIRED";
  amount?: number;
  paid_amount?: number;
  paid_at?: string;
  payment_method?: string;
};

/*
 * Xendit invoice callback receiver. Xendit signs requests with the
 * account's verification token in the x-callback-token header —
 * requests without a matching token are rejected.
 *
 * Point Xendit Dashboard → Settings → Callbacks → Invoices at
 * https://<domain>/api/payments/webhook
 */
export async function POST(request: Request) {
  if (!paymentsEnabled()) {
    return NextResponse.json(
      { error: "Payments are not enabled in this environment" },
      { status: 503 }
    );
  }

  const expected = process.env.XENDIT_WEBHOOK_TOKEN;
  if (!expected || request.headers.get("x-callback-token") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let event: InvoiceCallback;
  try {
    event = (await request.json()) as InvoiceCallback;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  switch (event.status) {
    case "PAID":
    case "SETTLED":
      // Fulfilment hook: notify the team / record the booking here in a
      // later iteration. Logged for now so payments are traceable in
      // the platform logs from day one.
      console.log(
        `[payments] invoice ${event.external_id} ${event.status.toLowerCase()}: ` +
          `${event.paid_amount ?? event.amount} IDR via ${event.payment_method ?? "unknown"}`
      );
      break;
    case "EXPIRED":
      console.log(`[payments] invoice ${event.external_id} expired unpaid`);
      break;
    default:
      console.log(`[payments] invoice event ignored:`, event);
  }

  // Always acknowledge quickly; Xendit retries on non-2xx.
  return NextResponse.json({ received: true });
}
