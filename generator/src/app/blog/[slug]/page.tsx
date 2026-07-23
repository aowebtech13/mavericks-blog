import BlogDetailsContent from '@/src/components/blog-details/blog-details-content';
import RelatedBlog from '@/src/components/blog-details/related-blog';
import CTA from '@/src/components/shared/cta';
import type { BlogPost } from '@/src/interface';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import { getPost } from '@/src/services/posts';
import { apiPostToBlogPost, apiPostsToBlogPosts } from '@/src/utils/apiTransformers';
import getMarkDownContent from '@/src/utils/getMarkDownContent';
import getMarkDownData from '@/src/utils/getMarkDownData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // For static params, still use markdown (or we could also fetch from API)
  // but we keep markdown for static generation since API might not be available at build
  try {
    const posts = getMarkDownData<BlogPost>('src/data/blog');
    return posts?.map((post) => ({ slug: post?.slug })) ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    // Try API first
    const apiPost = await getPost(slug);
    return buildMetadata(`${apiPost.title} - AI Keyword Generator | maverisks`, apiPost.excerpt ?? undefined, `/blog/${slug}`);
  } catch {
    // Fallback to markdown
    try {
      const blog = getMarkDownContent('src/data/blog', slug);
      const title = (blog?.data?.title as string) ?? 'Blog';
      const description = (blog?.data?.description as string) ?? undefined;
      return buildMetadata(`${title} - AI Keyword Generator | maverisks`, description, `/blog/${slug}`);
    } catch {
      return buildMetadata('Blog - AI Keyword Generator | maverisks', undefined, `/blog/${slug}`);
    }
  }
}

const BlogSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let blog: { data: Record<string, unknown>; content: string } | null = null;
  let allPosts: BlogPost[] = [];

  try {
    // Try API first
    const apiPost = await getPost(slug);
    const blogPost = apiPostToBlogPost(apiPost);
    blog = {
      data: blogPost as unknown as Record<string, unknown>,
      content: apiPost.content,
    };
    // Fetch related posts (first page)
    const apiResponse = await import('@/src/services/posts').then(m => m.getPosts({ per_page: 10 }));
    allPosts = apiPostsToBlogPosts(apiResponse.data);
  } catch {
    // Fallback to markdown
    try {
      const result = getMarkDownContent('src/data/blog', slug);
      blog = { data: result.data as Record<string, unknown>, content: result.content };
      allPosts = getMarkDownData<BlogPost>('src/data/blog', true, 'publishDate');
    } catch {
      notFound();
    }
  }

  return (
    <>
      {blog && <BlogDetailsContent blog={blog} />}
      <RelatedBlog posts={allPosts} currentSlug={slug} />
      <CTA />
    </>
  );
};

export default BlogSlugPage;
