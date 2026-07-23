import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReceiptDocument } from "@/lib/pdf/ReceiptDocument";
import type { SimulatedReceipt } from "@/lib/finance-simulator";

// react-pdf needs Node APIs (fs for the embedded logo) — not Edge-compatible.
export const runtime = "nodejs";

function isValidReceipt(body: unknown): body is SimulatedReceipt {
  if (!body || typeof body !== "object") return false;
  const r = body as Record<string, unknown>;
  return (
    typeof r.receiptNo === "string" &&
    typeof r.customerName === "string" &&
    typeof r.issuedAt === "string" &&
    typeof r.totalDisplay === "string" &&
    typeof r.provider === "string" &&
    typeof r.status === "string" &&
    Array.isArray(r.lines) &&
    r.lines.every(
      (l) =>
        l &&
        typeof l.name === "string" &&
        typeof l.qty === "number" &&
        typeof l.unitPriceIdr === "number" &&
        typeof l.lineTotalIdr === "number"
    )
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidReceipt(body)) {
    return NextResponse.json(
      { error: "Malformed receipt payload" },
      { status: 400 }
    );
  }

  const buffer = await renderToBuffer(<ReceiptDocument receipt={body} />);

  const date = new Date(body.issuedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const filename = `${body.customerName} - ${date} - PAID.pdf`.replace(
    /[/\\]/g,
    "-"
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
