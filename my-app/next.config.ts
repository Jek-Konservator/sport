import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
    swcPlugins: [["@effector/swc-plugin", {}]],
  },
};

export default nextConfig;
