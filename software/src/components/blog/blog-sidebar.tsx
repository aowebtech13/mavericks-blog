import RevealAnimation from '@/src/components/animation/reveal-animation';
import BlogSearchBox from '@/src/components/blog/blog-search-box';
import Categories from '@/src/components/blog/categories';
import PastRecords from '@/src/components/blog/past-records';
import RecentArticles from '@/src/components/blog/recent-articles';
import TrendingLabels from '@/src/components/blog/trending-labels';
import type { BlogCategory, BlogDateRecord, BlogPost } from '@/src/interface';

interface BlogSidebarProps {
  posts?: BlogPost[];
  categories: BlogCategory[];
  dateRecords: BlogDateRecord[];
  currentCategory: string | null;
  currentSearch: string | null;
  currentDate: string | null;
}

const BlogSidebar = ({
  posts = [],
  categories,
  dateRecords,
  currentCategory,
  currentSearch,
  currentDate,
}: BlogSidebarProps) => {
  return (
    <RevealAnimation delay={0.1}>
      <aside
        className="border-stroke-1/11 from-background-3 to-background-5 w-full max-w-full space-y-[70px] rounded-lg border bg-radial-[52.78%_57.9%_at_3.87%_7.86%] px-8 py-10.5 lg:max-w-[370px]"
        aria-label="Blog filters and recent articles"
      >
        <BlogSearchBox defaultValue={currentSearch ?? ''} />

        <Categories
          items={categories}
          currentCategory={currentCategory}
          totalCount={posts.length}
        />

        <RecentArticles posts={posts} limit={3} />

        <TrendingLabels items={categories} currentCategory={currentCategory} />

        <PastRecords records={dateRecords} currentDate={currentDate} totalCount={posts.length} />
      </aside>
    </RevealAnimation>
  );
};

export default BlogSidebar;
