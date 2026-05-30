'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'lb-cookie-consent';

export function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — fail silently */
    }
  }, []);

  function decide(value: 'all' | 'necessary') {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-border-default bg-bg-elevated/95 p-5 shadow-elevated backdrop-blur-md md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted">
          <p className="mb-1 font-semibold text-champagne">{t('title')}</p>
          <p>
            {t('message')}{' '}
            <Link href="/datenschutz" className="text-gold hover:underline">
              {t('privacy')}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide('necessary')}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            {t('reject')}
          </button>
          <button
            type="button"
            onClick={() => decide('all')}
            className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
