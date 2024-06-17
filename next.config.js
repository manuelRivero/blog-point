/** @type {import('next').NextConfig} */
const path = require('path')
// Configuration object tells the next-pwa plugin 
const withPWA = require("next-pwa")({
  dest: "public", // Destination directory for the PWA files
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});
const nextConfig = {
  reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'app','styles')],
      },
      typescript: {
        ignoreBuildErrors: true,
     },
}

module.exports = withPWA(nextConfig);
