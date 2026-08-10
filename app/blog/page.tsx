import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/cms";

// Always fresh so a newly published post appears immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & News — DG Clinic Jakarta",
  description:
    "Wellness updates, clinic news, and treatment guidance from DG Clinic, Jakarta's doctor-led homecare wellness clinic.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="hero container">
        <span className="eyebrow">Blog &amp; News</span>
        <h1>From DG Clinic</h1>
        <p className="lede">
          Wellness updates, clinic news, and guidance from our doctors.
        </p>
      </section>

      <section className="section-tight container">
        {posts.length === 0 && (
          <p className="center" style={{ opacity: 0.6 }}>
            No posts yet — check back soon.
          </p>
        )}
        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="blog-card"
            >
              {post.cover_image_url && (
                // Covers are arbitrary admin-supplied remote URLs (any host),
                // so next/image would need an open-ended remotePatterns
                // allowlist — not worth the risk for a CMS field. Plain img
                // is deliberate here, not an oversight.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="blog-card__image"
                  loading="lazy"
                />
              )}
              <div className="blog-card__body">
                {post.category && (
                  <span className="badge badge-essential">
                    {post.category}
                  </span>
                )}
                <h3>{post.title}</h3>
                {post.excerpt && (
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                )}
                {post.published_at && (
                  <p className="blog-card__date">
                    {new Date(post.published_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
