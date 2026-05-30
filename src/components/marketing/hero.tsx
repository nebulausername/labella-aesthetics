import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:pb-28 lg:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gold-soft blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="eyebrow">{t('eyebrow')}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[1.05]">
              {t('titleLead')}{' '}
              <span className="italic text-gold">{t('titleHighlight')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-[1.125rem] leading-relaxed text-body">{t('subtitle')}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-2 flex flex-wrap gap-4">
              <Link href="/termin" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
                {t('ctaPrimary')}
              </Link>
              <Link
                href="/behandlungen"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[2rem] bg-gold-soft blur-3xl"
            />
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-border-gold bg-gradient-to-b from-bg-elevated to-bg-base">
              <span className="font-display text-7xl text-gold">LB</span>
              <span className="text-[0.65rem] uppercase tracking-[0.4em] text-muted">
                Premium Aesthetics
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
