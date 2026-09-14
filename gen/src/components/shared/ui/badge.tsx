import { cn } from '@/src/utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'font-inter-tight text-tagline-4 inline-block bg-(image:--color-gradient-23) bg-clip-text text-transparent',
      className
    )}
    {...props}
  >
    {children}
  </span>
));

Badge.displayName = 'Badge';
export default Badge;
