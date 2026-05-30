'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ArrowLeft, ArrowRight, Clock, Euro, CalendarCheck } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { services, getService } from '@/content/services';
import { staff } from '@/content/staff';
import { serviceIcons } from '@/lib/service-icons';
import { pickLocale } from '@/lib/i18n-content';
import { cn } from '@/lib/utils';

type StaffChoice = string | 'any';

function formatPrice(cents: number, locale: string) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-IE' : 'de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

interface DayOption {
  iso: string;
  label: string;
}

/** Deterministic mock slot availability (no Math.random → hydration-safe). */
function generateSlots(dateIso: string) {
  let seed = 0;
  for (let k = 0; k < dateIso.length; k++) seed = (seed + dateIso.charCodeAt(k)) % 97;
  const slots: { time: string; available: boolean }[] = [];
  for (let h = 10; h < 18; h++) {
    for (const m of [0, 30]) {
      const idx = (h - 10) * 2 + (m === 30 ? 1 : 0);
      slots.push({
        time: `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`,
        available: (seed + idx * 7) % 4 !== 0,
      });
    }
  }
  return slots;
}

export function BookingWizard() {
  const t = useTranslations('booking');
  const locale = useLocale();

  const stepLabels = [
    t('stepService'),
    t('stepStaff'),
    t('stepDate'),
    t('stepDetails'),
    t('stepSummary'),
  ];

  const [step, setStep] = React.useState(0);
  const [serviceSlug, setServiceSlug] = React.useState<string | null>(null);
  const [staffId, setStaffId] = React.useState<StaffChoice | null>(null);
  const [date, setDate] = React.useState<string | null>(null);
  const [time, setTime] = React.useState<string | null>(null);
  const [details, setDetails] = React.useState({ name: '', email: '', phone: '', note: '' });
  const [consent, setConsent] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  const [days, setDays] = React.useState<DayOption[]>([]);

  // Build the next 14 days client-side (avoids SSR/timezone hydration mismatch).
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
    const list: DayOption[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      list.push({ iso, label: fmt.format(d) });
    }
    setDays(list);
  }, [locale]);

  const service = serviceSlug ? getService(serviceSlug) : null;
  const slots = date ? generateSlots(date) : [];

  const canProceed = [
    serviceSlug !== null,
    staffId !== null,
    date !== null && time !== null,
    details.name.trim() !== '' && details.email.trim() !== '' && consent,
    true,
  ][step];

  function next() {
    if (step === 2 && !date && days[0]) setDate(days[0].iso);
    setStep((s) => Math.min(s + 1, 4));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl rounded-lg border border-border-gold bg-bg-surface p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border-gold text-gold">
          <CalendarCheck className="h-8 w-8" />
        </div>
        <h2 className="mb-3 text-2xl">{t('successTitle')}</h2>
        <p className="mb-6 leading-relaxed text-muted">
          {t('successText', { name: details.name || '—' })}
        </p>
        <p className="mb-8 rounded-md border border-border-subtle bg-bg-base p-4 text-sm leading-relaxed text-muted">
          {t('demoNote')}
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmed(false);
            setStep(0);
            setServiceSlug(null);
            setStaffId(null);
            setDate(null);
            setTime(null);
            setConsent(false);
            setDetails({ name: '', email: '', phone: '', note: '' });
          }}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          {t('newBooking')}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stepper */}
      <ol className="mb-10 flex items-center justify-between gap-2">
        {stepLabels.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors',
                i < step && 'border-border-gold bg-gold text-on-gold',
                i === step && 'border-border-gold text-gold',
                i > step && 'border-border-subtle text-muted'
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                'hidden text-xs sm:block',
                i === step ? 'text-champagne' : 'text-muted'
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="min-h-[320px]">
        {/* Step 0 — Service */}
        {step === 0 && (
          <Step title={t('chooseService')}>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon];
                const active = serviceSlug === s.slug;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setServiceSlug(s.slug)}
                    className={cn(
                      'flex items-start gap-4 rounded-md border bg-bg-surface p-5 text-left transition-all',
                      active
                        ? 'border-border-gold shadow-gold-glow'
                        : 'border-border-subtle hover:border-border-gold'
                    )}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-gold text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.25} />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-lg text-heading">
                        {pickLocale(s.name, locale)}
                      </span>
                      <span className="text-xs text-muted">
                        {s.durationMinutes} {t('minutesShort')} ·{' '}
                        {formatPrice(s.priceFromCents, locale)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Step>
        )}

        {/* Step 1 — Staff */}
        {step === 1 && (
          <Step title={t('chooseStaff')}>
            <div className="grid gap-4 sm:grid-cols-2">
              <StaffOption
                active={staffId === 'any'}
                onClick={() => setStaffId('any')}
                initials="✦"
                name={t('anyStaff')}
                role={t('anyStaffDesc')}
              />
              {staff.map((m) => (
                <StaffOption
                  key={m.id}
                  active={staffId === m.id}
                  onClick={() => setStaffId(m.id)}
                  initials={m.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                  name={m.name}
                  role={pickLocale(m.role, locale)}
                />
              ))}
            </div>
          </Step>
        )}

        {/* Step 2 — Date & time */}
        {step === 2 && (
          <Step title={t('chooseDate')}>
            <p className="mb-4 text-xs text-muted">{t('timezoneNote')}</p>
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => {
                    setDate(d.iso);
                    setTime(null);
                  }}
                  className={cn(
                    'shrink-0 rounded-md border px-4 py-2 text-sm transition-colors',
                    date === d.iso
                      ? 'border-border-gold bg-gold-soft text-champagne'
                      : 'border-border-subtle text-muted hover:border-border-gold'
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {date && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setTime(slot.time)}
                    className={cn(
                      'rounded-md border py-2 text-sm transition-colors',
                      time === slot.time && 'border-border-gold bg-gold text-on-gold',
                      time !== slot.time &&
                        slot.available &&
                        'border-border-subtle text-body hover:border-border-gold',
                      !slot.available &&
                        'cursor-not-allowed border-border-subtle text-muted/30 line-through'
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </Step>
        )}

        {/* Step 3 — Details */}
        {step === 3 && (
          <Step title={t('detailsTitle')}>
            <div className="flex flex-col gap-4">
              <WizardField
                label={t('fieldName')}
                value={details.name}
                onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
              />
              <WizardField
                label={t('fieldEmail')}
                type="email"
                value={details.email}
                onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
              />
              <WizardField
                label={t('fieldPhone')}
                type="tel"
                value={details.phone}
                onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
              />
              <label className="flex flex-col gap-2 text-sm text-muted">
                {t('fieldNote')}
                <textarea
                  rows={3}
                  value={details.note}
                  onChange={(e) => setDetails((d) => ({ ...d, note: e.target.value }))}
                  className="rounded-sm border border-border-default bg-bg-base px-4 py-3 text-body outline-none transition-colors focus:border-gold"
                />
              </label>
              <label className="flex items-start gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-gold"
                />
                <span>{t('consent')}</span>
              </label>
            </div>
          </Step>
        )}

        {/* Step 4 — Summary */}
        {step === 4 && service && (
          <Step title={t('summaryTitle')}>
            <dl className="flex flex-col divide-y divide-border-subtle rounded-md border border-border-subtle bg-bg-surface">
              <SummaryRow label={t('labelService')} value={pickLocale(service.name, locale)} />
              <SummaryRow
                label={t('labelStaff')}
                value={
                  staffId === 'any'
                    ? t('anyStaff')
                    : staff.find((s) => s.id === staffId)?.name ?? '—'
                }
              />
              <SummaryRow
                label={t('labelWhen')}
                value={`${days.find((d) => d.iso === date)?.label ?? date ?? ''} · ${time ?? ''}`}
                Icon={Clock}
              />
              <SummaryRow
                label={t('labelDuration')}
                value={`${service.durationMinutes} ${t('minutesShort')}`}
              />
              <SummaryRow
                label={t('labelDeposit')}
                value={formatPrice(service.depositCents, locale)}
                Icon={Euro}
              />
            </dl>
          </Step>
        )}
      </div>

      {/* Footer controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={cn(
            'inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne disabled:invisible'
          )}
        >
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </button>

        {step < 4 ? (
          <Button onClick={next} disabled={!canProceed}>
            {t('next')} <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setConfirmed(true)}>{t('confirm')}</Button>
        )}
      </div>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-center text-[clamp(1.375rem,2.5vw,1.875rem)]">{title}</h2>
      {children}
    </div>
  );
}

function StaffOption({
  active,
  onClick,
  initials,
  name,
  role,
}: {
  active: boolean;
  onClick: () => void;
  initials: string;
  name: string;
  role: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-md border bg-bg-surface p-5 text-left transition-all',
        active ? 'border-border-gold shadow-gold-glow' : 'border-border-subtle hover:border-border-gold'
      )}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-gold bg-bg-elevated font-display text-gold">
        {initials}
      </span>
      <span className="flex flex-col">
        <span className="text-heading">{name}</span>
        <span className="text-xs text-muted">{role}</span>
      </span>
    </button>
  );
}

function WizardField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-muted">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-sm border border-border-default bg-bg-base px-4 text-body outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function SummaryRow({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <dt className="flex items-center gap-2 text-sm text-muted">
        {Icon && <Icon className="h-4 w-4 text-gold" />}
        {label}
      </dt>
      <dd className="text-right text-champagne">{value}</dd>
    </div>
  );
}
