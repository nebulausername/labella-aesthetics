import {
  Sparkles,
  Droplets,
  Waves,
  Syringe,
  Zap,
  HeartPulse,
  type LucideIcon,
} from 'lucide-react';

/** Maps the icon key stored in the service catalog to a lucide icon component. */
export const serviceIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  droplets: Droplets,
  waves: Waves,
  syringe: Syringe,
  zap: Zap,
  heartpulse: HeartPulse,
};
