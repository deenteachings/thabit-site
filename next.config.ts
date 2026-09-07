import type { NextConfig } from "next";

const ASO_HOST = process.env.ASO_HOST || "http://localhost:8017";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // /aso itself is a real page (app/aso/page.tsx); everything under it
        // that is not that page is served by the asokit engine.
        source: "/aso/:path+",
        destination: `${ASO_HOST}/:path*`,
      },
    ];
  },
};

export default nextConfig;
