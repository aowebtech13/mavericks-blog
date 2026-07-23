'use client';

import RevealAnimation from '@/src/components/animation/reveal-animation';
import { TextReveal } from '@/src/components/animation/text-reveal-animation';
import PricingToggle from '@/src/components/pricing/pricing-toggle';
import PricingCard from '@/src/components/shared/ui/card/pricing-card';
import { pricingPlans, type Billing } from '@/src/data/pricing';
import { cn } from '@/src/utils/cn';
import { useState } from 'react';

const Pricing = ({ className }: { className?: string }) => {
  const [period, setPeriod] = useState<Billing>('monthly');

  return (
    <section className={cn('py-[80px] md:py-[120px] xl:py-[176px]', className)}>
      <div className="main-container">
        <div className="space-y-24">
          <div className="mx-auto w-full max-w-[786px] space-y-28 text-center">
            <div className="space-y-4">
              <div className="space-y-3">
                <TextReveal>
                  <h2 className="font-sora md:text-sora-heading-3 text-sora-heading-4 lg:text-sora-heading-2 text-white/90">
                    Simple pricing for AI‑powered keyword research
                  </h2>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <p className="font-inter-tight text-tagline-2 font-normal text-white/60">
                    Pick a plan that fits how your team discovers, clusters, and ships SEO content.
                  </p>
                </TextReveal>
              </div>
            </div>

            <RevealAnimation delay={0.2}>
              <PricingToggle period={period} onPeriodChange={setPeriod} />
            </RevealAnimation>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-y-14 md:flex-row md:gap-x-14 md:gap-y-0"
            aria-label="Pricing plans"
          >
            {pricingPlans.map((plan, index) => (
              <RevealAnimation key={plan.id} delay={(index + 1) * 0.1}>
                <PricingCard plan={plan} period={period} />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
