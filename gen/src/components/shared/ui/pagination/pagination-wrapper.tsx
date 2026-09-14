import { cn } from '@/src/utils/cn';
import type { ReactNode } from 'react';

type PaginationWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const PaginationWrapper = ({ children, className }: PaginationWrapperProps) => {
  return (
    <ul
      data-opai-animate
      data-delay="0.1"
      className={cn('flex items-center justify-center gap-x-2 md:justify-start', className)}
    >
      {children}
    </ul>
  );
};
