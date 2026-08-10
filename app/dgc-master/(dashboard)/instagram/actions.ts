"use server";

import { revalidatePath } from "next/cache";
import {
  instagramConfigured,
  instagramFeedEnabled,
  syncInstagramFeed,
  type SyncResult,
} from "@/lib/instagram";

/**
 * On-demand sync trigger for the admin panel — lets Tommy verify a
 * freshly-issued token or a new post without waiting for the 2am cron.
 * Runs the exact same syncInstagramFeed() the cron route calls, so
 * there's only one sync implementation to trust.
 */
export async function runInstagramSyncNow(): Promise<
  { error: string } | { success: true; result: SyncResult }
> {
  if (!instagramConfigured()) {
    return {
      error:
        "INSTAGRAM_APP_ID / INSTAGRAM_APP_SECRET are not set yet — nothing to sync.",
    };
  }
  if (!instagramFeedEnabled()) {
    return {
      error:
        "INSTAGRAM_FEED_ENABLED is not \"true\" — the feed is intentionally off.",
    };
  }

  try {
    const result = await syncInstagramFeed();
    revalidatePath("/dgc-master/instagram");
    revalidatePath("/");
    return { success: true, result };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
