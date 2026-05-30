'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { LocaleSwitcher } from './locale-switcher';
import { cn } from '@/lib/utils';

const NAV = [
  { key: 'services', href: '/behandlungen' },
  { key: 'about', href: '/ueber-uns' },
  { key: 'gallery', href: '/galerie' },
  { key: 'contact', href: '/kontakt' },
] as const;

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex flex-col leading-none">
      <span className="font-display text-xl tracking-[0.18em] text-gold">LA BELLA</span>
      <span className="text-[0.6rem] tracking-[0.42em] text-muted">AESTHETICS</span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border-subtle bg-bg-base/85 backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6 md:px-10">
        <Wordmark />

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'group relative text-sm transition-colors hover:text-champagne',
                isActive(item.href) ? 'text-champagne' : 'text-body'
              )}
            >
              {t(item.key)}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full',
                  isActive(item.href) ? 'w-full' : 'w-0'
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <Link href="/termin" className={cn(buttonVariants({ size: 'sm' }))}>
            {t('book')}
          </Link>
        </div>

        <button
          type="button"
          className="text-champagne md:hidden"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border-subtle bg-bg-base/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border-subtle py-4 font-display text-2xl text-heading"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-6 flex items-center justify-between">
              <LocaleSwitcher />
              <Link
                href="/termin"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: 'md' }))}
              >
                {t('book')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
