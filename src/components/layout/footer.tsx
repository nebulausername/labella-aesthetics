import { useLocale, useTranslations } from 'next-intl';
import { Instagram, Facebook, MapPin, Clock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LocaleSwitcher } from './locale-switcher';
import { getFeaturedServices } from '@/content/services';
import { pickLocale } from '@/lib/i18n-content';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const services = getFeaturedServices().map((s) => ({
    label: pickLocale(s.name, locale),
    href: `/behandlungen/${s.slug}`,
  }));
  const company = [
    { label: t('linkAbout'), href: '/ueber-uns' },
    { label: t('linkGallery'), href: '/galerie' },
    { label: t('linkContact'), href: '/kontakt' },
  ];
  const legal = [
    { label: t('imprint'), href: '/impressum' },
    { label: t('privacy'), href: '/datenschutz' },
    { label: t('terms'), href: '/agb' },
  ];

  return (
    <footer className="border-t border-border-subtle bg-bg-surface">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-[0.18em] text-gold">LA BELLA</span>
              <span className="text-[0.6rem] tracking-[0.42em] text-muted">AESTHETICS</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">{t('tagline')}</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-border-gold hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-muted transition-colors hover:border-border-gold hover:text-gold"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title={t('colServices')} links={services} />
          <FooterColumn title={t('colCompany')} links={company} />

          <div className="flex flex-col gap-5">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-champagne">
                {t('addressTitle')}
              </h3>
              <p className="flex items-start gap-2 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {t('address')}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-champagne">
                {t('hoursTitle')}
              </h3>
              <p className="flex items-start gap-2 text-sm text-muted">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {t('hours')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-sm text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} La Bella Aesthetics. {t('rights')}
          </p>
          <div className="flex items-center gap-6">
            <ul className="flex gap-5">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-champagne">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-champagne">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted transition-colors hover:text-champagne">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
