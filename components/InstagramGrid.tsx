import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

// Real tiles pulled from the clinic's own @dg.clinic.hnw feed (Round 4
// feedback) — replaces the earlier AI-generated placeholders. Sourced
// straight from Instagram, so no need to re-clear these with the team.
const TILES = [
  { src: "/images/instagram/founder-portrait.jpg", alt: "Meet the man behind Denish Gunawan Clinic" },
  { src: "/images/instagram/home-iv-care.jpg", alt: "Professional IV care at home with a doctor" },
  { src: "/images/instagram/osteoarthritis-tip.jpg", alt: "Is it just aging or osteoarthritis?" },
  { src: "/images/instagram/weight-loss-strategy.jpg", alt: "Weight loss strategy tips" },
  { src: "/images/instagram/hair-regrowth-results.jpg", alt: "Exosome hair regrowth results" },
  { src: "/images/instagram/duometabolic-teaser.jpg", alt: "DuoMetabolic+ weight loss injection" },
  { src: "/images/instagram/secretome-therapy.jpg", alt: "Secretome therapy for anti-aging and health" },
  { src: "/images/instagram/exosome-pricelist.jpg", alt: "Exosome treatment price list" },
];

export default function InstagramGrid() {
  return (
    <div className="dk-instagram-grid">
      {TILES.map((tile) => (
        <a
          key={tile.src}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="dk-instagram-tile"
          aria-label={`${INSTAGRAM_HANDLE} on Instagram`}
        >
          <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
        </a>
      ))}
    </div>
  );
}
