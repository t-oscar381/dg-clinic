import { NextResponse } from "next/server";
import { instagramFeedEnabled, syncInstagramFeed } from "@/lib/instagram";

export const runtime = "nodejs";
export const maxDuration = 60;

/*
 * Daily cron (see vercel.json) — also callable on demand while wiring up
 * credentials, so the token/feed can be verified without waiting for the
 * 2am schedule:
 *
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        https://<domain>/api/instagram/sync
 *
 * Guarded by CRON_SECRET. Vercel Cron sends
 * `Authorization: Bearer $CRON_SECRET` automatically when the env var is
 * set — this checks the same header either way.
 */
export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!instagramFeedEnabled()) {
    console.log("[instagram] sync skipped: INSTAGRAM_FEED_ENABLED is not true");
    return NextResponse.json({ skipped: true, reason: "feed disabled" });
  }

  try {
    const result = await syncInstagramFeed();
    console.log(
      `[instagram] sync complete: fetched=${result.fetched} upserted=${result.upserted} ` +
        `skipped=${result.skipped} pruned=${result.pruned} errors=${result.errors.length}`
    );
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[instagram] sync failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
