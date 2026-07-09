import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
