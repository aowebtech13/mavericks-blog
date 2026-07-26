import BlogDetailsContent from '@/src/components/blog-details/blog-details-content';
import RelatedBlog from '@/src/components/blog-details/related-blog';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import { getPost } from '@/src/services/posts';
import { apiPostToBlogPost, apiPostsToBlogPosts } from '@/src/utils/apiTransformers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const apiPost = await getPost(slug);
    return buildMetadata(`${apiPost.title} - AI Keyword Generator | maverisks`, apiPost.excerpt ?? undefined, `/blog/${slug}`);
  } catch {
    return buildMetadata('Post Not Found - AI Keyword Generator | maverisks', undefined, `/blog/${slug}`);
  }
}

const BlogSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let apiPost;
  let isNetworkError = false;

  try {
    apiPost = await getPost(slug);
  } catch (error) {
    // Differentiate between a 404 (not found) and a network error
    if (error instanceof Error && error.message.includes('Unable to reach')) {
      isNetworkError = true;
    } else {
      notFound();
    }
  }

  // Graceful fallback when backend is unreachable
  if (isNetworkError || !apiPost) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 text-center">
        <h1 className="text-sora-heading-3 mb-4 font-normal text-white/90">
          Unable to load this post
        </h1>
        <p className="text-tagline-2 mb-8 max-w-md font-normal text-white/60">
          We could not reach the server to retrieve this post. Please ensure the backend is
          running and try again.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/20"
        >
          &larr; Back to blog
        </Link>
      </section>
    );
  }

  const blogPost = apiPostToBlogPost(apiPost);
  const blog = {
    data: blogPost as unknown as Record<string, unknown>,
    content: apiPost.content,
  };

  // Fetch related posts (first page) — gracefully degrade on failure
  let allPosts: ReturnType<typeof apiPostsToBlogPosts> = [];
  try {
    const apiResponse = await import('@/src/services/posts').then(m => m.getPosts({ per_page: 10 }));
    allPosts = apiPostsToBlogPosts(apiResponse.data);
  } catch {
    // Related posts are non-critical — silently fall back to empty
  }

  return (
    <>
      <BlogDetailsContent blog={blog} />
      <RelatedBlog posts={allPosts} currentSlug={slug} />
    </>
  );
};

export default BlogSlugPage;
