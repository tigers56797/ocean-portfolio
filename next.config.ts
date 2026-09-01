import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Motion packages resolve consistently (Turbopack + webpack)
  transpilePackages: ["framer-motion", "motion-dom", "motion-utils"],
};

export default nextConfig;
