import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog / News — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, category, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="admin-posts__header">
        <div>
          <h1>Blog / News</h1>
          <p style={{ opacity: 0.7 }}>
            Write and publish posts. Live at /blog once published.
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary btn-sm">
          + New Post
        </Link>
      </div>

      {error && <p className="sim-gate__error">Failed to load posts: {error.message}</p>}

      {posts && posts.length === 0 && (
        <p className="sim-cart__empty">No posts yet.</p>
      )}

      <div className="admin-posts__list">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="admin-posts__row"
          >
            <span className={`post-status post-status--${post.status}`}>
              {post.status}
            </span>
            <span className="admin-posts__title">{post.title}</span>
            <span className="admin-posts__meta">{post.category}</span>
            <span className="admin-posts__meta">
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
