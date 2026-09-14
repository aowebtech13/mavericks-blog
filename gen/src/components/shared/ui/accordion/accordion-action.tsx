'use client';

import { cn } from '@/src/utils/cn';
import { accordionDataState, useAccordion, useAccordionItemValue } from './accordion-context';
import { AccordionPlusIcon } from './accordion-plus-icon';

export interface AccordionActionProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionAction = ({ children, className }: AccordionActionProps) => {
  const { toggle, isOpen } = useAccordion();
  const itemValue = useAccordionItemValue();
  const open = isOpen(itemValue);

  const state = accordionDataState(open);

  return (
    <h3 className="accordion-action" data-state={state}>
      <button
        type="button"
        className={cn(
          'relative flex w-full cursor-pointer items-center justify-between text-left transition-all duration-300 ease-in-out',
          'font-inter-tight text-tagline-2 text-white focus:outline-none',
          className
        )}
        onClick={() => toggle(itemValue)}
        aria-expanded={open}
        aria-controls={`accordion-content-${itemValue}`}
        id={`accordion-action-${itemValue}`}
        data-state={state}
      >
        {children}
        <AccordionPlusIcon open={open} />
      </button>
    </h3>
  );
};
