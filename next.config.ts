import type { NextConfig } from "next";

const ASO_HOST = process.env.ASO_HOST || "http://localhost:8017";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/aso",
        destination: `${ASO_HOST}/`,
      },
      {
        source: "/aso/:path*",
        destination: `${ASO_HOST}/:path*`,
      },
    ];
  },
};

export default nextConfig;
