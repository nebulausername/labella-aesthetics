import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile exists in the home directory).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Add Vercel Blob / OAuth avatar hosts here once uploads are wired (Milestone 2+).
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
