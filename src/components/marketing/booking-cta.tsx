import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BookingCta() {
  const t = useTranslations('bookingCta');

  return (
    <section id="booking" className="px-6 py-[clamp(5rem,10vw,9rem)] md:px-10">
      <Reveal>
        <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center gap-6 overflow-hidden rounded-lg border border-border-subtle bg-bg-surface px-6 py-16 text-center md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft blur-[100px]"
          />
          <h2 className="relative max-w-2xl text-[clamp(1.875rem,3.5vw,3rem)]">{t('title')}</h2>
          <p className="relative max-w-xl leading-relaxed text-muted">{t('subtitle')}</p>
          <div className="relative mt-2 flex flex-col items-center gap-5 sm:flex-row">
            <Link href="/termin" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
              {t('cta')}
            </Link>
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span>
                {t('phoneLabel')}: <span className="text-champagne">{t('phone')}</span>
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
