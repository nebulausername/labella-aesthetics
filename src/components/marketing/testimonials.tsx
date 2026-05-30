import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';

interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
}

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col gap-5 rounded-md border border-border-subtle bg-bg-surface p-8">
              <Quote className="h-8 w-8 text-gold" />
              <blockquote className="flex-1 font-display text-lg italic leading-relaxed text-heading">
                “{item.quote}”
              </blockquote>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <figcaption className="text-sm">
                <span className="font-semibold text-champagne">{item.name}</span>
                <span className="text-muted"> · {item.treatment}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
