import { createBrowserClient } from "@supabase/ssr";

/*
 * Browser-side Supabase client for the admin UI (login form, realtime
 * form state). Uses the anon key only — RLS on site_content/posts
 * decides what an authenticated admin can actually read or write; see
 * the "create_cms_content_and_posts" migration.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
