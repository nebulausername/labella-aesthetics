import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';

interface FaqItem {
  q: string;
  a: string;
}

export function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <Section id="faq" surface>
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

      <div className="mx-auto mt-12 max-w-3xl">
        {items.map((item, i) => (
          <details
            key={i}
            className="group border-b border-border-subtle py-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-heading [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
