import FeaturedArticles from '@/src/components/blog/featured-articles';
import BlogHero from '@/src/components/blog/blog-hero';
import type { BlogPost, BlogCategory } from '@/src/interface';
import type { ApiPost } from '@/src/interface/api';
import { apiPostsToBlogPosts, buildDateRecordsFromPosts } from '@/src/utils/apiTransformers';
import { getPosts } from '@/src/services/posts';
import { getCategories } from '@/src/services/categories';
import { apiCategoriesToBlogCategories } from '@/src/utils/apiTransformers';
import { getCategoryBySlug } from '@/src/services/categories';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string | string[];
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (category) {
      return {
        title: `${category.name} - Blog | MavericksAI`,
        description: `Browse posts in the ${category.name} category.`,
      };
    }
  } catch {
    // Fall through to default
  }
  return { title: `Category - Blog | MavericksAI` };
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const paramsSearch = await searchParams;

  // Fetch category info by slug
  let categoryId: number | null = null;
  let categoryName = slug;
  let categoryFound = false;

  try {
    const category = await getCategoryBySlug(slug);
    if (category) {
      categoryId = category.id;
      categoryName = category.name;
      categoryFound = true;
    }
  } catch {
    // Category fetch failed — proceed with slug as fallback name
  }

  if (!categoryFound) {
    notFound();
  }

  // Fetch posts filtered by category ID
  let posts: BlogPost[] = [];
  let allPosts: BlogPost[] = [];
  let totalPages = 1;
  let currentPage = 1;
  let categories: BlogCategory[] = [];
  let dateRecords: { date: string; displayDate: string; count: number }[] = [];
  let fetchError = false;

  try {
    const apiQueryParams: Record<string, string | number> = {
      category: categoryId ?? '',
      per_page: 6,
    };
    if (paramsSearch.page) apiQueryParams.page = typeof paramsSearch.page === 'string' ? paramsSearch.page : paramsSearch.page[0];

    const apiResponse = await getPosts(apiQueryParams);
    const apiPosts: ApiPost[] = apiResponse.data;
    allPosts = apiPostsToBlogPosts(apiPosts);
    totalPages = apiResponse.meta.last_page;
    currentPage = apiResponse.meta.current_page;
    posts = allPosts;
  } catch {
    fetchError = true;
  }

  try {
    const apiCategories = await getCategories();
    categories = apiCategoriesToBlogCategories(apiCategories);
  } catch {
    // Categories are non-critical
  }

  if (!fetchError) {
    dateRecords = buildDateRecordsFromPosts(allPosts);
  }

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
        currentCategory={categoryName}
        currentCategorySlug={slug}
        currentSearch={null}
        currentDate={null}
      />
    </>
  );
};

export default CategoryPage;

