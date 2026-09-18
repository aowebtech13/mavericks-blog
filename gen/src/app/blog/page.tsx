import FeaturedArticles from '@/src/components/blog/featured-articles';
import BlogHero from '@/src/components/blog/blog-hero';
import type { BlogPost, BlogCategory } from '@/src/interface';
import type { ApiPost } from '@/src/interface/api';
import { apiPostsToBlogPosts, buildDateRecordsFromPosts } from '@/src/utils/apiTransformers';
import { getPosts } from '@/src/services/posts';
import { getCategories } from '@/src/services/categories';
import { apiCategoriesToBlogCategories } from '@/src/utils/apiTransformers';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog ~Deploy specialized AI agents ',
  description:
    'Insights, tips, and trends from maverisks on SEO, keyword research, and AI-powered content.',
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
    date?: string | string[];
    page?: string | string[];
  }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams;

  // Fetch categories first (needed for category ID lookup)
  let categories: BlogCategory[] = [];
  try {
    const apiCategories = await getCategories();
    categories = apiCategoriesToBlogCategories(apiCategories);
  } catch {
    // Categories are non-critical
  }

  // Determine filter values
  const categoryName = params.category
    ? (typeof params.category === 'string' ? params.category : params.category[0])
    : null;
  const searchValue = params.search
    ? (typeof params.search === 'string' ? params.search : params.search[0])
    : null;
  const dateValue = params.date
    ? (typeof params.date === 'string' ? params.date : params.date[0])
    : null;

  // Look up category ID from categories list
  const categoryId = categoryName
    ? categories.find((c) => c.label === categoryName)?.slug
      ? categories.find((c) => c.label === categoryName)!.id
        ? undefined
        : undefined
      : undefined
    : undefined;

  // Fetch posts from API (paginated, with optional filters)
  const apiQueryParams: Record<string, string | number> = {};
  if (categoryName) {
    const cat = categories.find((c) => c.label === categoryName);
    if (cat) {
      apiQueryParams.category = cat.id;
    }
  }
  if (searchValue) apiQueryParams.q = searchValue;
  if (params.page) apiQueryParams.page = typeof params.page === 'string' ? params.page : params.page[0];
  apiQueryParams.per_page = 6;

  let posts: BlogPost[] = [];
  let allPosts: BlogPost[] = [];
  let totalPages = 1;
  let currentPage = 1;
  let dateRecords: { date: string; displayDate: string; count: number }[] = [];
  let fetchError = false;

  try {
    const apiResponse = await getPosts(apiQueryParams);
    const apiPosts: ApiPost[] = apiResponse.data;
    allPosts = apiPostsToBlogPosts(apiPosts);
    totalPages = apiResponse.meta.last_page;
    currentPage = apiResponse.meta.current_page;
    posts = allPosts;
  } catch {
    // Backend unavailable — render with empty state
    fetchError = true;
  }

  // Build date records from fetched posts (if any)
  if (!fetchError) {
    dateRecords = buildDateRecordsFromPosts(allPosts);
  }

  const filterType = categoryName ? 'category' : searchValue ? 'search' : dateValue ? 'date' : null;

  // Find the slug for the current category from the categories list
  const currentCategorySlug = filterType === 'category' && categories.length > 0
    ? (categories.find((c) => c.label === categoryName)?.slug ?? null)
    : null;

  return (
    <>
      <BlogHero />
      <FeaturedArticles
        posts={posts}
        allPosts={allPosts}
        totalPages={totalPages}
        currentPage={currentPage}
        categories={categories}
        dateRecords={dateRecords}
        currentCategory={filterType === 'category' ? categoryName : null}
        currentCategorySlug={currentCategorySlug}
        currentSearch={filterType === 'search' ? searchValue : null}
        currentDate={filterType === 'date' ? dateValue : null}
      />
    </>
  );
};

export default BlogPage;
