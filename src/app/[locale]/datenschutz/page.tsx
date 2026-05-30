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
  return { title: `${t('privacyTitle')} — La Bella Aesthetics`, robots: { index: false } };
}

export default async function DatenschutzPage() {
  const t = await getTranslations('legal');

  return (
    <LegalShell title={t('privacyTitle')} reviewNote={t('reviewNote')}>
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist La Bella Aesthetics,
        Maximilianstraße 1, 80539 München. Kontakt: hallo@labella-aesthetics.de.
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
        funktionsfähigen Website sowie unserer Leistungen erforderlich ist und stets im Einklang mit
        der DSGVO.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Unsere Website wird bei einem externen Dienstleister gehostet. Beim Aufruf werden technisch
        notwendige Daten (z. B. IP-Adresse, Zeitpunkt) in Server-Logfiles verarbeitet (Art. 6 Abs. 1
        lit. f DSGVO). Schriften werden lokal von unserem Server ausgeliefert; es werden keine Daten
        an Google Fonts übertragen.
      </p>

      <h2>4. Cookies &amp; Einwilligung</h2>
      <p>
        Technisch notwendige Cookies setzen wir auf Grundlage unseres berechtigten Interesses ein.
        Für alle nicht notwendigen Cookies und eingebettete Dienste (z. B. Karten) holen wir vorab
        deine Einwilligung über unseren Cookie-Banner ein (Art. 6 Abs. 1 lit. a DSGVO, § 25 TDDDG).
      </p>

      <h2>5. Kontakt- und Buchungsformular</h2>
      <p>
        Wenn du uns über das Formular kontaktierst oder einen Termin buchst, verarbeiten wir die von
        dir angegebenen Daten zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>6. Online-Zahlung</h2>
      <p>
        Für Anzahlungen nutzen wir den Zahlungsdienstleister Stripe. Die Zahlungsdaten werden direkt
        an Stripe übermittelt; wir speichern keine vollständigen Kartendaten.
      </p>

      <h2>7. Newsletter (Double-Opt-in)</h2>
      <p>
        Für den Newsletter verwenden wir das Double-Opt-in-Verfahren: Nach deiner Anmeldung senden
        wir eine Bestätigungs-E-Mail; erst nach deiner Bestätigung erhältst du den Newsletter. Eine
        Abmeldung ist jederzeit über den Link in jeder E-Mail möglich.
      </p>

      <h2>8. Deine Rechte</h2>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2>9. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke
        erforderlich ist oder gesetzliche Aufbewahrungsfristen (z. B. handels- und steuerrechtlich)
        dies vorschreiben.
      </p>
    </LegalShell>
  );
}
