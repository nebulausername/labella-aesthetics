import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { BookingCta } from '@/components/marketing/booking-cta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'galleryPage' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function GalleryPage() {
  const t = await getTranslations('galleryPage');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-border-subtle bg-gradient-to-br from-bg-elevated to-bg-surface">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-3xl italic text-gold/40">La Bella</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl rounded-md border border-border-subtle bg-bg-surface p-5 text-center text-sm leading-relaxed text-muted">
          {t('disclaimer')}
        </p>
      </Section>

      <BookingCta />
    </>
  );
}
