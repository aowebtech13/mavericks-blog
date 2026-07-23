import { cn } from '@/src/utils/cn';
import { forwardRef } from 'react';

export interface KeywordIconCardProps {
  title: string;
  description: string;
  iconShape: string;
  className?: string;
}

const KeywordIconCard = forwardRef<HTMLDivElement, KeywordIconCardProps>(
  ({ title, description, iconShape, className }, ref) => (
    <div
      ref={ref}
      className={cn('w-full max-w-[305px] space-y-4 text-center md:text-left', className)}
    >
      <span className={cn(iconShape, 'inline-block text-[48px] text-white')} aria-hidden />
      <div className="space-y-1">
        <h3 className="font-space-grotesk text-sg-heading-6 text-white">{title}</h3>
        <p className="font-inter-tight text-tagline-2 font-normal text-white/60">{description}</p>
      </div>
    </div>
  ),
);

KeywordIconCard.displayName = 'KeywordIconCard';

export default KeywordIconCard;
