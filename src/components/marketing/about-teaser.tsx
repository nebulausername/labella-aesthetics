import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AboutTeaser() {
  const t = useTranslations('about');
  const points = [t('point1'), t('point2'), t('point3')];

  return (
    <Section id="about" surface>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image placeholder */}
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
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">{t('title')}</h2>
            <p className="leading-relaxed text-body">{t('body')}</p>
            <ul className="flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-body">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-gold text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Link href="/ueber-uns" className={cn(buttonVariants({ variant: 'ghost' }))}>
                {t('cta')}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
