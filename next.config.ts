import type { NextConfig } from "next";

const isStaticExport = process.env.BUILD_TARGET === "static";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : "standalone",
  trailingSlash: isStaticExport,
  basePath: isStaticExport ? basePath : undefined,
  assetPrefix: isStaticExport ? basePath : undefined,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
