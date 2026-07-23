export type Billing = 'monthly' | 'quarterly' | 'yearly';

export type PricingPlanId = 'starter' | 'pro';

export interface PlanPriceTier {
  crossed: string;
  price: string;
}

export interface PricingPlan {
  id: PricingPlanId;
  name: string;
  description: string;
  /** Tighter line clamp on the Pro card header description */
  descriptionClampPro?: boolean;
  prices: Record<Billing, PlanPriceTier>;
  featuresHeading: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Best for startup and small teams',
    prices: {
      monthly: { crossed: '29', price: '19' },
      quarterly: { crossed: '87', price: '49' },
      yearly: { crossed: '116', price: '69' },
    },
    featuresHeading: 'Starter includes:',
    features: [
      'Up to 10,000 keyword credits per month',
      '5 active projects across domains or clients',
      'AI keyword suggestions for up to 5 languages',
      'SERP overview and basic difficulty scores',
      'CSV export of keyword lists and clusters',
      'Email support with 48‑hour response time',
    ],
    cta: { label: 'Get started', href: '/contact' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for growing businesses and teams',
    descriptionClampPro: true,
    badge: 'Popular',
    prices: {
      monthly: { crossed: '79', price: '49' },
      quarterly: { crossed: '237', price: '129' },
      yearly: { crossed: '948', price: '399' },
    },
    featuresHeading: 'Pro includes everything in Starter, plus:',
    features: [
      '100,000+ keyword credits per month',
      'Unlimited projects and workspaces',
      'One‑click keyword clustering and topic grouping',
      'Content brief generation for every keyword cluster',
      'Team seats with role‑based access control',
      'Priority chat support and onboarding call',
    ],
    cta: { label: 'Buy Now', href: '/contact' },
  },
];
