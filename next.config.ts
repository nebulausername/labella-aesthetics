import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Demo läuft unter Unterpfad (demo.kaufmeinewebsite.de/labella) → basePath per
  // BASE_PATH-Env. Verkaufter ZIP-Build (kein BASE_PATH) bleibt Root-sauber.
  // Build UND `next start` brauchen dieselbe BASE_PATH. next-intl übernimmt den
  // basePath automatisch für seine Locale-Redirects.
  ...(process.env.BASE_PATH ? { basePath: process.env.BASE_PATH } : {}),
  // Pin the workspace root (a stray lockfile exists in the home directory).
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Add Vercel Blob / OAuth avatar hosts here once uploads are wired (Milestone 2+).
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
