import { NextResponse } from "next/server";
import { completeOAuthExchange } from "@/lib/instagram";

export const runtime = "nodejs";

/*
 * Instagram redirects here with ?code=... after the tester approves the
 * consent screen. Exchanges code -> short-lived -> long-lived token
 * (see lib/instagram.ts) and writes the long-lived token straight to
 * the `integration_tokens` row — never to a Vercel env var, since those
 * can't be written at runtime.
 *
 * The response logs the IG user id — copy that into INSTAGRAM_USER_ID
 * in Vercel once, it doesn't change. This whole exchange is the part to
 * film for App Review: hit /api/instagram/oauth/start signed in as an
 * admin, approve the Instagram consent screen, land here.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (error) {
    console.error(`[instagram oauth] consent denied: ${error} — ${errorDescription}`);
    return NextResponse.json(
      { error, error_description: errorDescription },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const redirectUri = new URL(
    "/api/instagram/oauth/callback",
    request.url
  ).toString();

  try {
    const { userId, expiresAt } = await completeOAuthExchange(
      code,
      redirectUri
    );
    console.log(
      `[instagram oauth] exchange complete. IG user id: ${userId}. ` +
        `Token expires ${expiresAt}. Set INSTAGRAM_USER_ID="${userId}" in ` +
        `Vercel if it isn't already.`
    );
    return NextResponse.json({
      success: true,
      instagramUserId: userId,
      tokenExpiresAt: expiresAt,
      note: `Copy this into the INSTAGRAM_USER_ID env var in Vercel: ${userId}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[instagram oauth] exchange failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
