import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Static HTML export mode — enabled only when BUILD_STATIC=true.
// Used to produce a portable `out/` bundle for offline review. Does NOT
// affect the normal (Vercel) build.
const isStaticExport = process.env.BUILD_STATIC === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
    remotePatterns: [
      // Placeholder host for demo imagery — swap/remove before launch.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
