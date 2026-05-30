import { useTranslations } from 'next-intl';
import { ShieldCheck, Stethoscope, Users, MapPin } from 'lucide-react';

const ITEMS = [
  { key: 'certified', Icon: ShieldCheck },
  { key: 'medical', Icon: Stethoscope },
  { key: 'clients', Icon: Users },
  { key: 'central', Icon: MapPin },
] as const;

export function TrustBar() {
  const t = useTranslations('trust');

  return (
    <div className="border-y border-border-subtle bg-bg-surface/50">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6 md:justify-between md:px-10">
        {ITEMS.map(({ key, Icon }) => (
          <div key={key} className="flex items-center gap-3 text-sm text-muted">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <span>{t(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
