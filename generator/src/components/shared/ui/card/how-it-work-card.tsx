import { cn } from '@/src/utils/cn';

const HowItWorkCard = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-background-5 border-stroke-1/11 sticky top-24 mx-auto h-[300px] w-full max-w-[300px] rounded-2xl border p-5 sm:max-w-[350px] md:h-[400px] md:max-w-[600px] md:p-8 lg:h-[457px] lg:max-w-[650px] lg:p-[42px]',
        className
      )}
    >
      <div className="space-y-2">
        <h3
          id="card-heading-1"
          className="font-inter-tight text-it-heading-6 md:text-it-heading-5 text-white"
        >
          {title}
        </h3>
        <p className="font-inter-tight text-tagline-3 md:text-tagline-2 font-normal text-white/60">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorkCard;
