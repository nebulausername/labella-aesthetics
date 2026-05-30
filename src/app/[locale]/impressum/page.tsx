import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalShell } from '@/components/layout/legal-shell';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return { title: `${t('imprintTitle')} — La Bella Aesthetics`, robots: { index: false } };
}

export default async function ImpressumPage() {
  const t = await getTranslations('legal');

  return (
    <LegalShell title={t('imprintTitle')} reviewNote={t('reviewNote')}>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        La Bella Aesthetics
        <br />
        [Inhaber:in / Firmenname]
        <br />
        Maximilianstraße 1
        <br />
        80539 München
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 89 123 456 78
        <br />
        E-Mail: hallo@labella-aesthetics.de
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: [USt-IdNr.]</p>

      <h2>Berufsbezeichnung &amp; berufsrechtliche Regelungen</h2>
      <p>[ggf. Berufsbezeichnung, zuständige Kammer / Aufsichtsbehörde und deren Anschrift]</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>[Name, Anschrift]</p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalShell>
  );
}
