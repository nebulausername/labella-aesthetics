import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock, type LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/marketing/contact-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function ContactPage() {
  const t = await getTranslations('contactPage');
  const tf = await getTranslations('footer');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info + map */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2rem)]">{t('infoTitle')}</h2>
              <ul className="flex flex-col gap-5">
                <InfoRow Icon={MapPin} label={t('addressLabel')} value={tf('address')} />
                <InfoRow
                  Icon={Phone}
                  label={t('phoneLabel')}
                  value="+49 89 123 456 78"
                  href="tel:+498912345678"
                />
                <InfoRow
                  Icon={Mail}
                  label={t('emailLabel')}
                  value={t('email')}
                  href={`mailto:${t('email')}`}
                />
                <InfoRow Icon={Clock} label={t('hoursLabel')} value={tf('hours')} />
              </ul>
            </div>

            <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-bg-surface">
              <div className="flex flex-col items-center gap-2 px-6 text-center">
                <MapPin className="h-8 w-8 text-gold" />
                <p className="text-sm text-muted">{t('mapNote')}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-border-subtle bg-bg-surface p-8">
            <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2rem)]">{t('formTitle')}</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="text-body">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <li>
      <a href={href} className="inline-block transition-opacity hover:opacity-80">
        {content}
      </a>
    </li>
  ) : (
    <li>{content}</li>
  );
}
