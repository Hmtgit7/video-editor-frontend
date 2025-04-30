import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bypass type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  // Other configs remain the same
};

export default nextConfig;
