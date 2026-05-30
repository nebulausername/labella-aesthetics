import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { services } from '@/content/services';
import { siteUrl } from '@/lib/site';

const STATIC_PATHS = ['', '/behandlungen', '/ueber-uns', '/galerie', '/kontakt', '/termin'];

function buildUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${siteUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...services.map((s) => `/behandlungen/${s.slug}`)];

  return paths.map((path) => ({
    url: buildUrl(routing.defaultLocale, path),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, buildUrl(l, path)])),
    },
  }));
}
