/** @type {import('next').NextConfig} */
const { headers } = require("next/dist/client/components/headers");
const path = require("path");
// Configuration object tells the next-pwa plugin
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
const nextConfig = {
  headers: () => [
    {
      source: "/",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "app", "styles")],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withPWA(nextConfig);
