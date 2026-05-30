import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { ServiceCard } from '@/components/marketing/service-card';
import { BookingCta } from '@/components/marketing/booking-cta';
import { serviceCategories, services } from '@/content/services';
import { serviceIcons } from '@/lib/service-icons';
import { pickLocale } from '@/lib/i18n-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatments' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function TreatmentsPage() {
  const t = await getTranslations('treatments');
  const tc = await getTranslations('common');
  const locale = await getLocale();

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section>
        <div className="flex flex-col gap-16">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.categoryKey === category.key);
            if (items.length === 0) return null;
            return (
              <div key={category.key}>
                <h2 className="mb-8 text-[clamp(1.5rem,2.5vw,2rem)]">
                  {pickLocale(category.name, locale)}
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {items.map((service, i) => (
                    <Reveal key={service.slug} delay={i * 0.08}>
                      <ServiceCard
                        Icon={serviceIcons[service.icon]}
                        title={pickLocale(service.name, locale)}
                        description={pickLocale(service.tagline, locale)}
                        href={`/behandlungen/${service.slug}`}
                        cta={tc('readMore')}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
