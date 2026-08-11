import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy URL from the previous site structure.
      {
        source: "/stem-cell-weight-loss",
        destination: "/regenerative-therapy",
        permanent: true,
      },
      // HNW Concierge merged into Request Consultation — same audience,
      // same intake (docs/FEEDBACK-LOG.md Round 3).
      {
        source: "/hnw-concierge",
        destination: "/service-area",
        permanent: true,
      },
      {
        source: "/id/hnw-concierge",
        destination: "/id/service-area",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
