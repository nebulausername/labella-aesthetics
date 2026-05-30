import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';

export function LegalShell({
  title,
  reviewNote,
  children,
}: {
  title: string;
  reviewNote: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero title={title} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-start gap-3 rounded-md border border-border-default bg-bg-surface p-4 text-sm text-muted">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{reviewNote}</span>
          </div>
          <div className="flex flex-col gap-4 [&_a]:text-gold [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-heading [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted [&_li]:mt-1">
            {children}
          </div>
        </div>
      </Section>
    </>
  );
}
