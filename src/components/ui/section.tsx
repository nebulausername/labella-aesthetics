import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Lift the section onto the slightly lighter surface colour. */
  surface?: boolean;
}

export function Section({ id, className, surface, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'px-6 py-[clamp(5rem,10vw,9rem)] md:px-10',
        surface && 'bg-bg-surface',
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'mx-auto max-w-2xl items-center text-center',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)]">{title}</h2>
      {subtitle && (
        <p className="text-[1.0625rem] leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
