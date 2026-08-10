import { NextResponse } from "next/server";
import { refreshLongLivedToken } from "@/lib/instagram";

export const runtime = "nodejs";

/*
 * Runs every 45 days (see vercel.json) — comfortably inside the 60-day
 * expiry window. Long-lived tokens are refreshable any time after 24h,
 * so this can also be called on demand:
 *
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        https://<domain>/api/instagram/refresh-token
 */
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { expiresAt } = await refreshLongLivedToken();
    console.log(`[instagram] token refreshed, new expiry ${expiresAt}`);
    return NextResponse.json({ refreshed: true, expiresAt });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[instagram] token refresh failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
