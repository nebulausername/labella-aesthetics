import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export function ServiceCard({ Icon, title, description, href, cta }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-5 rounded-md border border-border-subtle bg-bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-border-gold hover:bg-bg-elevated"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-border-gold text-gold">
        <Icon className="h-7 w-7" strokeWidth={1.25} />
      </span>
      <h3 className="text-2xl">{title}</h3>
      <p className="flex-1 leading-relaxed text-muted">{description}</p>
      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
