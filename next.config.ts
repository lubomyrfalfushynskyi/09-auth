import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://notehub-public.goit.study/api/:path*',
      },
    ];
  },
};

export default nextConfig;
