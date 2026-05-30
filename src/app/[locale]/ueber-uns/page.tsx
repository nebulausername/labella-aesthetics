import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { BookingCta } from '@/components/marketing/booking-cta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return { title: t('metaTitle'), description: t('metaDescription') };
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

export default async function AboutPage() {
  const t = await getTranslations('aboutPage');
  const values = t.raw('values') as { title: string; text: string }[];
  const team = t.raw('team') as { name: string; role: string; bio: string }[];

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-bg-elevated to-bg-base">
              <div
                aria-hidden
                className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold-soft blur-3xl"
              />
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-5xl italic text-gold">La Bella</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-5">
              <p className="text-[1.0625rem] leading-relaxed text-body">{t('story1')}</p>
              <p className="leading-relaxed text-muted">{t('story2')}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section surface>
        <h2 className="mb-10 text-center text-[clamp(1.75rem,3vw,2.5rem)]">{t('valuesTitle')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-3 rounded-md border border-border-subtle bg-bg-base p-8">
                <h3 className="text-xl text-heading">{value.title}</h3>
                <p className="leading-relaxed text-muted">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section id="team">
        <SectionHeading title={t('teamTitle')} subtitle={t('teamSubtitle')} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-4 rounded-md border border-border-subtle bg-bg-surface p-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border-gold bg-bg-elevated font-display text-2xl text-gold">
                  {initials(member.name)}
                </div>
                <div>
                  <h3 className="text-xl text-heading">{member.name}</h3>
                  <p className="text-sm text-gold">{member.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <BookingCta />
    </>
  );
}
