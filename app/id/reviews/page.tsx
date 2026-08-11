import type { Metadata } from "next";
import { getPublishedReviews } from "@/lib/cms";
import { WHATSAPP_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ulasan — DG Clinic, Jakarta",
  description:
    "Pengalaman pasien tentang pemesanan, kunjungan, dan perawatan yang dipimpin dokter di rumah bersama DG Clinic.",
};

// Reviews themselves are CMS content (see docs/FEEDBACK-LOG.md A1) and
// are not currently tagged by language, so this page shows whatever is
// published — same source as /reviews. Only the page shell is
// translated for this first A2 pass.
export default async function ReviewsPageId() {
  const reviews = await getPublishedReviews();

  return (
    <>
      <section className="hero container center dk-page-hero">
        <span className="eyebrow">Ulasan</span>
        <h1>Bagaimana Rasanya Menjadi Pasien Kami</h1>
        <p className="lede">
          Pemesanan, kunjungan itu sendiri, dan bagaimana rasanya dirawat di
          rumah — dalam kata-kata pasien kami.
        </p>
      </section>

      <section className="section-tight container">
        {reviews.length === 0 ? (
          <p className="center" style={{ opacity: 0.6 }}>
            Ulasan akan segera hadir — hubungi kami di{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            jika Anda ingin mendengar langsung dari pasien sebelumnya.
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
