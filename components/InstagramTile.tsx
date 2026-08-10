"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/images/dokden/ig-fallback.webp";

/*
 * Layer 2 of the layered failsafe (docs/HANDOFF-instagram-feed.md §4.1):
 * the Storage object can vanish (bucket renamed, permissions changed,
 * network blip) independently of whatever the server rendered. This is
 * a client component specifically so onError can swap the <img> src
 * without ever touching — or being able to touch — the wrapping <a>.
 * The link is a plain prop, not conditional on load success.
 */
export default function InstagramTile({
  href,
  src,
  alt,
  ariaLabel,
}: {
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="dk-instagram-tile"
      aria-label={ariaLabel}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 700px) 50vw, 16vw"
        onError={() => {
          if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
        }}
      />
    </a>
  );
}
