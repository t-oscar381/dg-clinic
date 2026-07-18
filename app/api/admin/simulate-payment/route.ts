import { NextResponse } from "next/server";
import {
  buildSimulatedReceipt,
  CartValidationError,
  type CartLine,
} from "@/lib/finance-simulator";

export const runtime = "nodejs";

/*
 * Internal-only endpoint backing the admin finance simulator page.
 * Fabricates a paid receipt with an artificial delay to mimic a
 * payment-provider round trip — no real invoice or charge is created.
 * See lib/finance-simulator.ts for details.
 */
export async function POST(request: Request) {
  let body: { cart?: CartLine[]; customerName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    // Simulated processing latency so the UI's loading state feels real.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const receipt = buildSimulatedReceipt(
      body.cart ?? [],
      body.customerName ?? ""
    );
    return NextResponse.json(receipt, { status: 201 });
  } catch (err) {
    if (err instanceof CartValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("simulate-payment failed:", err);
    return NextResponse.json(
      { error: "Simulation failed" },
      { status: 500 }
    );
  }
}
