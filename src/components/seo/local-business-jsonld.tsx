import { siteName, siteUrl } from '@/lib/site';

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: siteName,
    description: 'Premium Ästhetik- und Kosmetikbehandlungen in München.',
    url: siteUrl,
    telephone: '+49 89 123 456 78',
    email: 'hallo@labella-aesthetics.de',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Maximilianstraße 1',
      postalCode: '80539',
      addressLocality: 'München',
      addressCountry: 'DE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 48.1391, longitude: 11.5802 },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: ['https://instagram.com', 'https://facebook.com'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
