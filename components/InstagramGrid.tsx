import { createPublicClient } from "@/lib/supabase/server";
import { INSTAGRAM_URL } from "@/lib/site";
import { instagramFeedEnabled } from "@/lib/instagram";
import InstagramTile from "@/components/InstagramTile";

export const revalidate = 3600;

const STORAGE_BUCKET = "instagram";

// Layer 3 fallback — static curated tiles, used whenever the live feed
// can't be trusted: disabled, empty table, or a query error. All AI
// placeholder images (docs/HANDOFF-rebrand.md §4); none are captioned
// as real patients, staff, or treatments.
const STATIC_FALLBACK_TILES = [
  { src: "/images/dokden/hero-home-visit.webp", alt: "Home visit, doctor's bag in hand" },
  { src: "/images/dokden/trust-bag.webp", alt: "Physician's leather bag, still life" },
  { src: "/images/dokden/ig-living-room.webp", alt: "Sunlit home care living room" },
  { src: "/images/dokden/ig-smartphone.webp", alt: "Messaging the clinic from home" },
  { src: "/images/dokden/ig-syringe-prep.webp", alt: "Careful preparation before a visit" },
  { src: "/images/dokden/ig-lifestyle-collage.webp", alt: "At-home healthcare lifestyle" },
];

type PostRow = {
  id: string;
  permalink: string;
  caption: string | null;
  storage_path: string;
};

/**
 * Layer 1 of the failsafe (docs/HANDOFF-instagram-feed.md §4.1): a
 * missing or malformed permalink degrades to the account URL instead of
 * ever rendering an empty or disabled link.
 */
function resolveHref(permalink: string | null | undefined): string {
  if (!permalink) return INSTAGRAM_URL;
  try {
    const url = new URL(permalink);
    const isInstagram =
      url.hostname === "instagram.com" || url.hostname === "www.instagram.com";
    return isInstagram ? permalink : INSTAGRAM_URL;
  } catch {
    return INSTAGRAM_URL;
  }
}

function resolveAlt(caption: string | null): string {
  const trimmed = caption?.trim();
  if (!trimmed) return "Instagram post from @dg.clinic.hnw";
  return trimmed.length > 100 ? `${trimmed.slice(0, 100)}…` : trimmed;
}

function StaticFallbackGrid() {
  return (
    <div className="dk-instagram-grid">
      {STATIC_FALLBACK_TILES.map((tile) => (
        <InstagramTile
          key={tile.src}
          href={INSTAGRAM_URL}
          src={tile.src}
          alt={tile.alt}
          ariaLabel="Visit @dg.clinic.hnw on Instagram"
        />
      ))}
    </div>
  );
}

export default async function InstagramGrid() {
  // Layer 3a — feed intentionally off (kill switch or credentials not
  // configured yet). Fall back without ever touching the database.
  if (!instagramFeedEnabled()) {
    return <StaticFallbackGrid />;
  }

  let posts: PostRow[] = [];
  const supabase = await createPublicClient();
  try {
    const { data, error } = await supabase
      .from("instagram_posts")
      .select("id, permalink, caption, storage_path")
      .eq("hidden", false)
      .order("posted_at", { ascending: false })
      .limit(6);

    if (error) throw error;
    posts = data ?? [];
  } catch (err) {
    // Layer 3b — query error (bad credentials, RLS misconfig, network).
    // A stale or missing feed is never worse than a broken page.
    console.error("[instagram] grid query failed, using static fallback:", err);
    return <StaticFallbackGrid />;
  }

  // Layer 3c — table genuinely empty (never synced yet, or pruned to
  // nothing, which shouldn't happen but isn't a reason to render blank).
  if (posts.length === 0) {
    return <StaticFallbackGrid />;
  }

  const tiles = posts.map((post) => {
    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(post.storage_path);
    return {
      id: post.id,
      href: resolveHref(post.permalink),
      src: data.publicUrl,
      alt: resolveAlt(post.caption),
    };
  });

  return (
    <div className="dk-instagram-grid">
      {tiles.map((tile) => (
        <InstagramTile
          key={tile.id}
          href={tile.href}
          src={tile.src}
          alt={tile.alt}
          ariaLabel="View this post on Instagram"
        />
      ))}
    </div>
  );
}
