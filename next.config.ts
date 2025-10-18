/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    resolveAlias: {},
  },
  experimental: {
    turbo: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
