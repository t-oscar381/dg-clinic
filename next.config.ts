import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Supabase Storage — Instagram feed images
        // (docs/HANDOFF-instagram-feed.md). Wildcarded to *.supabase.co
        // rather than the literal project host so this doesn't need
        // editing if the project ever moves.
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    // Legacy URL from the previous site structure.
    return [
      {
        source: "/stem-cell-weight-loss",
        destination: "/regenerative-therapy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
