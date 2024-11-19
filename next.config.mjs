/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:3030/:path*'
      },
    ];
  },
}; // next.config.js

export default nextConfig;
