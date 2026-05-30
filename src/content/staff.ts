import type { Localized } from '@/lib/i18n-content';

export interface StaffMember {
  id: string;
  name: string;
  role: Localized;
}

/** Mock staff — replaced by DB-backed StaffMember records in a later milestone. */
export const staff: StaffMember[] = [
  {
    id: 'isabella',
    name: 'Isabella Romano',
    role: { de: 'Gründerin & Heilpraktikerin', en: 'Founder & Practitioner' },
  },
  {
    id: 'lena',
    name: 'Dr. Lena Vogt',
    role: { de: 'Ärztliche Leitung', en: 'Medical Director' },
  },
  {
    id: 'marie',
    name: 'Marie Keller',
    role: { de: 'Kosmetikerin', en: 'Aesthetician' },
  },
];
