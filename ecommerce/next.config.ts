import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/sanity-studio/dist/:path*',
      },
    ]
  },
};

export default nextConfig;
