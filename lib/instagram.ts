import "server-only";
import { createServiceClient } from "@/lib/supabase/service";

/*
 * Live Instagram feed (@dg.clinic.hnw) — docs/HANDOFF-instagram-feed.md.
 *
 * Uses "Instagram API with Instagram Login" (graph.instagram.com), the
 * product that replaced Instagram Basic Display after its Dec 2024
 * shutdown. Do not point this at graph.facebook.com or follow any guide
 * that mentions Basic Display — wrong product, wrong endpoints.
 *
 * Token lifecycle:
 *  1. One-time manual OAuth (see /api/instagram/oauth/start below) gets
 *     a long-lived token and writes it to the `integration_tokens` row.
 *  2. Every read after that prefers the DB row. INSTAGRAM_LONG_LIVED_TOKEN
 *     is only a bootstrap fallback for the very first sync, before the
 *     OAuth flow has ever run — see getAccessToken().
 *  3. The refresh-token cron extends the DB token every 45 days, well
 *     inside the 60-day expiry window.
 */

const GRAPH_BASE = "https://graph.instagram.com";
const OAUTH_BASE = "https://api.instagram.com/oauth/access_token";
const AUTHORIZE_BASE = "https://www.instagram.com/oauth/authorize";

const TOKEN_SERVICE = "instagram";
const STORAGE_BUCKET = "instagram";
const KEEP_NEWEST = 24;
const FETCH_LIMIT = 12;

export function instagramFeedEnabled(): boolean {
  return process.env.INSTAGRAM_FEED_ENABLED === "true";
}

/** True once app credentials exist — distinct from the feed being enabled. */
export function instagramConfigured(): boolean {
  return Boolean(
    process.env.INSTAGRAM_APP_ID && process.env.INSTAGRAM_APP_SECRET
  );
}

// --- OAuth (one-time, manual, walked through on camera for App Review) ----

/**
 * The URL to send Tommy (or the App Review screencast) to. Requires
 * `@dg.clinic.hnw` to already be added as a tester on the Meta app while
 * in development mode (see docs/HANDOFF-instagram-feed.md §0).
 */
export function buildAuthorizeUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: requireEnv("INSTAGRAM_APP_ID"),
    redirect_uri: redirectUri,
    scope: "instagram_business_basic",
    response_type: "code",
  });
  return `${AUTHORIZE_BASE}?${params.toString()}`;
}

type ShortLivedTokenResponse = {
  access_token: string;
  user_id: string;
  permissions?: string[];
};

/** Step 1 of the exchange: the `code` param Instagram redirected back with. */
async function exchangeCodeForShortLivedToken(
  code: string,
  redirectUri: string
): Promise<ShortLivedTokenResponse> {
  const body = new URLSearchParams({
    client_id: requireEnv("INSTAGRAM_APP_ID"),
    client_secret: requireEnv("INSTAGRAM_APP_SECRET"),
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code,
  });
  const res = await fetch(OAUTH_BASE, { method: "POST", body });
  if (!res.ok) {
    throw new Error(
      `Short-lived token exchange failed (${res.status}): ${await res.text()}`
    );
  }
  return res.json();
}

type LongLivedTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds, ~5,184,000 (60 days)
};

/** Step 2: trade the short-lived token for a 60-day long-lived one. */
async function exchangeForLongLivedToken(
  shortLivedToken: string
): Promise<LongLivedTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: requireEnv("INSTAGRAM_APP_SECRET"),
    access_token: shortLivedToken,
  });
  const res = await fetch(`${GRAPH_BASE}/access_token?${params.toString()}`);
  if (!res.ok) {
    throw new Error(
      `Long-lived token exchange failed (${res.status}): ${await res.text()}`
    );
  }
  return res.json();
}

/**
 * Full OAuth exchange run from the callback route: code -> short-lived ->
 * long-lived, persisted to `integration_tokens`. Returns the IG user id
 * so it can be logged and copied into INSTAGRAM_USER_ID.
 */
export async function completeOAuthExchange(
  code: string,
  redirectUri: string
): Promise<{ userId: string; expiresAt: string }> {
  const shortLived = await exchangeCodeForShortLivedToken(code, redirectUri);
  const longLived = await exchangeForLongLivedToken(shortLived.access_token);
  const expiresAt = new Date(
    Date.now() + longLived.expires_in * 1000
  ).toISOString();

  await persistToken(longLived.access_token, expiresAt);

  return { userId: shortLived.user_id, expiresAt };
}

/** Every 45 days, refreshes the current long-lived token in place. */
export async function refreshLongLivedToken(): Promise<{
  expiresAt: string;
}> {
  const current = await getAccessToken();
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: current,
  });
  const res = await fetch(
    `${GRAPH_BASE}/refresh_access_token?${params.toString()}`
  );
  if (!res.ok) {
    throw new Error(
      `Token refresh failed (${res.status}): ${await res.text()}`
    );
  }
  const data: LongLivedTokenResponse = await res.json();
  const expiresAt = new Date(
    Date.now() + data.expires_in * 1000
  ).toISOString();

  await persistToken(data.access_token, expiresAt);
  return { expiresAt };
}

// --- Token storage ----------------------------------------------------

async function persistToken(accessToken: string, expiresAt: string) {
  const supabase = createServiceClient();
  const { error } = await supabase.from("integration_tokens").upsert({
    service: TOKEN_SERVICE,
    access_token: accessToken,
    expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Failed to persist token: ${error.message}`);
}

/**
 * DB-first token read. INSTAGRAM_LONG_LIVED_TOKEN only covers the gap
 * before the OAuth flow has ever completed — once a row exists, the DB
 * always wins, per the non-negotiable in docs/HANDOFF-instagram-feed.md
 * (Vercel env vars can't be written at runtime, so the refresh cron has
 * nowhere else to persist a new token).
 */
export async function getAccessToken(): Promise<string> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("integration_tokens")
    .select("access_token")
    .eq("service", TOKEN_SERVICE)
    .maybeSingle();

  if (data?.access_token) return data.access_token;

  const bootstrap = process.env.INSTAGRAM_LONG_LIVED_TOKEN;
  if (bootstrap) {
    // Migrate the bootstrap token into the DB immediately so every
    // subsequent read — including the next refresh — is DB-first.
    const expiresAt = new Date(
      Date.now() + 60 * 24 * 60 * 60 * 1000
    ).toISOString();
    await persistToken(bootstrap, expiresAt);
    return bootstrap;
  }

  throw new Error(
    "No Instagram access token available — complete the OAuth flow at " +
      "/api/instagram/oauth/start, or set INSTAGRAM_LONG_LIVED_TOKEN."
  );
}

// --- Media sync ---------------------------------------------------------

type IgMediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string; // present on VIDEO
  permalink: string;
  timestamp: string;
  children?: { data: { id: string; media_url: string }[] };
};

async function fetchLatestMedia(): Promise<IgMediaItem[]> {
  const accessToken = await getAccessToken();
  const userId = requireEnv("INSTAGRAM_USER_ID");
  const fields =
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_url}";
  const params = new URLSearchParams({
    fields,
    limit: String(FETCH_LIMIT),
    access_token: accessToken,
  });
  const res = await fetch(`${GRAPH_BASE}/${userId}/media?${params}`);
  if (!res.ok) {
    throw new Error(`Media fetch failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.data ?? [];
}

/** Picks the image URL to store for a given item, per media_type. */
function resolveImageUrl(item: IgMediaItem): string | null {
  if (item.media_type === "VIDEO") return item.thumbnail_url ?? null;
  if (item.media_type === "CAROUSEL_ALBUM") {
    return item.children?.data?.[0]?.media_url ?? item.media_url ?? null;
  }
  return item.media_url ?? null;
}

export type SyncResult = {
  fetched: number;
  upserted: number;
  skipped: number;
  pruned: number;
  errors: string[];
};

/**
 * Idempotent daily sync: fetch latest media, download+copy new images
 * into Supabase Storage (Instagram's CDN URLs expire in days — never
 * store media_url directly), upsert rows, prune anything past the
 * newest 24. Never deletes existing rows on a failed fetch — a stale
 * feed beats an empty one.
 */
export async function syncInstagramFeed(): Promise<SyncResult> {
  const supabase = createServiceClient();
  const result: SyncResult = {
    fetched: 0,
    upserted: 0,
    skipped: 0,
    pruned: 0,
    errors: [],
  };

  const items = await fetchLatestMedia();
  result.fetched = items.length;

  for (const item of items) {
    try {
      const imageUrl = resolveImageUrl(item);
      if (!imageUrl) {
        result.skipped++;
        console.warn(`[instagram] ${item.id}: no usable image, skipped`);
        continue;
      }

      const storagePath = `posts/${item.id}.jpg`;

      // Re-uploading on every sync is wasted bandwidth for posts we
      // already have — only fetch+upload if this id is new.
      const { data: existing } = await supabase
        .from("instagram_posts")
        .select("id")
        .eq("id", item.id)
        .maybeSingle();

      if (!existing) {
        const imageRes = await fetch(imageUrl);
        if (!imageRes.ok) {
          throw new Error(`image download failed (${imageRes.status})`);
        }
        const bytes = await imageRes.arrayBuffer();
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, bytes, {
            contentType: imageRes.headers.get("content-type") ?? "image/jpeg",
            upsert: true,
          });
        if (uploadError) {
          throw new Error(`storage upload failed: ${uploadError.message}`);
        }
      }

      const { error: upsertError } = await supabase
        .from("instagram_posts")
        .upsert({
          id: item.id,
          permalink: item.permalink,
          caption: item.caption ?? null,
          media_type: item.media_type,
          storage_path: storagePath,
          posted_at: item.timestamp,
          synced_at: new Date().toISOString(),
        });
      if (upsertError) {
        throw new Error(`row upsert failed: ${upsertError.message}`);
      }

      result.upserted++;
      console.log(`[instagram] synced ${item.id} (${item.media_type})`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`${item.id}: ${message}`);
      console.error(`[instagram] failed to sync ${item.id}: ${message}`);
      // Continue with the rest of the batch — one bad post shouldn't
      // sink the whole sync.
    }
  }

  // Prune anything past the newest 24, but only once we know this sync
  // actually got data — never prune off the back of an empty fetch.
  if (items.length > 0) {
    result.pruned = await pruneOldPosts(supabase);
  }

  return result;
}

async function pruneOldPosts(
  supabase: ReturnType<typeof createServiceClient>
): Promise<number> {
  const { data: keepers } = await supabase
    .from("instagram_posts")
    .select("id")
    .order("posted_at", { ascending: false })
    .limit(KEEP_NEWEST);

  const keepIds = new Set((keepers ?? []).map((r) => r.id));

  const { data: all } = await supabase.from("instagram_posts").select("id, storage_path");
  const toPrune = (all ?? []).filter((r) => !keepIds.has(r.id));
  if (toPrune.length === 0) return 0;

  await supabase.storage
    .from(STORAGE_BUCKET)
    .remove(toPrune.map((r) => r.storage_path));
  await supabase
    .from("instagram_posts")
    .delete()
    .in("id", toPrune.map((r) => r.id));

  return toPrune.length;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}
