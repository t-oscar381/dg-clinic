# Handoff Brief — Live Instagram Feed (@dg.clinic.hnw)

**Branch:** `feature/dokden-rebrand` (or its own branch — no coupling)
Replaces the static images in `components/InstagramGrid.tsx` with a real,
self-updating feed. **Latest 6 posts, no editorial filter** (decided).

---

## 0. Prerequisites — Tommy, not Claude Code

1. **`@dg.clinic.hnw` must be a Professional account** (Business or Creator).
   Personal accounts cannot be read by any Instagram API since the Basic
   Display shutdown. Free to switch in the app.
2. **Meta app** at developers.facebook.com with the *Instagram* product added,
   using **Instagram API with Instagram Login**. Instagram Basic Display was
   permanently shut down 4 Dec 2024 — do not use any guide that references it.
3. **App Review** for `instagram_business_basic`. In development mode the app
   only works for accounts added as testers, which is fine for building, but
   **production needs review and it is not instant.** Start this early; it is
   the long pole.

Resulting secrets → Vercel env vars:

```
INSTAGRAM_APP_ID
INSTAGRAM_APP_SECRET
INSTAGRAM_LONG_LIVED_TOKEN     # from the one-time OAuth exchange
INSTAGRAM_USER_ID
INSTAGRAM_FEED_ENABLED=true    # kill switch
CRON_SECRET                    # guards the cron routes
```

---

## 1. Why this needs a job, not a fetch-on-render

- **Long-lived tokens expire after 60 days** and do not auto-renew. If one
  lapses, the feed dies and someone must redo the whole OAuth flow.
- Rate limit is **200 requests/hour per account** — never fetch per visitor.
- **Instagram CDN image URLs expire after a few days.** Storing `media_url`
  and rendering it later gives you a grid of broken images within a week.
  Images **must** be copied into Supabase Storage.

---

## 2. Schema

```sql
create table instagram_posts (
  id             text primary key,        -- IG media id
  permalink      text not null,
  caption        text,
  media_type     text not null,           -- IMAGE | VIDEO | CAROUSEL_ALBUM
  storage_path   text not null,           -- path in Supabase Storage
  posted_at      timestamptz not null,
  hidden         boolean not null default false,
  synced_at      timestamptz not null default now()
);
create index on instagram_posts (posted_at desc);
```

RLS: public read where `hidden = false`; writes service-role only.
Storage bucket `instagram` — public read.

`hidden` is the **kill switch for a single post**. No approval workflow, no
moderation queue — but if something goes up that shouldn't be on a medical
site, one boolean pulls it immediately without waiting on Instagram.

---

## 3. Cron routes

Both guarded by `CRON_SECRET`; both must be idempotent.

### `GET /api/instagram/sync` — daily
1. Bail out unless `INSTAGRAM_FEED_ENABLED === "true"`.
2. `GET /{user-id}/media?fields=id,caption,media_type,media_url,permalink,timestamp&limit=12`
3. For each new id: download `media_url`, upload to Storage, upsert the row.
   For `CAROUSEL_ALBUM`, use the first child image. Skip `VIDEO` or store its
   thumbnail — do not embed video in the grid.
4. Prune rows older than the newest 24 and delete their Storage objects.
5. **Never delete existing rows on a failed fetch.** A stale feed is fine; an
   empty one is not.

### `GET /api/instagram/refresh-token` — every 45 days
`GET /refresh_access_token?grant_type=ig_refresh_token&access_token=…`,
then persist the new token. Tokens are refreshable any time after 24h; 45 days
leaves a comfortable margin inside the 60-day window.

⚠️ Vercel env vars can't be written at runtime. Either store the current token
in a single-row Supabase `integration_tokens` table (**preferred**) and read
from there, or use the Vercel API to update the env var. Do not silently let
the token go stale.

`vercel.json`:

```json
{ "crons": [
  { "path": "/api/instagram/sync",          "schedule": "0 2 * * *" },
  { "path": "/api/instagram/refresh-token", "schedule": "0 3 1 */1 *" }
]}
```

---

## 4. Component

Rewrite `components/InstagramGrid.tsx` to read the 6 most recent rows where
`hidden = false`, ordered by `posted_at desc`.

- Server component; `export const revalidate = 3600`.
- `next/image` from Supabase Storage — add the Storage hostname to
  `remotePatterns` in `next.config.ts`.
- Each tile links to `permalink`, `target="_blank" rel="noopener noreferrer"`.
- `alt`: first ~100 chars of caption, falling back to
  `"Instagram post from @dg.clinic.hnw"`.
- Keep the existing layout and `--dk-*` styling exactly — this is a data-source
  change, not a redesign.

**Fallback is mandatory.** If the table is empty, the query errors, or
`INSTAGRAM_FEED_ENABLED` is false, render the current static images from
`public/images/dokden/ig-*`. Keep those files. The section must never render
empty or broken.

### 4.1 Layered failsafe — the link must ALWAYS work

The rule: **every tile is a working link to Instagram, no matter what happens
to the image.** A broken tile that goes nowhere is worse than no grid at all.

Define once in `lib/site.ts`:

```ts
export const INSTAGRAM_URL = "https://www.instagram.com/dg.clinic.hnw";
```

Four layers, each catching the one above:

**Layer 1 — missing permalink.** If a row has no `permalink`, or it doesn't
parse as an instagram.com URL, link the tile to `INSTAGRAM_URL` instead. Never
render `href=""` or a disabled tile.

**Layer 2 — image fails to load at runtime.** Storage object deleted, bucket
permissions changed, network blip. Extract the tile into a small client
component (`components/InstagramTile.tsx`, `"use client"`) that holds an
`onError` handler: on failure, swap the `src` to a local placeholder
(`/images/dokden/ig-fallback.webp`) **and keep the link intact.** The wrapping
`<a>` must never be conditional on the image succeeding.

**Layer 3 — no rows at all.** Empty table, query error, feed disabled: render
the six static `public/images/dokden/ig-*` images. **Point every one of them at
`INSTAGRAM_URL`**, since there are no per-post permalinks in this state.

**Layer 4 — section-level.** The `@dg.clinic.hnw` heading above the grid is
itself a link to `INSTAGRAM_URL`. Even in the worst case — every image broken,
every link degraded — the user still has one obvious route to the account.

Also add `aria-label` per tile (`"View this post on Instagram"` / in fallback
states `"Visit @dg.clinic.hnw on Instagram"`) so the degraded state is still
clear to screen readers.

**Test it explicitly:** rename the Storage bucket, reload, and confirm the grid
still renders six clickable tiles that open `@dg.clinic.hnw`. If any tile is
dead, this section is not done.

Create `ig-fallback.webp` from an existing asset — a neutral crop of
`Sunlit Home Care Living Room A` works. ≤100 KB.

---

## 5. Compliance note

Recorded because the site has hard content rules (`HANDOFF-rebrand.md` §0.2):
no prices, no before/after imagery, no guaranteed-outcome claims, no peptide
names pending BPOM, "Stem Cell & NK Cell" frozen.

An unfiltered feed means **anything posted to Instagram appears on the website
without review**, including content that would breach those rules. This was a
deliberate decision to avoid moderation overhead.

Mitigations built in, both zero-effort day to day:

- `hidden = true` on one row pulls a single post immediately.
- `INSTAGRAM_FEED_ENABLED=false` disables the whole feed and falls back to the
  static grid, no deploy needed.

Tell Tommy both exist and where they are. If the feed later becomes a problem,
the fix is a hashtag filter (`#dgcweb`) in the sync route — a few lines.

---

## Verify

- Sync route populates the table and Storage; re-running changes nothing.
- Grid renders 6 real posts, each linking to the correct permalink.
- Setting `hidden = true` removes exactly one post within the revalidate window.
- `INSTAGRAM_FEED_ENABLED=false` falls back to static images cleanly.
- Images still load 7+ days after sync (proves Storage copying works — this is
  the step most implementations get wrong).
- **Failsafe test:** temporarily rename the Storage bucket, reload the page.
  Six tiles must still render and every one must open `@dg.clinic.hnw`. Repeat
  with the table emptied, and again with `INSTAGRAM_FEED_ENABLED=false`.
- Token refresh route returns a new token and persists it.
- `npm run build` passes.
