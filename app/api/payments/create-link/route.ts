import { NextResponse } from "next/server";
import {
  createPaymentLink,
  paymentsEnabled,
  PaymentValidationError,
} from "@/lib/payments";

export const runtime = "nodejs";

/*
 * Internal endpoint for the DG Clinic team: creates a Xendit payment
 * link for a treatment, to be sent to the patient in WhatsApp.
 *
 * Not a public API — requires the shared admin token. Returns 503
 * until payments are enabled and configured for the environment.
 *
 *   curl -X POST https://<domain>/api/payments/create-link \
 *     -H "content-type: application/json" \
 *     -H "x-admin-token: $PAYMENTS_ADMIN_TOKEN" \
 *     -d '{"treatmentId": "diamond-booster", "payerName": "Ibu Sari"}'
 *
 * Custom quote: -d '{"amountIdr": 5000000, "description": "Secretome program, session 1"}'
 */
export async function POST(request: Request) {
  if (!paymentsEnabled()) {
    return NextResponse.json(
      { error: "Payments are not enabled in this environment" },
      { status: 503 }
    );
  }

  const adminToken = process.env.PAYMENTS_ADMIN_TOKEN;
  if (!adminToken || request.headers.get("x-admin-token") !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const link = await createPaymentLink(body as Parameters<typeof createPaymentLink>[0]);
    return NextResponse.json(link, { status: 201 });
  } catch (err) {
    if (err instanceof PaymentValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("create-link failed:", err);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 502 }
    );
  }
}
