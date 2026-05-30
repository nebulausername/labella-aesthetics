import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { ServiceCard } from './service-card';
import { getFeaturedServices } from '@/content/services';
import { pickLocale } from '@/lib/i18n-content';
import { serviceIcons } from '@/lib/service-icons';
import { cn } from '@/lib/utils';

export function Services() {
  const t = useTranslations('services');
  const tc = useTranslations('common');
  const locale = useLocale();
  const featured = getFeaturedServices();

  return (
    <Section id="services">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {featured.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.1}>
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

      <div className="mt-12 flex justify-center">
        <Link href="/behandlungen" className={cn(buttonVariants({ variant: 'ghost' }))}>
          {t('cta')}
        </Link>
      </div>
    </Section>
  );
}
