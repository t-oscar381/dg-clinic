import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug } from "@/lib/cms";
import WhatsAppButton from "@/components/WhatsAppButton";

// Always fresh so edits/unpublishes take effect immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — DG Clinic Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <section className="hero container">
        <span className="eyebrow">
          <Link href="/blog" style={{ color: "inherit" }}>
            ← Blog &amp; News
          </Link>
        </span>
        <h1>{post.title}</h1>
        {post.published_at && (
          <p className="lede" style={{ opacity: 0.6, fontSize: "0.95rem" }}>
            {new Date(post.published_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            {post.author_name ? ` · ${post.author_name}` : ""}
          </p>
        )}
      </section>

      <section className="section-tight container">
        {post.cover_image_url && (
          // Covers are arbitrary admin-supplied remote URLs (any host), so
          // next/image would need an open-ended remotePatterns allowlist —
          // not worth the risk for a CMS field. Plain img is deliberate.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="blog-post__cover"
          />
        )}
        <div className="blog-post__body">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="cta-band">
          <h2>Have Questions?</h2>
          <p>Message us on WhatsApp to talk to our team.</p>
          <WhatsAppButton
            label="Message DG Clinic on WhatsApp →"
            variant="light"
          />
        </div>
      </section>
    </>
  );
}
