import { CheckIcon } from '@/src/components/shared/icon';
import PrimaryLinkButton from '@/src/components/shared/ui/button/primary-link-button';
import type { Billing, PricingPlan } from '@/src/data/pricing';
import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import { forwardRef } from 'react';

export interface PricingCardProps {
  plan: PricingPlan;
  period: Billing;
}

const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(function PricingCard(
  { plan, period },
  ref
) {
  const isPro = plan.id === 'pro';

  return (
    <div ref={ref} className="w-full md:basis-[542px]">
      <div
        className={cn(
          'relative',
          isPro && 'overflow-hidden rounded-2xl shadow-[10px_20px_100px_0_rgba(255,107,81,0.20)]'
        )}
      >
        {isPro ? (
          <figure className="absolute right-[-309px] bottom-[-340px] z-10 h-[680px] w-[740px] overflow-hidden">
            <Image
              src="/images/gradient/opai-4.png"
              alt=""
              width={740}
              height={680}
              className="size-full object-cover"
            />
          </figure>
        ) : null}

        <div
          className={cn(
            'pricing-card bg-background-6 border-stroke-1/11 rounded-2xl border py-[52px]',
            isPro && 'relative z-20'
          )}
        >
          <div className="space-y-8">
            <div className="border-stroke-1/11 space-y-6 border-b px-7 pb-8 lg:px-[52px]">
              <div className={cn(isPro && 'flex items-center justify-between gap-4')}>
                <div className="min-w-0 space-y-1">
                  <h3 className="font-sora text-sora-heading-5 font-medium text-white/90">
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      'font-inter-tight text-tagline-2 font-normal text-white/60',
                      plan.descriptionClampPro && 'line-clamp-2 lg:line-clamp-1'
                    )}
                  >
                    {plan.description}
                  </p>
                </div>
                {isPro && plan.badge ? (
                  <span className="bg-opai-lemon text-background-5 text-tagline-4 shrink-0 rounded-full px-4 py-2">
                    {plan.badge}
                  </span>
                ) : null}
              </div>

              <div>
                {(Object.keys(plan.prices) as Billing[]).map((key) => {
                  const active = period === key;
                  const { crossed, price: priceDigits } = plan.prices[key];
                  return (
                    <h4
                      key={key}
                      className={cn('flex items-end space-x-4', !active && 'hidden')}
                      aria-hidden={!active}
                    >
                      <span className="font-inter-tight text-it-heading-6 relative z-30 h-[30px] font-medium text-white/60">
                        ${crossed}
                        <span className="absolute top-1/2 left-0 z-10 h-px w-[92%] -translate-y-1/2 bg-white" />
                      </span>
                      <span className="font-sora text-sora-heading-4 font-medium text-white/90">
                        <span className="text-sora-heading-6 font-medium">$</span>
                        {priceDigits}
                      </span>
                    </h4>
                  );
                })}
              </div>
            </div>

            <div className={cn('space-y-12 px-7 lg:px-[52px]', isPro && 'relative z-20')}>
              <div className="space-y-4">
                <h5 className="font-inter-tight text-tagline-2 font-normal text-white/90">
                  {plan.featuresHeading}
                </h5>
                <ul className="space-y-4 py-2">
                  {plan.features.map((text) => (
                    <li
                      key={text}
                      className="font-inter-tight text-tagline-2 flex items-center justify-start gap-x-4 text-left font-normal text-white/90"
                    >
                      <span className="flex size-4 items-center justify-center">
                        <CheckIcon className="h-2 w-3 stroke-white/90" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <PrimaryLinkButton
                href={plan.cta.href}
                wrapperClassName="block w-full"
                className="w-full"
              >
                {plan.cta.label}
              </PrimaryLinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PricingCard;
