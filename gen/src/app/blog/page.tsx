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

  // Fetch posts from API (paginated, with optional filters)
  const apiQueryParams: Record<string, string | number> = {};
  if (params.category) apiQueryParams.category = typeof params.category === 'string' ? params.category : params.category[0];
  if (params.search) apiQueryParams.q = typeof params.search === 'string' ? params.search : params.search[0];
  if (params.page) apiQueryParams.page = typeof params.page === 'string' ? params.page : params.page[0];
  apiQueryParams.per_page = 6;

  let posts: BlogPost[] = [];
  let allPosts: BlogPost[] = [];
  let totalPages = 1;
  let currentPage = 1;
  let categories: BlogCategory[] = [];
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

  try {
    const apiCategories = await getCategories();
    categories = apiCategoriesToBlogCategories(apiCategories);
  } catch {
    // Categories are non-critical — silently fall back to empty array
  }

  // Build date records from fetched posts (if any)
  if (!fetchError) {
    dateRecords = buildDateRecordsFromPosts(allPosts);
  }

  const filterValue = typeof params.category === 'string' ? params.category :
                      typeof params.search === 'string' ? params.search :
                      typeof params.date === 'string' ? params.date : null;
  const filterType = params.category ? 'category' : params.search ? 'search' : params.date ? 'date' : null;

  // Find the slug for the current category from the categories list
  const currentCategorySlug = filterType === 'category' && categories.length > 0
    ? (categories.find((c) => c.label === filterValue)?.slug ?? null)
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
        currentCategory={filterType === 'category' ? filterValue : null}
        currentCategorySlug={currentCategorySlug}
        currentSearch={filterType === 'search' ? filterValue : null}
        currentDate={filterType === 'date' ? filterValue : null}
      />
    </>
  );
};

export default BlogPage;
