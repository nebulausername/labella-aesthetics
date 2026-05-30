import { Reveal } from '@/components/motion/reveal';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** Slim hero used at the top of inner marketing pages. */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-36 text-center md:px-10 lg:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gold-soft blur-[130px]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.08]">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-muted">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
