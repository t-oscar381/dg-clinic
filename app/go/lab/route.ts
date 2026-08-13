import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/server";
import { resolveLabTest } from "@/lib/labs";
import { waLink } from "@/lib/site";

export const runtime = "nodejs";

/*
 * /go/lab?t=<key> — lab-test WhatsApp CTAs go through this redirect
 * instead of a raw wa.me link (docs/FEEDBACK-LOG.md Round 3, B2/B3).
 *
 * Two things happen here, in order: the click is recorded (best-effort,
 * deduplicated per visitor/link/day by a unique index in Supabase), then
 * the visitor is 302'd to WhatsApp. Tracking never blocks the redirect —
 * if the insert fails for any reason (including a dedup conflict), the
 * redirect still fires.
 */
const VISITOR_COOKIE = "dgc_vid";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function GET(request: NextRequest) {
  const { key, label } = resolveLabTest(request.nextUrl.searchParams.get("t"));
  const message = `Halo Denish Gunawan Clinic — saya mau lab test: ${label}.`;

  const response = NextResponse.redirect(waLink(message), { status: 302 });

  let visitorId = request.cookies.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    visitorId = randomUUID();
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_YEAR_SECONDS,
      path: "/",
    });
  }

  try {
    const supabase = await createPublicClient();
    await supabase
      .from("link_clicks")
      .insert({ link_key: `lab:${key}`, visitor_id: visitorId });
  } catch (error) {
    console.error("link_clicks insert failed:", error);
  }

  return response;
}
