import type { NextConfig } from "next";

const isStaticExport = process.env.BUILD_TARGET === "static";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isProduction = process.env.NODE_ENV === "production";
const scriptSource = isProduction
  ? "'self' 'unsafe-inline'"
  : "'self' 'unsafe-inline' 'unsafe-eval'";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' mailto:",
  `script-src ${scriptSource}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://www.instagram.com https://www.google.com",
  "media-src 'self'",
].join("; ");

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
  ...(isStaticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=()",
                },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Content-Security-Policy", value: contentSecurityPolicy },
                ...(isProduction
                  ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
                  : []),
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
