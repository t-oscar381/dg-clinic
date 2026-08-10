import type { Metadata } from "next";
import { createServiceClient } from "@/lib/supabase/service";
import { instagramConfigured, instagramFeedEnabled } from "@/lib/instagram";
import InstagramSyncPanel from "@/components/admin/InstagramSyncPanel";

export const metadata: Metadata = {
  title: "Instagram Feed — Admin",
  robots: { index: false, follow: false },
};

export default async function InstagramAdminPage() {
  const supabase = createServiceClient();

  const [{ data: token }, { count: postCount }] = await Promise.all([
    supabase
      .from("integration_tokens")
      .select("expires_at, updated_at")
      .eq("service", "instagram")
      .maybeSingle(),
    supabase
      .from("instagram_posts")
      .select("id", { count: "exact", head: true }),
  ]);

  const configured = instagramConfigured();
  const enabled = instagramFeedEnabled();

  return (
    <div>
      <div className="admin-posts__header">
        <div>
          <h1>Instagram Feed</h1>
          <p>Live sync from @dg.clinic.hnw into the homepage grid.</p>
        </div>
      </div>

      <div className="admin-card">
        <dl className="admin-kv">
          <dt>App credentials</dt>
          <dd>{configured ? "Configured" : "Not set (INSTAGRAM_APP_ID / SECRET)"}</dd>
          <dt>Feed enabled</dt>
          <dd>{enabled ? "Yes" : "No — showing static fallback grid"}</dd>
          <dt>Token status</dt>
          <dd>
            {token?.expires_at
              ? `Stored, expires ${new Date(token.expires_at).toLocaleString()}`
              : "No token yet — connect below"}
          </dd>
          <dt>Posts synced</dt>
          <dd>{postCount ?? 0}</dd>
        </dl>
      </div>

      <div style={{ height: 20 }} />

      <div className="admin-card">
        <a href="/api/instagram/oauth/start" className="btn btn-ghost btn-sm">
          Connect / Reconnect Instagram
        </a>
        <p className="admin-hint">
          Starts the OAuth consent flow for @dg.clinic.hnw. Requires the
          account to be added as a tester on the Meta app while it&rsquo;s
          in development mode.
        </p>
      </div>

      <div style={{ height: 20 }} />

      <InstagramSyncPanel />
    </div>
  );
}
