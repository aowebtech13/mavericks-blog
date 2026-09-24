import BlogHero from '@/src/components/blog/blog-hero';
import RecentPosts from '@/src/components/blog/recent-posts';
import type { BlogCategory } from '@/src/interface';
import type { ApiPost } from '@/src/interface/api';
import { apiPostsToBlogPosts } from '@/src/utils/apiTransformers';
import { getPosts } from '@/src/services/posts';
import { getCategories } from '@/src/services/categories';
import { apiCategoriesToBlogCategories } from '@/src/utils/apiTransformers';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Recent Posts ~Deploy specialized AI agents ',
  description:
    'Browse the most recently published posts on MavericksAI — fresh insights, tips, and trends.',
};

interface RecentPostsPageProps {
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

const RECENT_PER_PAGE = 12;

const RecentPostsPage = async ({ searchParams }: RecentPostsPageProps) => {
  const params = await searchParams;

  // Fetch categories (non-critical)
  let categories: BlogCategory[] = [];
  try {
    const apiCategories = await getCategories();
    categories = apiCategoriesToBlogCategories(apiCategories);
  } catch {
    // Categories are non-critical
  }

  const pageParam = params.page
    ? (typeof params.page === 'string' ? params.page : params.page[0])
    : null;
  const currentPage = pageParam ? Math.max(1, Number(pageParam) || 1) : 1;

  let posts: ApiPost[] = [];
  let totalPages = 1;

  try {
    const apiResponse = await getPosts({
      page: currentPage,
      per_page: RECENT_PER_PAGE,
    });
    posts = apiResponse.data;
    totalPages = apiResponse.meta.last_page;
  } catch {
    // Backend unavailable — render with empty state
  }

  const blogPosts = apiPostsToBlogPosts(posts);

  return (
    <>
      <BlogHero />
      <RecentPosts
        posts={blogPosts}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};

export default RecentPostsPage;