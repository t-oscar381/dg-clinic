import type { Metadata } from "next";
import { getPublishedReviews } from "@/lib/cms";
import { WHATSAPP_URL } from "@/lib/site";

// Always fresh so a newly published review appears immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews — Denish Gunawan Clinic, Jakarta",
  description:
    "What patients say about booking, the visit, and having doctor-led care at home with Denish Gunawan Clinic.",
};

// Service-experience testimonials only — never treatment outcomes.
// See docs/FEEDBACK-LOG.md §Reviews for the content rule these are
// written under; the admin editor (components/admin/PostForm.tsx)
// enforces the same constraint at entry.
export default async function ReviewsPage() {
  const reviews = await getPublishedReviews();

  return (
    <>
      <section className="hero container center dk-page-hero">
        <span className="eyebrow">Reviews</span>
        <h1>What It&rsquo;s Like to Be a Patient</h1>
        <p className="lede">
          Booking, the visit itself, and what care at home actually feels
          like — in patients&rsquo; own words.
        </p>
      </section>

      <section className="section-tight container">
        {reviews.length === 0 ? (
          <p className="center" style={{ opacity: 0.6 }}>
            Reviews are on their way — message us on{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            if you&rsquo;d like to hear from past patients directly.
          </p>
        ) : (
          <div className="review-grid">
            {reviews.map((review) => (
              <div className="review-card" key={review.id}>
                <blockquote>{review.body}</blockquote>
                <cite>— {review.title}</cite>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
