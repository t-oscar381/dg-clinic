import { createPublicClient } from "@/lib/supabase/server";
import { REVIEW_CATEGORY } from "@/lib/site";

/*
 * Read helpers for public pages. Anon-key reads only — RLS already
 * scopes these to what should be public (all site_content rows, only
 * published posts). Next.js 15 doesn't cache fetch() by default, so
 * these reflect admin edits on the very next page load with no extra
 * revalidation wiring needed.
 */

export type ContentMap = Record<string, string>;

/**
 * Fetches all site_content rows for a page and returns a flat
 * section_key -> string value map. Values are stored as JSON in a
 * jsonb column (so `"hello"` unwraps to `hello`); non-string content
 * types are JSON.stringify'd back for the caller to parse if needed.
 */
export async function getSiteContent(page: string): Promise<ContentMap> {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("section_key, value, content_type")
    .eq("page", page);

  if (error || !data) return {};

  const map: ContentMap = {};
  for (const row of data) {
    map[row.section_key] =
      row.content_type === "text" && typeof row.value === "string"
        ? row.value
        : JSON.stringify(row.value);
  }
  return map;
}

/** Returns `content[key]` if present and non-empty, else `fallback`. */
export function pick(
  content: ContentMap,
  key: string,
  fallback: string
): string {
  const value = content[key];
  return value && value.trim() ? value : fallback;
}

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  category: string | null;
  status: "draft" | "published";
  author_name: string | null;
  published_at: string | null;
  created_at: string;
};

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, body, cover_image_url, category, status, author_name, published_at, created_at"
    )
    .eq("status", "published")
    .neq("category", REVIEW_CATEGORY)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as Post[];
}

export async function getPublishedReviews(): Promise<Post[]> {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, body, cover_image_url, category, status, author_name, published_at, created_at"
    )
    .eq("status", "published")
    .eq("category", REVIEW_CATEGORY)
    .order("published_at", { ascending: false });

  if (error || !data) return [];
  return data as Post[];
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<Post | null> {
  const supabase = await createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, body, cover_image_url, category, status, author_name, published_at, created_at"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data as Post;
}
