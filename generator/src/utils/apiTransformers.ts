import type { ApiCategory, ApiPost, ApiTag } from '@/src/interface/api';
import type { BlogCategory, BlogDateRecord, BlogPost } from '@/src/interface';

/**
 * Map an API post to the BlogPost interface used by existing components.
 */
export function apiPostToBlogPost(apiPost: ApiPost): BlogPost {
  return {
    slug: apiPost.slug,
    content: apiPost.content,
    title: apiPost.title,
    author: apiPost.user?.name ?? 'Unknown',
    authorImage: apiPost.user?.name
      ? `/images/opai-avatar-img-01.png` // fallback avatar
      : `/images/opai-avatar-img-01.png`,
    category: apiPost.category?.name ?? undefined,
    publishDate: apiPost.published_at ?? apiPost.created_at,
    readTime: estimateReadTime(apiPost.content),
    thumbnail: apiPost.featured_image ?? '/images/blog-placeholder.jpg',
    tags: apiPost.tags?.map((t: ApiTag) => t.name) ?? [],
    description: apiPost.excerpt ?? undefined,
    featured: false,
    popular: false,
    // Keep original API data accessible
    _apiPost: apiPost,
  };
}

/**
 * Map an array of API posts to BlogPost array.
 */
export function apiPostsToBlogPosts(apiPosts: ApiPost[]): BlogPost[] {
  return apiPosts.map(apiPostToBlogPost);
}

/**
 * Estimate read time from content string (roughly 200 words per minute).
 */
function estimateReadTime(content: string): string {
  const wordCount = content?.split(/\s+/).length ?? 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Build BlogCategory[] from API categories.
 */
export function apiCategoriesToBlogCategories(categories: ApiCategory[]): BlogCategory[] {
  return categories.map((cat) => ({
    label: cat.name,
    count: cat.posts_count ?? 0,
  }));
}

/**
 * Build date records (for sidebar PastRecords) from API posts.
 */
export function buildDateRecordsFromPosts(posts: BlogPost[]): BlogDateRecord[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    const month = post.publishDate?.slice(0, 7);
    if (!month) continue;
    counts.set(month, (counts.get(month) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([date, count]) => ({
      date,
      displayDate: new Date(date + '-01').toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      count,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

