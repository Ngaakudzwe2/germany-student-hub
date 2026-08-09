import { Briefcase, CalendarCheck, FileText, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface ValueProp {
  icon: LucideIcon;
  text: string;
}

export const PRICING_VALUE_PROPS: ValueProp[] = [
  { icon: CalendarCheck, text: 'Unrestricted access to official appointment booking links & alerts' },
  {
    icon: FileText,
    text: 'Unlimited German Cover Letter (Bewerbungsschreiben) generator for landlord applications',
  },
  { icon: ShieldCheck, text: 'Verified housing marketplace & scam detection radar' },
  { icon: Briefcase, text: 'Student Job Board filters and direct application tools' },
];

export type TierId = 'trial' | 'weekly' | 'monthly';

export interface PricingTier {
  id: TierId;
  eyebrow: string;
  price: string;
  cadence: string;
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  { id: 'trial', eyebrow: 'Not sure yet?', price: 'Free', cadence: '7-day trial' },
  { id: 'weekly', eyebrow: 'Flexible', price: '€4.99', cadence: '/ week' },
  {
    id: 'monthly',
    eyebrow: 'Standard · Most Popular',
    price: '€9.99',
    cadence: '/ month',
    highlighted: true,
  },
];
