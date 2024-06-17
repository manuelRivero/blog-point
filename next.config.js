/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'app','styles')],
      },
      typescript: {
        ignoreBuildErrors: true,
     },
}

module.exports = nextConfig
