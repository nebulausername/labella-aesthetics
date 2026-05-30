import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  // German (default) is served at "/", English at "/en/...".
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
