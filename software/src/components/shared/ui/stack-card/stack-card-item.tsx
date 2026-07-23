import { cn } from '@/src/utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface StackCardItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const StackCardItem = forwardRef<HTMLDivElement, StackCardItemProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props} data-stack-card-item>
      {children}
    </div>
  ),
);

StackCardItem.displayName = 'StackCardItem';
