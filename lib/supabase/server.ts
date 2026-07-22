import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/*
 * Server-side Supabase client for Server Components, Server Actions,
 * and Route Handlers. Reads the admin session from cookies so RLS
 * policies see the signed-in user's JWT — never uses the service role
 * key, so it's bound by the same admins-allowlist policies as the
 * browser client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component (not a Server Action or
            // Route Handler) — the middleware below refreshes the
            // session on every request, so this is safe to ignore.
          }
        },
      },
    }
  );
}

/*
 * Public-read client for pages that don't need an admin session
 * (category pages, blog listing). Same anon key, no cookie plumbing —
 * cheaper for the common case where RLS already scopes reads to
 * published content only.
 */
export async function createPublicClient() {
  const { createClient: createSupabaseClient } = await import(
    "@supabase/supabase-js"
  );
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
