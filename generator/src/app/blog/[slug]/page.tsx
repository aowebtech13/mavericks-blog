import BlogDetailsContent from '@/src/components/blog-details/blog-details-content';
import RelatedBlog from '@/src/components/blog-details/related-blog';
import { generateMetadata as buildMetadata } from '@/src/utils/generateMetaData';
import { getPost } from '@/src/services/posts';
import { apiPostToBlogPost, apiPostsToBlogPosts } from '@/src/utils/apiTransformers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await getPost(slug);
  return buildMetadata(`${apiPost.title} - AI Keyword Generator | maverisks`, apiPost.excerpt ?? undefined, `/blog/${slug}`);
}

const BlogSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const apiPost = await getPost(slug);
  const blogPost = apiPostToBlogPost(apiPost);
  const blog = {
    data: blogPost as unknown as Record<string, unknown>,
    content: apiPost.content,
  };

  // Fetch related posts (first page)
  const apiResponse = await import('@/src/services/posts').then(m => m.getPosts({ per_page: 10 }));
  const allPosts = apiPostsToBlogPosts(apiResponse.data);

  return (
    <>
      {blog && <BlogDetailsContent blog={blog} />}
      <RelatedBlog posts={allPosts} currentSlug={slug} />
    </>
  );
};

export default BlogSlugPage;
