'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const t = useTranslations('contactPage');
  const [sent, setSent] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // UI only for now — wired to Resend / a server action in a later milestone.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-md border border-border-gold bg-gold-soft p-6 text-center text-champagne">
        {t('successNote')}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field label={t('fieldName')} name="name" required />
      <Field label={t('fieldEmail')} name="email" type="email" required />
      <Field label={t('fieldPhone')} name="phone" type="tel" />
      <label className="flex flex-col gap-2 text-sm text-muted">
        {t('fieldMessage')}
        <textarea
          name="message"
          required
          rows={4}
          className="rounded-sm border border-border-default bg-bg-base px-4 py-3 text-body outline-none transition-colors placeholder:text-muted focus:border-gold"
        />
      </label>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-gold" />
        <span>{t('consent')}</span>
      </label>
      <Button type="submit" className="mt-2 self-start">
        {t('submit')}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-sm border border-border-default bg-bg-base px-4 text-body outline-none transition-colors placeholder:text-muted focus:border-gold"
      />
    </label>
  );
}
