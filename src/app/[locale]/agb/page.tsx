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
  return { title: `${t('termsTitle')} — La Bella Aesthetics`, robots: { index: false } };
}

export default async function AgbPage() {
  const t = await getTranslations('legal');

  return (
    <LegalShell title={t('termsTitle')} reviewNote={t('reviewNote')}>
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Behandlungen und Leistungen von La
        Bella Aesthetics sowie für Buchungen über diese Website.
      </p>

      <h2>2. Leistungen</h2>
      <p>
        Wir erbringen ästhetische und kosmetische Behandlungen. Der konkrete Leistungsumfang ergibt
        sich aus der jeweiligen Behandlungsbeschreibung und dem persönlichen Beratungsgespräch.
      </p>

      <h2>3. Terminbuchung &amp; Anzahlung</h2>
      <p>
        Termine können online gebucht werden. Zur verbindlichen Reservierung kann eine Anzahlung
        erforderlich sein, die auf den Behandlungspreis angerechnet wird.
      </p>

      <h2>4. Stornierung &amp; Umbuchung</h2>
      <p>
        Termine können bis 24 Stunden vor dem Termin kostenfrei storniert oder umgebucht werden. Bei
        späterer Stornierung oder Nichterscheinen kann die geleistete Anzahlung einbehalten werden.
      </p>

      <h2>5. Gutscheine</h2>
      <p>
        Gutscheine sind ab Ausstellungsdatum gültig und nicht in bar auszahlbar. Es gilt die
        gesetzliche Verjährungsfrist.
      </p>

      <h2>6. Haftung</h2>
      <p>
        Wir haften nach den gesetzlichen Bestimmungen. Für die Eignung einer Behandlung ist das
        persönliche Beratungsgespräch maßgeblich; bitte informiere uns über relevante gesundheitliche
        Umstände.
      </p>

      <h2>7. Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen unwirksam
        sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalShell>
  );
}
