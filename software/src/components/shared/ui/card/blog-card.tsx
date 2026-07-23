import { cn } from '@/src/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

export interface BlogCardProps {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  author: string;
  authorImageSrc: string;
  date: string;
  category: string;
  /** Applied to the root article (e.g. grid column spans). */
  className?: string;
  articleClassName?: string;
}

const formatDisplayDate = (isoDate: string) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path
      d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
      stroke="#F8F9FA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11 1.5V3.5" stroke="#F8F9FA" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 1.5V3.5" stroke="#F8F9FA" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5.5H13.5" stroke="#F8F9FA" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BlogCard: FC<BlogCardProps> = ({
  title,
  href,
  imageSrc,
  imageAlt = 'blog-post-img',
  author,
  authorImageSrc,
  date,
  category,
  className,
  articleClassName,
}) => {
  return (
    <article
      data-opai-animate
      className={cn(
        'group underline-hover-effect bg-background-6 border-stroke-3/25 rounded-2xl border px-4 pt-4 pb-6',
        articleClassName,
        className
      )}
    >
      <Link href={href}>
        <figure className="h-[370px] max-w-full overflow-hidden rounded-lg md:h-[400px] lg:h-[430px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={430}
            className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-104 group-hover:rotate-1"
          />
        </figure>
      </Link>
      <div className="pt-4 pl-3">
        <span className="text-tagline-4 from-background-3 to-background-5 border-stroke-3/25 inline-flex items-center rounded-2xl border bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-6 py-1 text-white">
          {category}
        </span>
        <div className="mt-4.5 mb-2.5 flex items-center gap-x-2">
          <div className="flex items-center gap-x-3.5">
            <figure className="size-11 overflow-hidden rounded-full">
              <Image
                src={authorImageSrc}
                alt={author}
                width={44}
                height={44}
                className="size-full object-cover"
              />
            </figure>
            <div className="space-y-0.5">
              <h4 className="font-inter-tight text-tagline-3 text-white/90">{author}</h4>
              <p className="font-inter-tight text-tagline-4 flex items-center justify-center gap-x-[5px] font-normal text-white/90">
                <span>
                  <CalendarIcon />
                </span>
                <span>{formatDisplayDate(date)}</span>
              </p>
            </div>
          </div>
        </div>
        <Link href={href} className="blog-title block">
          <h3 className="text-sora-heading-6 block font-normal text-white/90">{title}</h3>
        </Link>
      </div>
    </article>
  );
};

export { BlogCard };
