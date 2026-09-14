import { cn } from '@/src/utils/cn';
import Link from 'next/link';

interface CategoryItem {
  label: string;
  count: number;
}

interface CategoriesProps {
  items: CategoryItem[];
  currentCategory: string | null;
  totalCount?: number;
}

const Categories = ({ items, currentCategory, totalCount = 0 }: CategoriesProps) => {
  return (
    <div>
      <p className="lg:text-sora-heading-5 text-sora-heading-6 mb-6 font-normal text-white/90">
        Categories
      </p>
      <ul>
        <li>
          <Link
            href="/blog"
            aria-current={currentCategory === null ? 'page' : undefined}
            className={cn(
              'flex items-center justify-between rounded-md p-2 transition-all duration-500',
              currentCategory === null
                ? 'bg-background-7 text-background-13'
                : 'text-white/60 hover:bg-background-7 hover:text-background-13'
            )}
          >
            <span>All</span>
            <span>({Number.isFinite(totalCount) ? totalCount : 0})</span>
          </Link>
        </li>
        {items.map(({ label, count }) => {
          const isSelected = currentCategory === label;
          return (
            <li key={label}>
              <Link
                href={isSelected ? '/blog' : `/blog?category=${encodeURIComponent(label)}`}
                aria-current={isSelected ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between rounded-md p-2 transition-all duration-500',
                  isSelected
                    ? 'bg-background-7 text-background-13'
                    : 'text-white/60 hover:bg-background-7 hover:text-background-13'
                )}
              >
                <span>{label}</span>
                <span>({Number.isFinite(count) ? count : 0})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
