/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint 무시
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ TypeScript 오류 무시
  },
};

module.exports = nextConfig;
