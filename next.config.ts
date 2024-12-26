import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: "commondatastorage.googleapis.com",
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
