import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  // Explizite Locale-Prefixe: Deutsch unter "/de", Englisch unter "/en", "/"
  // leitet auf "/de". "always" statt "as-needed", weil das prefixlose
  // Default-Locale-Routing in der Produktion (next start) eine Redirect-Loop
  // auslöst (next-intl + Next 15.5). So funktioniert die Seite zuverlässig.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
