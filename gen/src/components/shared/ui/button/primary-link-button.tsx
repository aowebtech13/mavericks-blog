import { PrimaryButtonArrowIcon } from '@/src/components/shared/icon';
import { cn } from '@/src/utils/cn';
import Link from 'next/link';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

export interface PrimaryLinkButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Link>, 'className'> {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

const PrimaryLinkButton = forwardRef<HTMLAnchorElement, PrimaryLinkButtonProps>(
  ({ children, className, wrapperClassName, ...linkProps }, ref) => (
    <Link
      ref={ref}
      className={cn('inline-block', wrapperClassName)}
      {...linkProps}
    >
      <div
        className={cn(
          'group bg-background-7 hover:border-stroke-3/18 relative z-10 flex h-full max-h-12 cursor-pointer items-center justify-center rounded-full border border-transparent px-6 py-[15px] transition-all duration-300 ease-in-out',
          className,
        )}
      >
        <div className="relative flex items-center justify-start gap-x-2.5 overflow-hidden">
          <div
            className="bg-background-6 absolute left-0 size-4 translate-x-[-130%] rounded-full transition-transform duration-400 ease-in-out group-hover:translate-x-0"
            aria-hidden
          />
          <span className="font-ibm-plex-mono text-tagline-2 text-background-14 inline-block leading-[22.4px] font-medium text-nowrap transition-transform duration-400 ease-in-out group-hover:translate-x-[28px]">
            {children}
          </span>
          <span className="text-background-6 relative mt-px inline-block transition-transform duration-400 ease-in-out group-hover:translate-x-full">
            <PrimaryButtonArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  ),
);

PrimaryLinkButton.displayName = 'PrimaryLinkButton';

export default PrimaryLinkButton;
