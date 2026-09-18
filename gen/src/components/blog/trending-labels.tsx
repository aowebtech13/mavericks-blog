import { cn } from '@/src/utils/cn';
import Link from 'next/link';

interface TrendingLabelItem {
  label: string;
  slug: string;
  count: number;
}

interface TrendingLabelsProps {
  items: TrendingLabelItem[];
  currentCategory: string | null;
}

interface TrendingLabelLinkProps {
  label: string;
  isActive: boolean;
}

function TrendingLabelLink({ label, isActive, slug }: Readonly<TrendingLabelLinkProps> & { slug?: string }) {
  const href =
    label === 'All' || isActive
      ? '/blog'
      : slug
        ? `/blog/category/${slug}`
        : `/blog?category=${encodeURIComponent(label)}`;
  return (
    <Link
      href={href}
      className={cn(
        'text-tagline-3 rounded-full px-5 py-[9px] font-normal',
        isActive
          ? 'text-background-5 bg-white'
          : 'border-stroke-3/25 hover:text-background-5 border text-white transition-all duration-500 hover:bg-white'
      )}
    >
      {label}
    </Link>
  );
}

function TrendingLabels({ items, currentCategory }: Readonly<TrendingLabelsProps>) {
  const allIsActive = currentCategory === null;

  return (
    <div>
      <p className="lg:text-sora-heading-5 text-sora-heading-6 mb-6 font-normal text-white/90">
        Trending label
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <TrendingLabelLink label="All" isActive={allIsActive} />
        {items.map((item) => (
          <TrendingLabelLink
            key={item.slug}
            label={item.label}
            isActive={currentCategory === item.label}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default TrendingLabels;
