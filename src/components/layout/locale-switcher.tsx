'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn('flex items-center gap-1 text-xs font-semibold', className)}>
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-border-default">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'uppercase tracking-wider transition-colors',
              l === locale ? 'text-gold' : 'text-muted hover:text-champagne'
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
