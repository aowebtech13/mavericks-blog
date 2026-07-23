import FeaturedArticles from '@/src/components/blog/featured-articles';
import BlogHero from '@/src/components/blog/blog-hero';
import CTA from '@/src/components/shared/cta';
import type { BlogPost } from '@/src/interface';
import type { ApiPost } from '@/src/interface/api';
import {
  getCurrentPage,
  getTotalPages,
  paginatePosts,
} from '@/src/utils/blogFilters';
import { apiPostsToBlogPosts, buildDateRecordsFromPosts } from '@/src/utils/apiTransformers';
import { getPosts } from '@/src/services/posts';
import { getCategories } from '@/src/services/categories';
import { apiCategoriesToBlogCategories } from '@/src/utils/apiTransformers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI Keyword Generator | maverisks',
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

  const apiResponse = await getPosts(apiQueryParams);
  const apiPosts: ApiPost[] = apiResponse.data;
  const allPosts = apiPostsToBlogPosts(apiPosts);
  const totalPages = apiResponse.meta.last_page;
  const currentPage = apiResponse.meta.current_page;
  const posts = allPosts; // API already paginates, so the current page's posts are the data

  // Fetch categories
  const apiCategories = await getCategories();
  const categories = apiCategoriesToBlogCategories(apiCategories);

  // Build date records from fetched posts
  const dateRecords = buildDateRecordsFromPosts(allPosts);

  const filterValue = typeof params.category === 'string' ? params.category :
                      typeof params.search === 'string' ? params.search :
                      typeof params.date === 'string' ? params.date : null;
  const filterType = params.category ? 'category' : params.search ? 'search' : params.date ? 'date' : null;

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
        currentSearch={filterType === 'search' ? filterValue : null}
        currentDate={filterType === 'date' ? filterValue : null}
      />
      <CTA />
    </>
  );
};

export default BlogPage;
