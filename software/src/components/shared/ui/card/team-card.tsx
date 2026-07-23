import { cn } from '@/src/utils/cn';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

export interface TeamCardProps {
  name: string;
  position: string;
  image: StaticImageData | string;
  href?: string;
  className?: string;
}

const TeamCard = ({ name, position, image, href, className }: TeamCardProps) => {
  return (
    <div
      className={cn(
        'group relative h-[400px] w-full overflow-hidden rounded-2xl xl:h-[532px]',
        className
      )}
    >
      <figure
        className="absolute inset-0 overflow-hidden rounded-2xl"
        aria-label={`Profile of ${name}`}
      >
        <Image
          src={image}
          alt={`${name}, ${position}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </figure>

      <div className="absolute bottom-8 left-8 z-20 opacity-100 transition-all duration-500 ease-in-out lg:bottom-4 lg:opacity-0 lg:group-hover:bottom-8 lg:group-hover:opacity-100">
        <Link href={href ?? '#'}>
          <h3 className="font-inter-tight text-tagline-2 font-semibold text-white">{name}</h3>
        </Link>
        <p className="font-inter-tight text-tagline-3 font-semibold text-white/60">{position}</p>
      </div>

      <div
        className="absolute bottom-0 left-0 z-10 size-full bg-linear-[180deg,rgba(0,0,0,0.00)_62.22%,#000_100%] opacity-100 transition-opacity duration-500 ease-in-out lg:opacity-0 lg:group-hover:opacity-100"
        aria-hidden
      />
    </div>
  );
};

export default TeamCard;
