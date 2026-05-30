import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, getLocale } from 'next-intl/server';
import { Clock, Euro, Check, Plus, ArrowLeft, type LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/ui/section';
import { buttonVariants } from '@/components/ui/button';
import { ServiceCard } from '@/components/marketing/service-card';
import { getService, getRelatedServices } from '@/content/services';
import { serviceIcons } from '@/lib/service-icons';
import { pickLocale } from '@/lib/i18n-content';
import { cn } from '@/lib/utils';

function formatPrice(cents: number, locale: string) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-IE' : 'de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${pickLocale(service.name, locale)} — La Bella Aesthetics`,
    description: pickLocale(service.description, locale),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations('treatments');
  const tc = await getTranslations('common');
  const locale = await getLocale();
  const Icon = serviceIcons[service.icon];
  const related = getRelatedServices(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-36 md:px-10 lg:pb-16 lg:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-gold-soft blur-[120px]"
        />
        <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Link
              href="/behandlungen"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne"
            >
              <ArrowLeft className="h-4 w-4" /> {t('title')}
            </Link>
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border-gold text-gold">
              <Icon className="h-8 w-8" strokeWidth={1.25} />
            </span>
            <div>
              <span className="eyebrow">{pickLocale(service.tagline, locale)}</span>
              <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.5rem)] font-medium">
                {pickLocale(service.name, locale)}
              </h1>
            </div>
            <p className="max-w-xl leading-relaxed text-body">
              {pickLocale(service.description, locale)}
            </p>
            <div className="flex flex-wrap gap-8 pt-2">
              <Meta
                label={t('durationLabel')}
                value={`${service.durationMinutes} ${tc('minutesShort')}`}
                Icon={Clock}
              />
              <Meta
                label={t('priceFromLabel')}
                value={`${tc('from')} ${formatPrice(service.priceFromCents, locale)}`}
                Icon={Euro}
              />
            </div>
            <div className="pt-2">
              <Link href="/termin" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
                {t('bookCta')}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div aria-hidden className="absolute inset-0 -z-10 rounded-[2rem] bg-gold-soft blur-3xl" />
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-border-gold bg-gradient-to-b from-bg-elevated to-bg-base">
              <Icon className="h-20 w-20 text-gold" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + process */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2rem)]">{t('benefitsTitle')}</h2>
            <ul className="flex flex-col gap-3">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-body">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-gold text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {pickLocale(benefit, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2rem)]">{t('processTitle')}</h2>
            <ol className="flex flex-col gap-6">
              {service.process.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-gold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg text-heading">{pickLocale(step.title, locale)}</h3>
                    <p className="text-muted">{pickLocale(step.text, locale)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section surface>
        <h2 className="mb-8 text-center text-[clamp(1.5rem,2.5vw,2rem)]">{t('faqTitle')}</h2>
        <div className="mx-auto max-w-3xl">
          {service.faq.map((entry, i) => (
            <details key={i} className="group border-b border-border-subtle py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-heading [&::-webkit-details-marker]:hidden">
                {pickLocale(entry.q, locale)}
                <Plus className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{pickLocale(entry.a, locale)}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Related */}
      <Section>
        <h2 className="mb-8 text-center text-[clamp(1.5rem,2.5vw,2rem)]">{t('relatedTitle')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((s) => (
            <ServiceCard
              key={s.slug}
              Icon={serviceIcons[s.icon]}
              title={pickLocale(s.name, locale)}
              description={pickLocale(s.tagline, locale)}
              href={`/behandlungen/${s.slug}`}
              cta={tc('readMore')}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

function Meta({ label, value, Icon }: { label: string; value: string; Icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        <span className="text-sm text-champagne">{value}</span>
      </div>
    </div>
  );
}
