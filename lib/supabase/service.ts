import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/*
 * Service-role client — bypasses RLS entirely. Only for trusted
 * server-side code that isn't running as a signed-in admin: cron routes
 * (Instagram sync/token-refresh) and the on-demand admin sync trigger.
 * Never import this into a Client Component or expose the key to the
 * browser. Uses SUPABASE_SERVICE_ROLE_KEY, which deliberately has no
 * NEXT_PUBLIC_ prefix.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
