import type { Locale } from '@/i18n/routing';

/** A value translated into every supported locale (mirrors the future DB JSON columns). */
export type Localized<T = string> = Record<Locale, T>;

/** Resolve a localized field for the active locale, falling back to German. */
export function pickLocale<T>(field: Localized<T>, locale: string, fallback: Locale = 'de'): T {
  return (field as Record<string, T>)[locale] ?? field[fallback];
}
