'use client';

import { cn } from '@/src/utils/cn';
import { forwardRef, useCallback, useId, useLayoutEffect, useRef } from 'react';

import type { Billing } from '@/src/data/pricing';

export type { Billing } from '@/src/data/pricing';

type PricingToggleProps = {
  period: Billing;
  onPeriodChange: (period: Billing) => void;
};

const PricingToggle = forwardRef<HTMLDivElement, PricingToggleProps>(function PricingToggle(
  { period, onPeriodChange },
  ref,
) {
  const id = useId();
  const groupName = `pricing-toggle-${id}`;
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  const activeTabRef = useRef<HTMLDivElement>(null);
  const monthlyTabRef = useRef<HTMLLabelElement>(null);
  const quarterlyTabRef = useRef<HTMLLabelElement>(null);
  const yearlyTabRef = useRef<HTMLLabelElement>(null);

  const updateActivePill = useCallback(() => {
    const fieldset = fieldsetRef.current;
    const active = activeTabRef.current;
    let target: HTMLLabelElement | null = null;
    if (period === 'monthly') target = monthlyTabRef.current;
    else if (period === 'quarterly') target = quarterlyTabRef.current;
    else target = yearlyTabRef.current;

    if (!fieldset || !active || !target) return;

    const left = target.offsetLeft;
    const width = target.offsetWidth;
    const height = target.offsetHeight;

    active.style.width = `${width}px`;
    active.style.height = `${height}px`;
    active.style.transform = `translateX(${left}px)`;
  }, [period]);

  useLayoutEffect(() => {
    updateActivePill();
  }, [updateActivePill]);

  const labelClass = (value: Billing) =>
    cn(
      'font-inter-tight text-tagline-2 relative z-20 flex h-9  cursor-pointer items-center justify-center rounded-full px-4 py-1 font-normal transition-colors duration-300',
      period === value ? 'text-background-5' : 'text-white/60 bg-background-5'
    );

  return (
    <div ref={ref} className="mx-auto max-h-11 w-full max-w-[337px]">
      <form className="pricing-form" onSubmit={(e) => e.preventDefault()}>
        <fieldset
          ref={fieldsetRef}
          className="bg-background-4 relative inline-flex gap-x-1 rounded-full p-1 backdrop-blur-[20px]"
        >
          <legend className="sr-only">Choose billing period</legend>

          <input
            type="radio"
            name={groupName}
            id={`${id}-monthly`}
            value="monthly"
            className="peer/monthly sr-only"
            checked={period === 'monthly'}
            onChange={() => onPeriodChange('monthly')}
          />
          <input
            type="radio"
            name={groupName}
            id={`${id}-quarterly`}
            value="quarterly"
            className="peer/quarterly sr-only"
            checked={period === 'quarterly'}
            onChange={() => onPeriodChange('quarterly')}
          />
          <input
            type="radio"
            name={groupName}
            id={`${id}-yearly`}
            value="yearly"
            className="peer/yearly sr-only"
            checked={period === 'yearly'}
            onChange={() => onPeriodChange('yearly')}
          />

          <label ref={monthlyTabRef} htmlFor={`${id}-monthly`} className={labelClass('monthly')}>
            Monthly
          </label>
          <label
            ref={quarterlyTabRef}
            htmlFor={`${id}-quarterly`}
            className={labelClass('quarterly')}
          >
            Quarterly
          </label>
          <label
            ref={yearlyTabRef}
            htmlFor={`${id}-yearly`}
            className={cn(
              labelClass('yearly'),
              'w-full max-w-[136px] justify-between gap-x-2 py-0.5'
            )}
          >
            <span className="relative z-20">Yearly</span>
            <span className="bg-opai-lemon text-tagline-4 font-inter-tight text-background-5 relative z-20 shrink-0 rounded-full px-2 py-2 font-normal">
              Save 84%
            </span>
          </label>

          <div
            ref={activeTabRef}
            className="bg-background-7 pointer-events-none absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full transition-[transform,width,height] duration-300 ease-[power3.out]"
            aria-hidden
          />
        </fieldset>
      </form>
    </div>
  );
});

export default PricingToggle;
