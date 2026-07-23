import { cn } from '@/src/utils/cn';

export interface ResultCardProps {
  shapeClass: string;
  title: string;
  content: string;
  className?: string;
}

const ResultCard = ({ shapeClass, title, content, className }: ResultCardProps) => (
  <div
    className={cn(
      'bg-stroke-1/11 relative h-[350px] w-full overflow-hidden rounded-2xl p-px xl:h-[381px]',
      className
    )}
  >
    <div className="ai-kw-generator-border-animation size-[40px]" aria-hidden />

    <div
      className={cn(
        'from-background-3 to-background-5 relative z-20 h-[348px] w-full space-y-12 rounded-2xl bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-12 xl:h-[379px]'
      )}
    >
      <div className="flex h-full flex-col items-center justify-between text-center">
        <div className={cn(shapeClass, 'block text-[40px] text-white/80')} aria-hidden />
        <div className="space-y-1">
          <h3 className="font-space-grotesk text-sg-heading-6 font-normal text-white">{title}</h3>
          <p className="font-inter-tight text-tagline-2 font-normal text-white/60">{content}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ResultCard;
