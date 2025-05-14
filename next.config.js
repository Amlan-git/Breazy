/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable webpack disk cache to prevent corruption
  webpack: (config) => {
    config.cache = {
      type: 'memory'
    };
    return config;
  }
};

module.exports = nextConfig;