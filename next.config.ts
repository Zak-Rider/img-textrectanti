import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - turbopack options are not yet in the types
    turbopack: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
