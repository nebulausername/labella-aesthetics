import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'rounded-pill bg-gold text-on-gold hover:bg-gold-bright hover:shadow-gold-glow active:scale-[0.99]',
        secondary:
          'rounded-pill border border-border-gold text-champagne hover:bg-gold-soft active:scale-[0.99]',
        ghost: 'rounded-pill text-body hover:bg-gold-soft hover:text-heading',
      },
      size: {
        sm: 'h-10 px-5 text-xs',
        md: 'h-12 px-7 text-sm',
        lg: 'h-14 px-9 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
