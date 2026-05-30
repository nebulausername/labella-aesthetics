import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { BookingWizard } from '@/components/booking/booking-wizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bookingPage' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function BookingPage() {
  const t = await getTranslations('bookingPage');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <Section>
        <BookingWizard />
      </Section>
    </>
  );
}
