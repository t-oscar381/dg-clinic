import Image from "next/image";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

// Static curated tiles for v1 — no API integration required, per
// docs/HANDOFF-rebrand.md §3.3. All images are AI-generated placeholders
// (see §4); none are captioned as real patients, staff, or treatments.
const TILES = [
  { src: "/images/dokden/hero-home-visit.webp", alt: "Home visit, doctor's bag in hand" },
  { src: "/images/dokden/trust-bag.webp", alt: "Physician's leather bag, still life" },
  { src: "/images/dokden/ig-living-room.webp", alt: "Sunlit home care living room" },
  { src: "/images/dokden/ig-smartphone.webp", alt: "Messaging the clinic from home" },
  { src: "/images/dokden/ig-syringe-prep.webp", alt: "Careful preparation before a visit" },
  { src: "/images/dokden/ig-lifestyle-collage.webp", alt: "At-home healthcare lifestyle" },
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
          <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 700px) 50vw, 16vw" />
        </a>
      ))}
    </div>
  );
}
