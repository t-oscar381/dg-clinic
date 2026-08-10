import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildAuthorizeUrl } from "@/lib/instagram";

export const runtime = "nodejs";

/*
 * Kicks off the one-time OAuth consent flow — this is the step the App
 * Review screencast walks through and films. Gated behind the admin
 * session (same as /dgc-master/*) since it's tied to the business's own
 * Instagram account, not something to leave publicly triggerable.
 *
 * Meta app setup: add this exact URL as a valid OAuth redirect URI —
 *   https://<domain>/api/instagram/oauth/callback
 * and, while the app is in development mode, add @dg.clinic.hnw as a
 * tester under App Roles → Roles (Instagram Testers) so the consent
 * screen will accept it.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }

  const redirectUri = new URL(
    "/api/instagram/oauth/callback",
    request.url
  ).toString();

  return NextResponse.redirect(buildAuthorizeUrl(redirectUri));
}
